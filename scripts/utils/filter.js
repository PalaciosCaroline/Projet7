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
        // console.log(target, key, value)
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
                //creation filter
                displayTag(datasProxy.searchfilter);
                //filtrage en fonction des filter
                searchRecipes();
                removeTag();
            break;
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    if (!datasProxy.searchfilter){
            let choiceFilter = {};
            choiceFilter.value = '';
            choiceFilter.type = e.target.id;
            datasProxy.searchfilter = [choiceFilter];
    } else { 
        datasProxy.searchfilter = datasProxy.searchfilter.filter(item => item.type != 'search_bar');
        if(e.target.value.length < 3){
            let choiceFilter = {};
            choiceFilter.value = '';
            choiceFilter.type = e.target.id;
            if (datasProxy.searchfilter.length == 1){
                datasProxy.searchfilter = [choiceFilter];
            } else if (datasProxy.searchfilter.length > 1) { 
            datasProxy.searchfilter = [...datasProxy.searchfilter, choiceFilter];
            }
        } else if (e.target.value.length > 2){
            let choiceFilter = {};
            choiceFilter.value = e.target.value;
            choiceFilter.type = e.target.id;
            datasProxy.searchfilter = [...datasProxy.searchfilter, choiceFilter];
        }
    }
})

document.querySelector('#ingredients').addEventListener('input', (e) => {
    let research = e.target.value;
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});;
    buildUlListfilter(ingredientsArray, ingredientsUl);
    getChosenTag();
})

const inputAppliance = document.querySelector('#appliance');
inputAppliance.addEventListener('input', (e) => {
    let research = e.target.value;
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(applianceArray, applianceUl);
    getChosenTag();
})

document.querySelector('#ustensils').addEventListener('input', (e) => {
    let research = e.target.value;
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(ustensilsArray, ustensilsUl);
    getChosenTag();
})

function getChosenTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let choiceFilter = {};
        choiceFilter.value = e.target.textContent;
        choiceFilter.type = e.target.parentNode.id;
        datasProxy.searchfilter = datasProxy.searchfilter? [...datasProxy.searchfilter,choiceFilter] : ['',choiceFilter] ;
    }))   
}

function removeTag(){
    const btnCloses = document.querySelectorAll('.btnClose');
    if(btnCloses && btnCloses.length >= 1){
        let btnClosesArray = Array.from(btnCloses);
        for(let i = 0; i < btnClosesArray.length; i++){
            btnClosesArray[i].addEventListener('click', (e) => {
                let TagRemove = e.target.parentNode.id;
                console.log(TagRemove);
                datasProxy.searchfilter = datasProxy.searchfilter.filter(item => item.value != TagRemove);
            })
        } 
    }
}

function searchRecipes() {
    datasProxy.filtredRecipes = [...recipes];
    datasProxy.searchfilter?.forEach(choiceFilter => {
        if(choiceFilter.type == 'search_bar'){
            const resultfilter = datasProxy.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(choiceFilter.value.toLowerCase())) || recipe.ingredients.filter(item =>
                item.ingredient.toLowerCase().includes(choiceFilter.value.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(choiceFilter.value.toLowerCase())));
            datasProxy.filtredRecipes = [...resultfilter];
        } else if(choiceFilter.type == 'ingredientsUl'){
            const resultfilter = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
            item.ingredient.toLowerCase().includes(choiceFilter.value)).length > 0)
            datasProxy.filtredRecipes = [...resultfilter];
        } else if(choiceFilter.type == 'applianceUl'){
            const resultfilter = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(choiceFilter.value.toLowerCase()));
            datasProxy.filtredRecipes = [...resultfilter];
        } else if (choiceFilter.type == 'ustensilsUl'){
            const resultfilter = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
            item.toLowerCase().includes(choiceFilter.value)).length > 0)
            datasProxy.filtredRecipes = [...resultfilter];
        }
    })
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


