import {recipes} from '../data/recipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {buildUlListfilter, getIngredientsList, getApplianceList, getUstensilsList} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';
// import {showModal} from './modal.js';

const ingredientsUl = document.getElementById('ingredientsUl');
const applianceUl = document.getElementById('applianceUl');
const ustensilsUl = document.getElementById('ustensilsUl');

let datas = {}
datas.recipes = [...recipes];

let datasProxy = new Proxy(datas, {
    set: function(target, key, value) {
        target[key] = value;
        switch(key) {
            case 'filtredRecipes': 
                if ( datasProxy.filtredRecipes.length == 0){
                    document.getElementById('box_recipes').innerHTML =
                    '<div class="norecipe">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
                } else {
                    // afficher les recettes
                    displayRecipes(value);
                    //mettre a jour la liste des ingredients
                    getIngredientsList(value);
                    getApplianceList(value);
                    getUstensilsList(value);
                    getChosenTag();
                }
            break;
            case 'searchfilter' : 
                //creation tag
                displayTag(datasProxy.searchfilter);
                //filtrage en fonction des filterChoice
                searchByFilter();
                removeTag();
            break;
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    if(e.target.value.length < 3){
        let filterChoice = {};
        filterChoice.value = '';
        filterChoice.type = e.target.id;
        if (!datasProxy.searchfilter || datasProxy.searchfilter.length == 1){
            datasProxy.searchfilter = [filterChoice];
        } else if (datasProxy.searchfilter && datasProxy.searchfilter.length > 1) { 
            datasProxy.searchfilter[0] = filterChoice;
            datasProxy.searchfilter = [...datasProxy.searchfilter];
        }
    } else if (e.target.value.length > 2){
        let filterChoice = {};
        filterChoice.value = e.target.value;
        filterChoice.type = e.target.id;
        datasProxy.searchfilter[0] = filterChoice;
        datasProxy.searchfilter = [...datasProxy.searchfilter];
    }
})

document.querySelector('#ingredients').addEventListener('input', (e) => {
    let research = e.target.value;
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});;
    buildUlListfilter(ingredientsArray, ingredientsUl);
    // getChosenTag();
})

const inputAppliance = document.querySelector('#appliance');
inputAppliance.addEventListener('input', (e) => {
    let research = e.target.value;
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(applianceArray, applianceUl);
    // getChosenTag();
})

document.querySelector('#ustensils').addEventListener('input', (e) => {
    let research = e.target.value;
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(ustensilsArray, ustensilsUl);
    // getChosenTag();
})

function getChosenTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let filterChoice = {};
        filterChoice.value = e.target.textContent;
        filterChoice.type = e.target.parentNode.id;
        datasProxy.searchfilter = datasProxy.searchfilter? [...datasProxy.searchfilter,filterChoice] : ['',filterChoice] ;
    }))   
}

function removeTag(){
    const btnCloses = document.querySelectorAll('.btnClose');
    if(btnCloses && btnCloses.length >= 1){
        let btnClosesArray = Array.from(btnCloses);
        for(let i = 0; i < btnClosesArray.length; i++){
            btnClosesArray[i].addEventListener('click', function() {
                datasProxy.searchfilter = [...datasProxy.searchfilter.slice(0, i + 1), ...datasProxy.searchfilter.slice(i + 2)];
            })
        } 
    }
}

function searchByFilter() {
    datasProxy.filtredRecipes = [...recipes];
    datasProxy.searchfilter?.forEach(filterChoice => {
        if(filterChoice.type == 'search_bar'){
            if (filterChoice.value != ''){
            const resultFilter = datasProxy.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(filterChoice.value.toLowerCase())) || recipe.ingredients.filter(item =>
                item.ingredient.toLowerCase().includes(filterChoice.value.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(filterChoice.value.toLowerCase())));
            datasProxy.filtredRecipes = [...resultFilter];
            }
        } else if(filterChoice.type == 'ingredientsUl'){
            const resultFilter = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
            item.ingredient.toLowerCase().includes(filterChoice.value)).length > 0)
            datasProxy.filtredRecipes = [...resultFilter];
        } else if(filterChoice.type == 'applianceUl'){
            const resultFilter = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(filterChoice.value.toLowerCase()));
            datasProxy.filtredRecipes = [...resultFilter];
        } else if (filterChoice.type == 'ustensilsUl'){
            const resultFilter = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
            item.toLowerCase().includes(filterChoice.value)).length > 0)
            datasProxy.filtredRecipes = [...resultFilter];
        }
    })
}

function searchRecipeByFilter(research){
    // if(research.length > datasProxy.searchLength && research.length > 2) {
        const result = datasProxy.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || recipe.ingredients.filter(item =>
			item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    // }else if (research.length < datasProxy.searchLength && research.length > 2) {
    //     const result = datasProxy.recipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || recipe.ingredients.filter(item => item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(research.toLowerCase())));
    //     return result
    // } else {
    //     const result = [...recipes];
    //     return result;
    // }
}

function searchRecipeByFor(research) {
    let valueSought = research.toLowerCase();
    let result = [];
    if(valueSought.length > datasProxy.searchLength && valueSought.length > 2) {
        for (let i = 0; i < datasProxy.filtredRecipes.length; i++) {
            let recipe = datasProxy.filtredRecipes[i];
            let name = recipe.name.toLowerCase();
            let description = recipe.description.toLowerCase();
            if ( ingredientIsHere(recipe, valueSought)){
                result.push(recipe); 
            } else if (description.includes(valueSought)) {
            result.push(recipe);
            } else if (name.includes(valueSought)) {
                result.push(recipe);   
            }
        }
        return result;
    } else if (valueSought.length < datasProxy.searchLength && valueSought.length > 2) {
        for (let i = 0; i < datasProxy.recipes.length; i++) {
            let recipe = datasProxy.recipes[i];
            let name = recipe.name.toLowerCase();
            let description = recipe.description.toLowerCase();
            if ( ingredientIsHere(recipe, valueSought)){
                result.push(recipe); 
            } else if (description.includes(valueSought)) {
            result.push(recipe);
            } else if (name.includes(valueSought)) {
                result.push(recipe);   
            }
        }
        return result;
    } else {
        const result = [...recipes];
        return result;
    }
}

function ingredientIsHere(recipe, value){
    if(recipe.ingredients.filter(item =>
        item.ingredient.toLowerCase().includes(value)).length > 0){
        return true;}
}


// function recipeSearchByFor(research){
//     if(research.length > datasProxy.searchLength && research.length > 2) {
//         const result = [];
//         for (let i; i < datasProxy.filtredRecipes.length; i++) {
//             if((datasProxy.filtredRecipes[i].name.toLowerCase().includes(research.toLowerCase())) || datasProxy.filtredRecipes[i].ingredients.filter(item =>
// 			item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (datasProxy.filtredRecipes[i].description.toLowerCase().includes(research.toLowerCase())));
//             result = [...datasProxy.filtredRecipes[i]]}
//             return result
//     }else if (research.length < datasProxy.searchLength && research.length > 2) {
//         for (let i; i < datasProxy.filtredRecipes.length; i++) {
//         const result = [];
//         if((datasProxy.filtredRecipes[i].name.toLowerCase().includes(research.toLowerCase())) || datasProxy.filtredRecipes[i].ingredients.filter(item =>
// 			item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (datasProxy.filtredRecipes[i].description.toLowerCase().includes(research.toLowerCase())));
//             result = [...datasProxy.filtredRecipes[i]]
//             console.log(result);}
//             return result 
//     } else {
//         const result = [...recipes];
//         return result;
//     }
// }


// function tagApplianceSearch(data, research){
//         const result = data.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(research.toLowerCase()));
//         return result
// }

// function tagUstensilsSearch(data, research){
//         const result = data.filtredRecipes.filter(recipe => recipe.ustensils.toLowerCase().includes(research.toLowerCase()));
//         return result
// }

// function tagIngredientsSearch(data, research) {
//         const result = data.filtredRecipes.filter(recipe => recipe.ingredients.map((element) => element.ingredient.toLowerCase().includes(research.toLowerCase())));
//         return result
// }


