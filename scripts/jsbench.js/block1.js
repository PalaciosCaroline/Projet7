function ingredientIsHereOne(recipe, value){
    for (let i = 0; i < recipe.ingredients.length; i++) {
        if(getStringForCompare(recipe.ingredients[i].ingredient) === value){
            return true;
        }
    }
    return false;
}

function searchStringInAllRecipeOne(research,arrayOfRecipe,arrayOfResult){
    research = getStringForCompare(research);
    for (let i = 0; i < arrayOfRecipe.length; i++) {
        let recipe = arrayOfRecipe[i];
        let name = getStringForCompare(recipe.name);
        let description = getStringForCompare(recipe.description);
        if (name.includes(research)) {
            arrayOfResult.push(recipe); 
        } else if ( ingredientIsHereOne(recipe, research)){
            arrayOfResult.push(recipe);
        } else if (description.includes(research)) {
            arrayOfResult.push(recipe);
        }
    }
    return arrayOfResult;
}

function searchRecipeBySearchBar(research){
    let result = [];
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        return searchStringInAllRecipeOne(research,datasProxy.filtredRecipes,result);
    }else if (research.length < datasProxy.searchLength && research.length > 2) {
        return searchStringInAllRecipeOne(research,datasProxy.recipes,result);
    } else if (research.length <= datasProxy.searchLength && research.length == 2){
        const result = [...recipesSort];
        return result;
    } else if (research.length < 2 || (research.length > datasProxy.searchLength && research.length == 2)) {
        return;
}
