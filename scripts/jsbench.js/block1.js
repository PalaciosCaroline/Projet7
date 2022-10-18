function searchRecipeBySearchBar(research) {
    let valueSought = getStringForCompare(research);
    let result = [];
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        for (let i = 0; i < datasProxy.filtredRecipes.length; i++) {
            let recipe = datasProxy.filtredRecipes[i];
            let name = getStringForCompare(recipe.name);
            let description = getStringForCompare(recipe.description);
            if (name.includes(valueSought)) {
                result.push(recipe);  
            } else if ( ingredientIsHereOne(recipe, valueSought)){
                result.push(recipe); 
            } else if (description.includes(valueSought)) {
                result.push(recipe);
            }
        }
        return result;
    } else if (research.length < datasProxy.searchLength && research.length > 2) {
        for (let i = 0; i < datasProxy.recipes.length; i++) {
            let recipe = datasProxy.recipes[i];
            let name = getStringForCompare(recipe.name);
            let description = getStringForCompare(recipe.description);
            if (name.includes(valueSought)) {
                result.push(recipe); 
            } else if ( ingredientIsHereOne(recipe, valueSought)){
                result.push(recipe);
            } else if (description.includes(valueSought)) {
                result.push(recipe);
            }
        }
        return result;
    } else {
        const result = [...recipesSort];
        return result;
    }
}

function ingredientIsHereOne(recipe, value){
    for (let i = 0; i < recipe.ingredients.length; i++) {
        if(getStringForCompare(recipe.ingredients[i].ingredient) === value){
            return true;
        }
    }
    return false;
}

function searchStringInAllRecipeOne(recipe,research){
    if (getStringForCompare(recipe.name).includes(research)) {
        return true;
    } else if (ingredientIsHere(recipe, research)){
        return true;
    } else if (getStringForCompare(recipe.description).includes(research)){
        return true;
    }
}

function searchRecipeBySearchBar(research){
    if(research.length < 2 || (research.length > datasProxy.searchLength && research.length == 2)) {
        return;
    }else if(research.length >= datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.filtredRecipes.filter(recipe => searchStringInAllRecipeOne(recipe,research));
        return result;
    }else if (research.length < datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.recipes.filter(recipe => searchStringInAllRecipeOne(recipe,research));
        return result;
    } else if (research.length <= datasProxy.searchLength && research.length == 2){
        const result = [...recipesSort];
        return result;
    }
}
