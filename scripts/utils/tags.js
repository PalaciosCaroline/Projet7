import {recipes} from '../data/recipes.js';

    let ingredientsArray = [];
    let applianceArray = [];
    let ustensilsArray = [];

    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
        applianceArray.push(recipe.appliance.toLowerCase());
        recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    })

    ingredientsArray = [...new Set(ingredientsArray)].sort();
    applianceArray = [...new Set(applianceArray)].sort();
    ustensilsArray = [...new Set(ustensilsArray)].sort();

const ingredientsUl = document.getElementById('ingredientsUl');
const applianceUlUl = document.getElementById('applianceUlUl');
const ustensilsUl = document.getElementById('ustensilsUl');


let inputIngredients = document.getElementById("ingredients").value;
let inputAppliance = document.getElementById("appliance").value;
let inputUstensils = document.getElementById("ustensils").value;


// document.querySelector('.btn_ingredients').addEventListener('change', );

// function getCardRecipeByIngredients(value) {
//     if(inputIngredients.lenght > 2) {
//     const Listingredients = ingredientsArray.filter(item => item.trim().includes(value));
//     console.log(Listingredients);
//     ingredientsUl.innerHTML = '';
//     buildUlListfilter(Listingredients, ingredientsUl);
//     }  
// }

function buildUlListfilter(ArrayList, containerList) {
    ArrayList.forEach((item => {
        const liSortingItem = document.createElement('li');
        liSortingItem.innerHTML = item;
        liSortingItem.classList.add('liSorting-item');
        liSortingItem.classList.add('p-2');
        liSortingItem.classList.add('text-white');
        containerList.appendChild(liSortingItem);
    })) 
}

// document.getElementById("ingredients").addEventListener('change', (e) => {getCardRecipeByIngredients(e.target.value.toLowerCase().trim())});


let newingredientsArray = [...ingredientsArray];
const handler = {
    set(newingredientsArray, value){
      newingredientsArray = ingredientsArray.filter(item => item.trim().includes(value));
      ingredientsUl.innerHTML = '';
    buildUlListfilter(newingredientsArray, ingredientsUl);
    return true;
    }
}

const ingredientsproxy = new Proxy(newingredientsArray,handler);

document.getElementById("ingredients").addEventListener('change', (e) => ingredientsproxy);

buildUlListfilter(ingredientsArray, ingredientsUl);


// function getIngredientsByTag(recipes, e) {
//     EventTarget.value = input.value;
//         if (input.value == null || input.value < 2) {
//             return ingredientsArray;
//         }
//         if (input.value.length > 2) {
//             ingredientsArray.filter(elt => elt == input.value)
//         }
// }

// getCardRecipeByIngredients();

