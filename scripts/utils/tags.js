import {recipes} from '../data/recipes.js';

const dataIngredients = document.getElementById('dataIngredients');
const dataAppliance = document.getElementById('dataAppliance');
const dataUstensils = document.getElementById('dataUstensils');

// export function getListsort(recipes){
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

    console.log( ingredientsArray);
    // return (ingredientsArray, applianceArray, ustensilsArray);
// }

// ingredientsArray.forEach(item => dataIngredients.option.value == item);
// applianceArray.forEach(appliance => dataAppliance.option.value == appliance);
// ustensilsArray.forEach(item => dataUstensils.option.value == item);


let Ingredientslist = document.getElementById('ingredientsUl');

ingredientsArray.forEach(function(item){
   let option = document.createElement('option');
   option.value = item;
   Ingredientslist.appendChild(option);
});

