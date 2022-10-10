function searchRecipeByFilter(research) {
    let valueSought = getStringForCompare(research);
    let result = [];
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        for (let i = 0; i < datasProxy.filtredRecipes.length; i++) {
            let recipe = datasProxy.filtredRecipes[i];
            let name = getStringForCompare(recipe.name);
            let description = getStringForCompare(recipe.description);
            if ( ingredientIsHere(recipe, valueSought)){
                result.push(recipe); 
            } else if (description.includes(valueSought)) {
            result.push(recipe);
            } else if (name.includes(valueSought)) {
                result.push(recipe);   
            }
        }
        return result;
    } else if (research.length < datasProxy.searchLength && research.length > 2) {
        for (let i = 0; i < datasProxy.recipes.length; i++) {
            let recipe = datasProxy.recipes[i];
            let name = getStringForCompare(recipe.name);
            let description = getStringForCompare(recipe.description);
            if ( ingredientIsHere(recipe, valueSought)){
                result.push(recipe); 
            } else if (description.includes(valueSought)) {
            result.push(recipe);
            } else if (name.includes(valueSought)) {
                result.push(recipe);   
            }
        }
        return result;
    } else {
        const result = [...recipesSort];
        return result;
    }
}

function ingredientIsHere(recipe, value){
    for (let i = 0; i < recipe.ingredients.length; i++) {
        if(getStringForCompare(recipe.ingredients[i].ingredient) === value){
            return true;
        }
    }
    return false;
}

