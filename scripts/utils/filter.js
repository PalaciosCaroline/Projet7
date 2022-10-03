import {recipes} from '../data/recipes.js';
import {displayRecipes} from '../factories/buildCard.js';
import {ingredientsUl, applianceUl, ustensilsUl} from '../factories/buildListForTag.js';
import {buildUlListfilter, getIngredientsList, getApplianceList, getUstensilsList} from '../factories/buildListForTag.js';
import {displayTag} from '../factories/buildtag.js';

let searchBar;
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
            case 'searchString': {
                //filtrer les recettes en fonction de la recherche
                const result = searchRecipeByFor(value);
                //actualiser la liste des recherches filtrées
                datasProxy.filtredRecipes = [...result];
                searchByTag();
            break;
            }
            case 'searchTag' : {
                //creation tag
                displayTag(datasProxy.searchTag);
                //filtrage en fonction des tag
                searchByTag();
                removeTag();
                const result = searchRecipeByFor(datas.searchString);
                if(result !== false) { datasProxy.filtredRecipes = [...result];
                }
                // searchBarRecup(searchBar);
            break;
            }
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    searchBar = e.target.value;
    datasProxy.searchLength = e.target.value.length ?? 0;
})

document.querySelectorAll('.btn_list').forEach(item => item.addEventListener('click', (e) => {
    if(!item.classList.contains('isOpen')){
        item.classList.add('isOpen');
        if(e.target.parentNode.id == 'btn_ingredients'){
                openListIngredients(item);
            }
    } else if(item.classList.contains('isOpen')){
        item.classList.remove('isOpen');
            closeListIngredients(item);
    }
}));

function openListIngredients(item){
    item.querySelector('i').classList.remove('fa-chevron-down');
    item.querySelector('i').classList.add('fa-chevron-up');
    document.querySelector('.boxresultIngredients').classList.add('open');
    document.querySelector('#ingredientsUl').style.display = 'flex';
}

function closeListIngredients(item){
    item.querySelector('i').classList.remove('fa-chevron-up');
    item.querySelector('i').classList.add('fa-chevron-down');
    document.querySelector('.boxresultIngredients').classList.remove('open');
    document.querySelector('#ingredientsUl').style.display = 'none';
}

document.querySelector('#ingredients').addEventListener('focusin', () => {  
    document.querySelector('.btn_ingredients').classList.add('isOpen');
    openListIngredients(document.querySelector('.btn_ingredients'));
})

document.querySelector('#ingredients').addEventListener('input', (e) => {  
    let research = e.target.value;
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
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
        let tag = {};
        tag.value = e.target.textContent;
        tag.type = e.target.parentNode.id;
        document.querySelector('#ingredients').value = '';
        document.querySelector('#appliance').value = '';
        document.querySelector('#ustensils').value = '';
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
            filterRecipeByIngredients(tag);
        } else if(tag.type == 'applianceUl'){
            filterRecipeByAppliance(tag);
        } else if (tag.type == 'ustensilsUl'){
            filterRecipeByUstensils(tag);
        }
    })
}

function searchRecipeByFor(research) {
    if(!research) {return false}
    let valueSought = research?.toLowerCase();
    let result = [];
    if(valueSought.length >= datasProxy.searchLength && valueSought.length > 2) {
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

function searchBarRecup(research){
    if(research){
        let valueSought = research.toLowerCase();
        let result = [];
        if(valueSought.length > 2) {
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
            return  datasProxy.filtredRecipes = [...result];
        }
    }
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