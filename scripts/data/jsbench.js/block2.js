function searchRecipeByFilter(research) {
    let valueSought = getStringForCompare(research);
    let result = [];
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        for (let i = 0; i < datasProxy.filtredRecipes.length; i++) {
            if ( ingredientIsHere(datasProxy.filtredRecipes[i], valueSought)){
                result.push(datasProxy.filtredRecipes[i]); 
            } else if (getStringForCompare(datasProxy.filtredRecipes[i].description).includes(valueSought)) {
            result.push(datasProxy.filtredRecipes[i]);
            } else if (getStringForCompare(datasProxy.filtredRecipes[i].name).includes(valueSought)) {
                result.push(datasProxy.filtredRecipes[i]);   
            }
        }
        return result;
    } else if (research.length < datasProxy.searchLength && research.length > 2) {
        for (let i = 0; i < datasProxy.recipes.length; i++) {       
            if ( ingredientIsHere(datasProxy.recipes[i], valueSought)){
                result.push(datasProxy.recipes[i]); 
            } else if (getStringForCompare(datasProxy.recipes[i].description).includes(valueSought)) {
            result.push(datasProxy.recipes[i]);
            } else if (getStringForCompare(datasProxy.recipes[i].name).includes(valueSought)) {
                result.push(datasProxy.recipes[i]);   
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

