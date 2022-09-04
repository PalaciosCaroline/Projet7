import {recipes} from '../data/recipes.js';
import {getCardRecipe} from '../factories/buildCard.js'

recipes.forEach(recipe => document.getElementById('box_recipes').appendChild(getCardRecipe(recipe))
)