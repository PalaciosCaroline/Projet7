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


