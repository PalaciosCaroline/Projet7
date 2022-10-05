import {recipes} from '../data/recipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {noRecipeAlert, removeNoRecipeAlert, isAlert} from '../factories/header.js';
import {ingredientsUl, applianceUl, ustensilsUl} from '../factories/buildListForTag.js';
import {buildUlListfilter, getIngredientsList, getApplianceList, getUstensilsList} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';

let datas = {}
datas.recipes = [...recipes];

let datasProxy = new Proxy(datas, {
    set: function(target, key, value) {
        target[key] = value;
        switch(key) {
            case 'filtredRecipes': 
                if ( datasProxy.filtredRecipes.length == 0){
                    noRecipeAlert();
                } else {
                    if(isAlert) {
                        removeNoRecipeAlert();
                    }
                    // afficher les recettes
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
    let filterChoice = {};
    filterChoice.value = e.target.value;
    filterChoice.type = e.target.id;
    if (!datasProxy.searchfilter){
        datasProxy.searchfilter = [filterChoice];
    }else if (datasProxy.searchfilter) {
    datasProxy.searchfilter[0] = filterChoice;
    datasProxy.searchfilter = [...datasProxy.searchfilter];
    }
})

function getChosenIngredients(recipes){
    document.querySelector('#ingredients').addEventListener('input', (e) => {
        let research = e.target.value;
        let ingredientsArray = [];
        recipes.forEach((recipe) => {
            recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
        ingredientsArray = [...new Set(ingredientsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
        buildUlListfilter(ingredientsArray, ingredientsUl);
        getChosenTag();
    })
}

function getChosenAppliance(recipes){
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
}

function getChosenUstensils(recipes){
    document.querySelector('#ustensils').addEventListener('input', (e) => {
        let research = e.target.value;
        let ustensilsArray = [];
        recipes.forEach((recipe) => {
        recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
        ustensilsArray = [...new Set(ustensilsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
        buildUlListfilter(ustensilsArray, ustensilsUl);
        getChosenTag();
    })
}

function getChosenTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let filterChoice = {};
        filterChoice.value = e.target.textContent;
        filterChoice.type = e.target.parentNode.id;
        document.querySelector('#ingredients').value = '';
        document.querySelector('#appliance').value = '';
        document.querySelector('#ustensils').value = '';
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
            filterBySearchBar(filterChoice);
        } else if(filterChoice.type == 'ingredientsUl'){
            filterByIngredient(filterChoice);
        } else if(filterChoice.type == 'applianceUl'){
            filterByAppliance(filterChoice);
        } else if (filterChoice.type == 'ustensilsUl'){
            filterByUstensils(filterChoice);
        }
    })
}

function filterBySearchBar(filterChoice) {
    if (filterChoice.value.length > 2){
        const resultFilter = datasProxy.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(filterChoice.value.toLowerCase())) || recipe.ingredients.filter(item =>
            item.ingredient.toLowerCase().includes(filterChoice.value.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(filterChoice.value.toLowerCase())));
        datasProxy.filtredRecipes = [...resultFilter];
        } else {
            return;
        }
}

function filterByIngredient(filterChoice){
const resultFilter = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
    item.ingredient.toLowerCase().includes(filterChoice.value)).length > 0)
    datasProxy.filtredRecipes = [...resultFilter];
}

function filterByAppliance(filterChoice){
    const resultFilter = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(filterChoice.value.toLowerCase()));
    datasProxy.filtredRecipes = [...resultFilter];
}

function filterByUstensils(filterChoice){
    const resultFilter = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
        item.toLowerCase().includes(filterChoice.value)).length > 0)
        datasProxy.filtredRecipes = [...resultFilter];
}