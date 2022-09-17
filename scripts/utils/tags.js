import {recipes} from '../data/recipes.js';
import {getCardRecipe} from '../factories/buildCard.js'

const ingredientsUl = document.getElementById('ingredientsUl');
const applianceUl = document.getElementById('applianceUl');
const ustensilsUl = document.getElementById('ustensilsUl');

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


// document.querySelector('.btn_ingredients').addEventListener('change', );

// function getIngredientsList(value) {
//     if(inputIngredients.lenght > 2) {
//     const Listingredients = ingredientsArray.filter(item => item.trim().includes(value));
//     console.log(Listingredients);
//     ingredientsUl.innerHTML = '';
//     buildUlListfilter(Listingredients, ingredientsUl);
//     }  
// }

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
            // afficher les recettes
            displayRecipes(value);
            //mettre a jour la liste des ingredients
            getIngredientsList(value);
            getApplianceList(value);
            getUstensilsList(value);
            break;
            case 'searchString':
            //filtrer les recettes en fonction de la recherche
            const result = recipeSearch(target, value)
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...result];
            break;
            case 'searchStringTag':
            //filtrer les recettes en fonction de la recherche
            const resultTag = recipeSearch(target, value)
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...resultTag];
        }
        return true;
    }
});


datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})

document.querySelector('#ingredients').addEventListener('input', (e) => {
    datasProxy.searchStringTag = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})
document.querySelector('#appliance').addEventListener('input', (e) => {
    datasProxy.searchStringTag = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})
document.querySelector('#ustensils').addEventListener('input', (e) => {
    datasProxy.searchStringTag = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})

function recipeSearch(data, research){
    if(research.length > data.searchLength && research.length !== 0 && research.length > 2) {
        const result = data.filtredRecipes.filter(recipe => {return (recipe.name.toLowerCase().includes(research.toLowerCase())) + (recipe.description.toLowerCase().includes(research.toLowerCase()))});
        return result
    } else if (research.length <= 2 ){
        const result = [...recipes];
        return result;
    }else if (research.length < data.searchLength && research.length !== 0 && research.length > 2) {
        const result = data.filtredRecipes.filter(recipe => {return (recipe.name.toLowerCase().includes(research.toLowerCase())) + (recipe.description.toLowerCase().includes(research.toLowerCase()))});
        return result
    }
}

function displayRecipes(value){
    const boxRecipes = document.getElementById('box_recipes');
    boxRecipes.innerHTML = '';
    value.forEach(recipe => boxRecipes.appendChild(getCardRecipe(recipe)));
}
