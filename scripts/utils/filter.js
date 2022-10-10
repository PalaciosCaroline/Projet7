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
            case 'searchString': {
                //filtrer les recettes avec search_bar
                const result = searchRecipeByFor(value);
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
                        const result = searchRecipeByFor(datas.searchString);
                        if(result) { datasProxy.filtredRecipes = [...result];
                }
            break;
            }
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipesSort]; 

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    datasProxy.searchLength = e.target.value.length ?? 0;
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
        let tag = {};
        tag.value = e.target.textContent;
        tag.type = e.target.parentNode.id;
        if(e.target.parentNode.id == 'ingredientsUl'){
            inputList[0].value = '';
        } else if(e.target.parentNode.id == 'applianceUl'){
            inputList[1].value = '';
        } else if(e.target.parentNode.id == 'ustensilsUl'){
            inputList[2].value = '';
        }
        datasProxy.searchTag = datasProxy.searchTag?.length > 0 ? [...datasProxy.searchTag,tag] : [tag] ;
    }))   
}

function removeTag(){
    const btnCloses = document.querySelectorAll('.btnClose');
    for(let i = 0; i < datasProxy.searchTag?.length; i++){
        btnCloses[i].addEventListener('click', function() {
            datasProxy.filtredRecipes = [...recipesSort];
            datasProxy.searchTag = datasProxy.searchTag.length > 1 ? [...datasProxy.searchTag.slice(0, i), ...datasProxy.searchTag.slice(i + 1)] : [];
        })
    } 
}

function searchByTag() {
    datasProxy.searchTag?.forEach(tag => {
        if(tag.type == 'ingredientsUl'){
            filterRecipeByIngredients(tag);
        } else if(tag.type == 'applianceUl'){
            filterRecipeByAppliance(tag);
        } else if (tag.type == 'ustensilsUl'){
            filterRecipeByUstensils(tag);
        }
    })
}

function searchRecipeByFor(research) {
    let valueSought = research?.toLowerCase();
    let result = [];
    if(research.length >= datasProxy.searchLength && research.length > 2) {
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
    } else if (research.length < datasProxy.searchLength && research.length > 2) {
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
        const result = [...recipesSort];
        return result;
    }
}

function ingredientIsHere(recipe, value){
    if(recipe.ingredients.filter(item =>
        item.ingredient.toLowerCase().includes(value)).length > 0){
        return true;}
}


function filterRecipeByIngredients(tag){
const resultTag = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
    item.ingredient.toLowerCase().includes(tag.value)).length > 0)
    datasProxy.filtredRecipes = [...resultTag];
}

function filterRecipeByAppliance(tag){
const resultTag = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(tag.value.toLowerCase()));
datasProxy.filtredRecipes = [...resultTag];
}

function filterRecipeByUstensils(tag){
const resultTag = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
item.toLowerCase().includes(tag.value)).length > 0)
datasProxy.filtredRecipes = [...resultTag];
}