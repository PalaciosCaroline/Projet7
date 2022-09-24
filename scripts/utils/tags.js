import {recipes} from '../data/recipes.js';
import {getCardRecipe} from '../factories/buildCard.js';
import {buildTagChoice} from '../factories/buildtag.js';
import {showModal} from '../utils/modal.js';

const ingredientsUl = document.getElementById('ingredientsUl');
const applianceUl = document.getElementById('applianceUl');
const ustensilsUl = document.getElementById('ustensilsUl');
let tagsArray = [];
const tagChoiceBox = document.querySelector("#tagChoice_box");

function getIngredientsList(recipes){
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort();
    buildUlListfilter(ingredientsArray, ingredientsUl);
    })
}
function getApplianceList(recipes){
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort();
    buildUlListfilter(applianceArray, applianceUl);
    })
}
function getUstensilsList(recipes){
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort();
    buildUlListfilter(ustensilsArray, ustensilsUl);
    })
}

// let inputIngredients = document.getElementById("ingredients").value;
// let inputAppliance = document.getElementById("appliance").value;
// let inputUstensils = document.getElementById("ustensils").value;

function buildUlListfilter(ArrayList, containerList) {
    containerList.innerHTML = '';
    ArrayList.forEach((item => {
        const liSortingItem = document.createElement('li');
        liSortingItem.innerHTML = item;
        liSortingItem.classList.add('liSorting-item');
        liSortingItem.classList.add('p-2');
        liSortingItem.classList.add('text-white');
        containerList.appendChild(liSortingItem);
    })) 
}

let datas = {}
datas.recipes = [...recipes];

let datasProxy = new Proxy(datas, {
    set: function(target, key, value) {
        console.log(target, key, value)
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
            searchByTag();
            // showModal();
            }
            break;
            case 'searchString':
            //filtrer les recettes en fonction de la recherche
            const result = recipeSearch(target, value);
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...result];
            break;
            case 'searchTag' : 
                //creation tag
                if (datasProxy.searchTag.length >= 0){
                tagChoiceBox.innerHTML = '';
                datasProxy.searchTag.forEach((tag) => {
                    const tagElement = buildTagChoice(tag.value, tag.type);
                    tagChoiceBox.appendChild(tagElement);
                    
                });
                } else if (datasProxy.searchTag.length < 0){
                    return true;
                }
                removeTag();
                //filtrage en fonction des tag
                // const resultByTag = researchByTag(target, [...datasProxy.searchTag])
                // datasProxy.filtredRecipes = [...resultByTag];
            break;
            // case 'searchIngredientsTag':
            // //filtrer les recettes en fonction de la recherche
            // const resultIngredientsTag = recipeSearch(target, value);
            // //actualiser la liste des recherches filtrées
            // //datasProxy.filtredRecipes = [...resultIngredientsTag];
            // break;
            // case 'searchApplianceTag':
            // //filtrer les recettes en fonction de la recherche
            // const resultApplianceTag = recipeSearch(target, value);
            // //actualiser la liste des recherches filtrées
            // datasProxy.filtredRecipes = [...resultApplianceTag];
            // break;
            // case 'searchUstensilsTag':
            // //filtrer les recettes en fonction de la recherche
            // const resultUstensilsTag = recipeSearch(target, value);
            // //actualiser la liste des recherches filtrées
            // //datasProxy.filtredRecipes = [...resultUstensilsTag];
            // break;
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    datasProxy.searchLength = e.target.value.length ?? 0;
})

document.querySelector('#ingredients').addEventListener('input', (e) => {
    let research = e.target.value;
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});;
    buildUlListfilter(ingredientsArray, ingredientsUl);
    // datasProxy.searchIngredientsTag = e.target.value;
    // datasProxy.searchLength = e.target.value.length;
})

const inputAppliance = document.querySelector('#appliance');
inputAppliance.addEventListener('input', (e) => {
    let research = e.target.value;
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(applianceArray, applianceUl);
    // datasProxy.searchApplianceTag = e.target.value;
    // datasProxy.searchLength = e.target.value.length;
})

document.querySelector('#ustensils').addEventListener('input', (e) => {
    let research = e.target.value;
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort().filter(item => item.toLowerCase().includes(research.toLowerCase()))});
    buildUlListfilter(ustensilsArray, ustensilsUl);
    // datasProxy.searchUstensilsTag = e.target.value;
    // datasProxy.searchLength = e.target.value.length;
})

function searchByTag() {
    const liSortingItem = document.querySelectorAll('.liSorting-item')
    liSortingItem.forEach(item => item.addEventListener('click', (e) => {
        let tag = {};
        tag.value = e.target.textContent;
        tag.type = e.target.parentNode.id;
        datasProxy.searchTag = datasProxy.searchTag?.length > 0 ? [...datasProxy.searchTag,tag] : [tag] ;
    }))   
}

function removeTag(){
    const btnCloses = document.querySelectorAll('.btnClose');
    for(let i = 0; i < datasProxy.searchTag.length; i++){
        btnCloses[i].addEventListener('click', function() {
            console.log(datasProxy.searchTag[i]);
            datasProxy.searchTag = datasProxy.searchTag.length > 1 ? [...datasProxy.searchTag.slice(0, i), ...datasProxy.searchTag.slice(i + 1)] : [];
        })
    }
}


function recipeSearch(data, research){
    if(research.length > data.searchLength && research.length > 2) {
        const result = data.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || recipe.ingredients.filter(item =>
			item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    }else if (research.length < data.searchLength && research.length > 2) {
        const result = data.recipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || recipe.ingredients.filter(item => item.ingredient.toLowerCase().includes(research.toLowerCase())).length > 0 || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    } else {
        const result = [...recipes];
        return result;
    }
}

function displayRecipes(value){
    const boxRecipes = document.getElementById('box_recipes');
    boxRecipes.innerHTML = '';
    value.forEach(recipe => boxRecipes.appendChild(getCardRecipe(recipe)));
}

function tagApplianceSearch(data, research){
    if(research.length > data.searchLength) {
        const result = data.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(research.toLowerCase()));
        return result
    } else {
        const result = data.recipes.filter(recipe => recipe.appliance.toLowerCase().includes(research.toLowerCase()));
        return result
    }
}
function tagUstensilsSearch(data, research){
    if(research.length > data.searchLength && research.length > 0) {
        const result = data.filtredRecipes.filter(recipe => recipe.ustensils.toLowerCase().includes(research.toLowerCase()));
        return result
    } else if(research.length < data.searchLength && research.length > 0) {
        const result = data.recipes.filter(recipe => recipe.ustensils.toLowerCase().includes(research.toLowerCase()));
        return result
    }
}

function tagIngredientsSearch(data, research) {
    if(research.length > data.searchLength) {
        const result = data.filtredRecipes.filter(recipe => recipe.ingredients.map((element) => element.ingredient.toLowerCase().includes(research.toLowerCase())));
        return result
    } else {
        const result = data.filtredRecipes.filter(recipe => recipe.ingredients.map((element) => element.ingredient.toLowerCase().includes(research.toLowerCase())));
        return result
    }
}

// function researchByTag(data, research){
//    return data.filtredRecipes.filter((recipe) => {
//        research.every((item) => {(
//         recipe.ingredients.some((element) => 
//              element.ingredient.includes(item.value)) ||
//             recipe.appliance.includes(item.value) ||
//             recipe.ustensils.includes(item.value));
//             })
//         });
// };

