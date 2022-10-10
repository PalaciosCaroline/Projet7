import {recipes} from '../data/recipes.js';
import {quickSort, getStringForCompare} from '../utils/sortrecipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {noRecipeAlert, removeNoRecipeAlert, isAlert} from '../factories/header.js';
import {boxresultsUl, buildUlListfilter} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';

const inputList = document.querySelectorAll('.inputList');
let recipesSort = quickSort(recipes, 0, recipes.length - 1);
let datas = {}
datas.recipes = [...recipesSort];

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

datasProxy.filtredRecipes = [...recipesSort];

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

function getIngredientsList(recipes){
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort();
    buildUlListfilter(ingredientsArray, boxresultsUl[0]);
    })    

    inputList[0].addEventListener('input', (e) => {
        let research = e.target.value;
        let newIngredientsArray = ingredientsArray.filter(item => getStringForCompare(item).includes(getStringForCompare(research)));
        buildUlListfilter(newIngredientsArray, boxresultsUl[0]);
        getChosenTag();
    })
}

function getApplianceList(recipes){
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort();
    buildUlListfilter(applianceArray, boxresultsUl[1]);
    })

    inputList[1].addEventListener('input', (e) => {
        let research = e.target.value;
        let newApplianceArray = applianceArray.filter(item => getStringForCompare(item).includes(getStringForCompare(research)));
        buildUlListfilter(newApplianceArray, boxresultsUl[1]);
        getChosenTag();
    })
}

function getUstensilsList(recipes){
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort();
    buildUlListfilter(ustensilsArray, boxresultsUl[2]);
    })

    inputList[2].addEventListener('input', (e) => {
        let research = e.target.value;
        let newUstensilsArray = ustensilsArray.filter(item => getStringForCompare(item).includes(getStringForCompare(research)));
        buildUlListfilter(newUstensilsArray, boxresultsUl[2]);
        getChosenTag();
    })
}

function getChosenTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let filterChoice = {};
        filterChoice.value = e.target.textContent;
        filterChoice.type = e.target.parentNode.id;
        inputList.forEach(input => input.value = '');
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
    datasProxy.filtredRecipes = [...recipesSort];
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
        let filterChoiceForSort = getStringForCompare(filterChoice.value);
        const resultFilter = datasProxy.filtredRecipes.filter(recipe => (getStringForCompare(recipe.name).includes(filterChoiceForSort)) || recipe.ingredients.filter(item =>
            getStringForCompare(item.ingredient).includes(filterChoiceForSort)).length > 0 || (getStringForCompare(recipe.description).includes(filterChoiceForSort)));
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