import {recipes} from '../data/recipes.js';
import {getCardRecipe} from '../factories/buildCard.js'

const ingredientsUl = document.getElementById('ingredientsUl');
const applianceUl = document.getElementById('applianceUl');
const ustensilsUl = document.getElementById('ustensilsUl');
let tagsArray = [];
const tagChoiceBox = document.querySelector(".tagChoice_box");

function getIngredientsList(recipes){
    let ingredientsArray = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.map((element) => ingredientsArray.push(element.ingredient.toLowerCase()));
    ingredientsArray = [...new Set(ingredientsArray)].sort();
    buildUlListfilter(ingredientsArray, ingredientsUl);
    })
}
function getApplianceList(recipes){
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort();
    buildUlListfilter(applianceArray, applianceUl);
    })
}
function getUstensilsList(recipes){
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort();
    buildUlListfilter(ustensilsArray, ustensilsUl);
    })
}

// let inputIngredients = document.getElementById("ingredients").value;
// let inputAppliance = document.getElementById("appliance").value;
// let inputUstensils = document.getElementById("ustensils").value;

function buildUlListfilter(ArrayList, containerList) {
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

let datas = {}
datas.recipes = [...recipes];

let datasProxy = new Proxy(datas, {
    set: function(target, key, value) {
        console.log(target, key, value)
        target[key] = value;
        switch(key) {
            case 'filtredRecipes': 
            if ( datasProxy.filtredRecipes == null){
                document.getElementById('box_recipes').innerHTML =
                '<div class="norecipe">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
            } else{
            // afficher les recettes
            displayRecipes(value);
            //mettre a jour la liste des ingredients
            getIngredientsList(value);
            getApplianceList(value);
            getUstensilsList(value);}
            break;
            case 'searchString':
            //filtrer les recettes en fonction de la recherche
            const result = recipeSearch(target, value)
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...result];
            break;
            case 'searchIngredientsTag':
            //filtrer les recettes en fonction de la recherche
            const resultIngredientsTag = recipeSearch(target, value);
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...resultIngredientsTag];
            break;
            case 'searchApplianceTag':
            //filtrer les recettes en fonction de la recherche
            const resultApplianceTag = recipeSearch(target, value);
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...resultApplianceTag];
            break;
            case 'searchUstensilsTag':
            //filtrer les recettes en fonction de la recherche
            const resultUstensilsTag = recipeSearch(target, value);
            //actualiser la liste des recherches filtrées
            datasProxy.filtredRecipes = [...resultUstensilsTag];
            break;
        }
        return true;
    }
});


datasProxy.filtredRecipes = [...recipes];

document.querySelector('#search_bar').addEventListener('input', (e) => {
    datasProxy.searchString = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})

document.querySelector('#ingredients').addEventListener('input', (e) => {
    datasProxy.searchIngredientsTag = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})
document.querySelector('#appliance').addEventListener('input', (e) => {
    datasProxy.searchApplianceTag = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})
document.querySelector('#ustensils').addEventListener('input', (e) => {
    datasProxy.searchUstensilsTag = e.target.value;
    datasProxy.searchLength = e.target.value.length;
})


function recipeSearch(data, research){
    if(research.length > data.searchLength && research.length !== 0) {
        const result = data.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    } else if (research.length <= 2 && research.length > 0){
        const result = [...recipes];
        return result;
    }else if (research.length < data.searchLength && research.length !== 0) {
        const result = data.filtredRecipes.filter(recipe => (recipe.name.toLowerCase().includes(research.toLowerCase())) || (recipe.description.toLowerCase().includes(research.toLowerCase())));
        return result
    }
}

function displayRecipes(value){
    const boxRecipes = document.getElementById('box_recipes');
    boxRecipes.innerHTML = '';
    value.forEach(recipe => boxRecipes.appendChild(getCardRecipe(recipe)));
}

function tagApplianceSearch(data, research){
    if(research.length > data.searchLength) {
        const result = data.filtredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(research.toLowerCase()));
        return result
    } else {
        const result = data.recipes.filter(recipe => recipe.appliance.toLowerCase().includes(research.toLowerCase()));
        return result
    }
}
function tagUstensilsSearch(data, research){
    if(research.length > data.searchLength && research.length > 0) {
        const result = data.filtredRecipes.filter(recipe => recipe.ustensils.toLowerCase().includes(research.toLowerCase()));
        return result
    } else if(research.length < data.searchLength && research.length > 0) {
        const result = data.recipes.filter(recipe => recipe.ustensils.toLowerCase().includes(research.toLowerCase()));
        return result
    }
}

function tagIngredientsSearch(data, research) {
    if(research.length > data.searchLength) {
        const result = data.filtredRecipes.filter(recipe => recipe.ingredients.map((element) => element.ingredient.toLowerCase().includes(research.toLowerCase())));
        return result
    } else {
        const result = data.filtredRecipes.filter(recipe => recipe.ingredients.map((element) => element.ingredient.toLowerCase().includes(research.toLowerCase())));
        return result
    }
}

//création de tag raté
// function displayTags() {
//     let liSortingItem = document.querySelectorAll(".liSorting-item");
//     liSortingItem.forEach((item) => {
//       item.addEventListener("click", (e) => {
//         const selectItem = e.target.innerHTML;
//         if (!tagsArray.includes(selectItem)) {
//           tagsArray.push(selectItem);
//         }
//         getTags();
//       });
//     });
//   };

// displayTags();

// function getTags() {
//     tagsArray.forEach((item) => {
//       const tagChoice = buildTagChoice(item);
//       tagChoiceBox.appendChild(tagChoice);
//     });
//   }

// function buildTagChoice(element){
//     const tagelement = document.createElement('div');
//     tagelement.className = 'tagChoice';
//     const textTag = document.createElement('span');
//     textTag.className = 'textTag';
//     textTag.innerHTML = element;
//     const btnClose = document.createElement('img');
//     btnClose.className = 'btnClose';
//     btnClose.src = './assets/close.svg'
//     btnClose.setAttribute('data-element', element);
//     tagelement.appendChild(textTag);
//     tagelement.appendChild(btnClose);
//     return tagelement;
// }
