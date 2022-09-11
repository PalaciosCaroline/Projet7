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

function getCardRecipeByIngredients() {
    let inputIngredients = document.getElementById("ingredients").value;
    if(inputIngredients.lenght >= 3) {
    const Listingredients = ingredientsArray.filter(item => item == inputIngredients.value);
    ingredientsUl.innerHTML = '';
    return buildUlListfilter(Listingredients, ingredientsUl )
    }  
}

function buildUlListfilter(ArrayList, containerList) {
    ArrayList.forEach((item => {
        const liSortingItem = document.createElement('li');
        liSortingItem.innerHTML = item;
        liSortingItem.classList.add('liSorting-item');
        liSortingItem.classList.add('p-2');
        containerList.appendChild(liSortingItem);
    })) 
}


document.getElementById("ingredients").addEventListener('change',getCardRecipeByIngredients());

const handler = {
    set(target, prop, value){
    
    }
}