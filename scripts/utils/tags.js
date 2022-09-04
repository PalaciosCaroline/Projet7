import {recipes} from '../data/recipes.js';


const dataIngredients = document.getElementById('dataIngredients');
const dataAppliance = document.getElementById('dataAppliance');
const dataUstensils = document.getElementById('dataUstensils');

const ArrayIngredients = [];

// recipes.forEach(item => dataIngredients.option.value == item);
// recipes.forEach(appliance => dataAppliance.option.value == appliance);
// recipes.ustensils.forEach(item => dataUstensils.option.value == item);

// export function getIngredientsByTag(recipes, e) {
// EventTarget.value = input.value;
//     if (input.value == null) {
//         return recipes.ingredients;
//     }
//     if (input.value.length > 3) {
//         recipes.ingredients.filter(elt => elt == input.value)
//     }
// }