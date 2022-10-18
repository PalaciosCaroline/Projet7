function ingredientIsHere(recipe, research){
    recipe.ingredients.filter(item =>
        (getStringForCompare(item.ingredient).includes(research)).length > 0); 
}

function searchStringInAllRecipe(recipe,research){
    if (getStringForCompare(recipe.name).includes(research)) {
        return true;
    } else if (ingredientIsHere(recipe, research)){
        return true;
    } else if (getStringForCompare(recipe.description).includes(research)){
        return true;
    }
}

function searchRecipeBySearchBar(research){
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.filtredRecipes.filter(recipe => searchStringInAllRecipe(recipe,research));
        return result;
    }else if (research.length < datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.recipes.filter(recipe => searchStringInAllRecipe(recipe,research));
        return result;
    } else if (research.length <= datasProxy.searchLength && research.length == 2){
        const result = [...recipesSort];
        return result;
    } else if (research.length < 2 || (research.length > datasProxy.searchLength && research.length == 2)) {
        return;
    }
}
