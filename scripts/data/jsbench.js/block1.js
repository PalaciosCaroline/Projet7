function searchRecipeByFilter(research){
    if(research.length >= datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.filtredRecipes.filter(recipe => (getStringForCompare(recipe.name).includes(research)) || recipe.ingredients.filter(item =>
			getStringForCompare(item.ingredient).includes(research)).length > 0 || (getStringForCompare(recipe.description).includes(research)));
        return result;
    }else if (research.length < datasProxy.searchLength && research.length > 2) {
        research = getStringForCompare(research);
        const result = datasProxy.recipes.filter(recipe => (getStringForCompare(recipe.name).includes(research)) || recipe.ingredients.filter(item => getStringForCompare(item.ingredient).includes(research)).length > 0 || (getStringForCompare(recipe.description).includes(research)));
        return result;
    } else {
        const result = [...recipesSort];
        return result;
    }
}
