import {recipes} from '../data/recipes.js';
import {quickSort, getStringForCompare} from '../utils/sortrecipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {noRecipeAlert, removeNoRecipeAlert, isAlert} from '../factories/alertnorecipe.js';
import {boxresultsUl, inputList, btnList, boxresults} from '../factories/buildListForTag.js';
import {buildUlListfilter} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';

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
                    if(isAlert){
                    removeNoRecipeAlert();
                    }
                    displayRecipes(value);
                    //updating the list of lists of possible tags
                    getIngredientsList(value);
                    getApplianceList(value);
                    getUstensilsList(value);
                    getChosenTag();
                }
            break;
            case 'searchString': {
                //filtering based on searchbar
                const result = searchRecipeBySearchBar(value);
                //updating the list of filtered recipes
                if (result) {
                datasProxy.filtredRecipes = [...result];
                }
                //tag recovery
                searchByTag();
            break;
            }
            case 'searchTag' : 
                //creation of the chosen tag
                displayTag(datasProxy.searchTag);
                //filtering based on tags
                searchByTag();
                removeTag();
                //searchbar recovery
                if (datas.searchString?.length > 2) {
                    const result = searchRecipeBySearchBar(datas.searchString);
                    datasProxy.filtredRecipes = [...result];
                }
            break;
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipesSort];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    datasProxy.searchLength = e.target.value.length ?? 0;
})
//intermediate function of management of lists of tags
function removeInputList(ArrayList,index){
    if (inputList[index].value == ''){
        buildUlListfilter(ArrayList, boxresultsUl[index]);
        getChosenTag();
    }
}
//management of lists of possible ingredients tags
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

    boxresults[0].addEventListener('focusin', () => {removeInputList(ingredientsArray,0)})
    btnList[0].addEventListener('click', () => {removeInputList(ingredientsArray,0)})
}
//management of lists of possible appliance tags
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

    boxresults[1].addEventListener('focusin', () => {removeInputList(applianceArray,1)})
    btnList[1].addEventListener('click', () => {removeInputList(applianceArray,1)})
}
//management of lists of possible ustensils tags
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

    boxresults[2].addEventListener('focusin', () => {removeInputList(ustensilsArray,2)})
    btnList[2].addEventListener('click', () => {removeInputList(ustensilsArray,2)})
}

//registration of the choice of the tag
export function getChosenTag() {
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

//intermediate search function by tags
function filterRecipeByIngredients(tag){
    const resultTag = datasProxy.filtredRecipes.filter(recipe  => recipe.ingredients.filter(item =>
        item.ingredient.toLowerCase().includes(tag.value.toLowerCase())).length > 0)
        datasProxy.filtredRecipes = [...resultTag];
}

//intermediate search function by tags
function filterRecipeByAppliance(tag){
    const resultTag = datasProxy.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(tag.value.toLowerCase()));
    datasProxy.filtredRecipes = [...resultTag];
}

//intermediate search function by tags
function filterRecipeByUstensils(tag){
    const resultTag = datasProxy.filtredRecipes.filter(recipe => recipe.ustensils.filter(item => 
    item.toLowerCase().includes(tag.value.toLowerCase())).length > 0);
    datasProxy.filtredRecipes = [...resultTag];
}

//search function by tags
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

//intermediate search function by searchbar
function ingredientIsHere(recipe, research){
    if(recipe.ingredients.filter(item =>
        getStringForCompare(item.ingredient).includes(research)).length > 0){
        return true;
    } else return false; 
}

//intermediate search function by searchbar
function searchStringInAllRecipe(recipe,research){
    if (getStringForCompare(recipe.name).includes(research)) {
        return true;
    } else if (ingredientIsHere(recipe, research)){
        return true;
    } else if (getStringForCompare(recipe.description).includes(research)){
        return true;
    }
}

//search function by searchbar
function searchRecipeBySearchBar(research){
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.filtredRecipes.filter(recipe => searchStringInAllRecipe(recipe,research));
        return result;
    }else if (research.length < datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.recipes.filter(recipe => searchStringInAllRecipe(recipe,research));
        return result;
    } else if (research.length <= datasProxy.searchLength && (research.length == 2 ||  research.length <= 0)){
        const result = [...recipesSort];
        return result;
    } else if(research.length < 2 || (research.length > datasProxy.searchLength && research.length == 2)) {
        return;
    }
}
