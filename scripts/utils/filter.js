import {recipes} from '../data/recipes.js';
import {quickSort} from '../utils/sortrecipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {noRecipeAlert, removeNoRecipeAlert, isAlert} from '../factories/header.js';
import {boxresultsUl, buildUlListfilter} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';

const inputList = document.querySelectorAll('.inputList');
let recipesSort = quickSort(recipes, 0, recipes.length - 1);
let datas = {}
datas.recipes = [...recipesSort]

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
                    getApplianceList(value);
                    getUstensilsList(value);
                    getChosenTag();
                }
            break;
            case 'searchfilter' : 
                //creation filter
                displayTag(datasProxy.searchfilter);
                //filtrage en fonction des filters
                searchRecipes();
                removeTag();
            break;
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipesSort];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    let choiceFilter = {};
    choiceFilter.value = e.target.value;
    choiceFilter.type = e.target.id;
    if (!datasProxy.searchfilter){
            datasProxy.searchfilter = [choiceFilter];
    } else { 
        datasProxy.searchfilter = datasProxy.searchfilter.filter(item => item.type != 'search_bar');
        if(datasProxy.searchfilter.length <= 0) {
            datasProxy.searchfilter = [choiceFilter];
        } else if (datasProxy.searchfilter.length > 0){
            datasProxy.searchfilter = [...datasProxy.searchfilter, choiceFilter];
        }        
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
        let newIngredientsArray = ingredientsArray.filter(item => item.toLowerCase().includes(research.toLowerCase()));
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
        let newApplianceArray = applianceArray.filter(item => item.toLowerCase().includes(research.toLowerCase()));
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
        let newUstensilsArray = ustensilsArray.filter(item => item.toLowerCase().includes(research.toLowerCase()));
        buildUlListfilter(newUstensilsArray, boxresultsUl[2]);
        getChosenTag();
    })
}

function getChosenTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let choiceFilter = {};
        choiceFilter.value = e.target.textContent;
        choiceFilter.type = e.target.parentNode.id;
        inputList.forEach(input => input.value = '');
        datasProxy.searchfilter = datasProxy.searchfilter? [...datasProxy.searchfilter,choiceFilter] : [choiceFilter] ;
    }))   
}

function removeTag(){
    const btnCloses = document.querySelectorAll('.btnClose');
    if(btnCloses && btnCloses.length >= 1){
        let btnClosesArray = Array.from(btnCloses);
        for(let i = 0; i < btnClosesArray.length; i++){
            btnClosesArray[i].addEventListener('click', (e) => {
                let TagRemove = e.target.parentNode.id;
                datasProxy.searchfilter = datasProxy.searchfilter.filter(choiceFilter => choiceFilter.value != TagRemove);
            })
        } return datasProxy.searchfilter; 
    } 
}

function searchRecipes() {
    datasProxy.filtredRecipes = [...recipesSort];
    datasProxy.searchfilter.forEach(choiceFilter => {
        if(choiceFilter.type == 'search_bar'){
           filterBySearchBar(choiceFilter);
        } else if(choiceFilter.type == 'ingredientsUl'){
           filterByIngredients(choiceFilter);
        } else if(choiceFilter.type == 'applianceUl'){
           filterByAppliance(choiceFilter);
        } else if (choiceFilter.type == 'ustensilsUl'){
           filterByUstensils(choiceFilter);
        }
    })
}

function filterBySearchBar(choiceFilter){
    if (choiceFilter.value.length > 2){
        const resultfilter = datasProxy.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(choiceFilter.value.toLowerCase())) || recipe.ingredients.filter(item =>
            item.ingredient.toLowerCase().includes(choiceFilter.value.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(choiceFilter.value.toLowerCase())));
        datasProxy.filtredRecipes = [...resultfilter];
    } else return;
}

function filterByIngredients(choiceFilter){
            const resultfilter = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
            item.ingredient.toLowerCase().includes(choiceFilter.value)).length > 0)
            datasProxy.filtredRecipes = [...resultfilter];
}

function filterByAppliance(choiceFilter) {
            const resultfilter = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(choiceFilter.value.toLowerCase()));
            datasProxy.filtredRecipes = [...resultfilter];
}

function filterByUstensils(choiceFilter){
            const resultfilter = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
            item.toLowerCase().includes(choiceFilter.value)).length > 0)
            datasProxy.filtredRecipes = [...resultfilter];
}
