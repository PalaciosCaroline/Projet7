export const ingredientsUl = document.getElementById('ingredientsUl');
export const applianceUl = document.getElementById('applianceUl');
export const ustensilsUl = document.getElementById('ustensilsUl');

export function buildUlListfilter(ArrayList, containerList) {
    containerList.innerHTML = '';
    ArrayList.forEach((item => {
        const liSortingItem = document.createElement('li');
        liSortingItem.innerHTML = item;
        liSortingItem.classList.add('liSorting-item');
        liSortingItem.classList.add('p-2');
        liSortingItem.classList.add('text-white');
        containerList.appendChild(liSortingItem);
    })) 
}

export function getIngredientsList(recipes){
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort();
    buildUlListfilter(ingredientsArray, ingredientsUl);
    })
}

// export function getIngredientsListByFor(recipes){
//     let ingredientsArray = [];
//     for(let i; i < recipes.lenght; i++){
//         for(let j; j < recipes[i].ingredients.lenght; j++){
//        if(recipes[i].ingredients[j] == ingredient){
//        ingredientsArray += recipes[i].ingredients[j];
//        }
//     }}
//     ingredientsArray = [...new Set(ingredientsArray)].sort();
//     buildUlListfilter(ingredientsArray, ingredientsUl);
// }

export function getApplianceList(recipes){
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort();
    buildUlListfilter(applianceArray, applianceUl);
    })
}
export function getUstensilsList(recipes){
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort();
    buildUlListfilter(ustensilsArray, ustensilsUl);
    })
}
