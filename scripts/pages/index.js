import {recipes} from '../data/recipes.js';
import {getCardRecipe} from '../factories/buildCard.js'
// import {getIngredientsByTag} from '../utils/tags.js'



recipes.forEach(recipe => document.getElementById('box_recipes').appendChild(getCardRecipe(recipe))
)

document.getElementById('ingredients').addEventListener('keyup', (e) => getIngredientsByTag(recipes));
