import {recipes} from '../data/recipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {noRecipeAlert, removeNoRecipeAlert, isAlert} from '../factories/header.js';
import {boxresultsUl} from '../factories/buildListForTag.js';
import {buildUlListfilter, getIngredientsList, getApplianceList, getUstensilsList} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';

let datas = {}
datas.recipes = [...recipes]

let datasProxy = new Proxy(datas, {
    set: function(target, key, value) {
        target[key] = value;
        switch(key) {
            case 'filtredRecipes': 
                if ( datasProxy.filtredRecipes.length == 0){
                    noRecipeAlert();
                } else {
                    if(isAlert){
                    removeNoRecipeAlert();
                    }
                    displayRecipes(value);
                    //mettre a jour la liste des ingredients
                    getIngredientsList(value);
                    getChosenIngredients(value);
                    getApplianceList(value);
                    getChosenAppliance(value);
                    getUstensilsList(value);
                    getChosenUstensils(value);
                    getChosenTag();
                }
            break;
            case 'searchString': {
                //filtrer les recettes en fonction de la recherche
                const result = searchRecipeByFilter(value);
                //actualiser la liste des recherches filtrées
                datasProxy.filtredRecipes = [...result];
                searchByTag();
            break;
            }
            case 'searchTag' : 
                //creation tag
                displayTag(datasProxy.searchTag);
                //filtrage en fonction des tag
                searchByTag();
                removeTag();
                if(datas.searchString){
                    const result = searchRecipeByFilter(datas.searchString);
                    if(result) { datasProxy.filtredRecipes = [...result];
                    }
                }
            break;
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    datasProxy.searchLength = e.target.value.length ?? 0;
})

function getChosenIngredients(recipes) {
    document.querySelector('#ingredients').addEventListener('input', (e) => {
        let research = e.target.value;
        let ingredientsArray = [];
        recipes.forEach((recipe) => {
            recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
        ingredientsArray = [...new Set(ingredientsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
        buildUlListfilter(ingredientsArray, boxresultsUl[0]);
        getChosenTag();
    })
}

function getChosenAppliance(recipes) {
    const inputAppliance = document.querySelector('#appliance');
    inputAppliance.addEventListener('input', (e) => {
        let research = e.target.value;
        let applianceArray = [];
        recipes.forEach((recipe) => {
            applianceArray.push(recipe.appliance.toLowerCase());
        applianceArray = [...new Set(applianceArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
        buildUlListfilter(applianceArray, boxresultsUl[1]);
        getChosenTag();
    })
}

function getChosenUstensils(recipes) {
    document.querySelector('#ustensils').addEventListener('input', (e) => {
    let research = e.target.value;
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(ustensilsArray, boxresultsUl[2]);
    getChosenTag();
    })
}

export function getChosenTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let tag = {};
        tag.value = e.target.textContent;
        tag.type = e.target.parentNode.id;
        if(e.target.parentNode.id == 'ingredientsUl'){
            document.querySelector('#ingredients').value = '';
        } else if(e.target.parentNode.id == 'applianceUl'){
            document.querySelector('#appliance').value = '';
        } else if(e.target.parentNode.id == 'ustensilsUl'){
            document.querySelector('#ustensils').value = '';
        }
        datasProxy.searchTag = datasProxy.searchTag?.length > 0 ? [...datasProxy.searchTag,tag] : [tag] ;
    }))   
}

function removeTag(){
    const btnCloses = document.querySelectorAll('.btnClose');
    for(let i = 0; i < datasProxy.searchTag?.length; i++){
        btnCloses[i].addEventListener('click', function() {
                datasProxy.filtredRecipes = [...recipes];
                datasProxy.searchTag = datasProxy.searchTag.length > 1 ? [...datasProxy.searchTag.slice(0, i), ...datasProxy.searchTag.slice(i + 1)] : [];
        })
    } 
}

function searchByTag() {
    datasProxy.searchTag?.forEach(tag => {
        if(tag.type == 'ingredientsUl'){
            const resultTag = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
            item.ingredient.toLowerCase().includes(tag.value)).length > 0)
            datasProxy.filtredRecipes = [...resultTag];
        } else if(tag.type == 'applianceUl'){
            const resultTag = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(tag.value.toLowerCase()));
            datasProxy.filtredRecipes = [...resultTag];
        } else if (tag.type == 'ustensilsUl'){
            const resultTag = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
            item.toLowerCase().includes(tag.value)).length > 0)
            datasProxy.filtredRecipes = [...resultTag];
        }
    })
}

function searchRecipeByFilter(research){
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        const result = datasProxy.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || recipe.ingredients.filter(item =>
			item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    }else if (research.length < datasProxy.searchLength && research.length > 2) {
        const result = datasProxy.recipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || recipe.ingredients.filter(item => item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    } else {
        const result = [...recipes];
        return result;
    }
}




