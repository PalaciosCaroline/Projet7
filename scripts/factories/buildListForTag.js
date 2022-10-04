export const boxresultsUl = document.querySelectorAll('.boxresultsUl');
const btnList = document.querySelectorAll('.btn_list');
const icons = document.querySelectorAll('.btn_list i');
const boxresults = document.querySelectorAll('.boxresults');
const inputList = document.querySelectorAll('.inputList');


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
    buildUlListfilter(ingredientsArray, boxresultsUl[0]);
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
//     buildUlListfilter(ingredientsArray, boxresultsUl[0]);
// }

export function getApplianceList(recipes){
    let applianceArray = [];
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    applianceArray = [...new Set(applianceArray)].sort();
    buildUlListfilter(applianceArray, boxresultsUl[1]);
    })
}
export function getUstensilsList(recipes){
    let ustensilsArray = [];
    recipes.forEach((recipe) => {
    recipe.ustensils.map((element) => ustensilsArray.push(element.toLowerCase()));
    ustensilsArray = [...new Set(ustensilsArray)].sort();
    buildUlListfilter(ustensilsArray, boxresultsUl[2]);
    })
}

function chevronUp(item){
    item.classList.remove('fa-chevron-down');
    item.classList.add('fa-chevron-up');
}

function chevronDown(item){
    item.classList.remove('fa-chevron-up');
    item.classList.add('fa-chevron-down');
}

function openListTagChoice(itemOpen, indexOpen, itemclose1, indexclose1, itemclose2, indexclose2){
    chevronUp(itemOpen);
    boxresults[indexOpen].classList.add('open');
    // boxresultsUl[indexOpen].style.display = 'flex';
    // boxresultsUl[indexOpen].classList.add('visibleList');
    if(btnList[indexclose1].classList.contains('isOpen')){
        closeListTagChoice(itemclose1, indexclose1);
    }else if(btnList[indexclose2].classList.contains('isOpen')) {
        closeListTagChoice(itemclose2, indexclose2);
    }
}

function closeListTagChoice(item, index){
    chevronDown(item);
    btnList[index].classList.remove('isOpen');
    boxresults[index].classList.remove('open');
    // boxresultsUl[index].style.display = 'none';
}

export function getOpenListTag() {

    btnList.forEach(item => item.addEventListener('click', () => {
        if(!item.classList.contains('isOpen')){
            item.classList.add('isOpen');
            if(item.classList.contains('btn_ingredients')){
                    openListTagChoice(icons[0], 0, icons[1], 1, icons[2], 2);
            }else if(item.classList.contains('btn_appliance')){
                    openListTagChoice(icons[1], 1, icons[0], 0, icons[2], 2);
            } else if(item.classList.contains('btn_ustensils')){
                    openListTagChoice(icons[2], 2, icons[1], 1, icons[0], 0);
            }
        } else if(item.classList.contains('isOpen')){
            if(item.classList.contains('btn_ingredients')){
                closeListTagChoice(icons[0], 0);
                inputList[0].value = '';
            } else if(item.classList.contains('btn_appliance')){
                closeListTagChoice(icons[1], 1);
                inputList[1].value = '';
            } else if(item.classList.contains('btn_ustensils')){
                closeListTagChoice(icons[2], 2);
                inputList[2].value = '';
            }
        }
    }));

    inputList.forEach(item => item.addEventListener('focusin', (e) => {
        if(e.target.parentNode.classList.contains('label_ingredients')){
            btnList[0].classList.add('isOpen');
            openListTagChoice(icons[0], 0, icons[1], 1,icons[2], 2);
        } else if(e.target.parentNode.classList.contains('label_appliance')) {
            btnList[1].classList.add('isOpen');
            openListTagChoice(icons[1], 1,icons[0], 0,icons[2], 2);
        } else if(e.target.parentNode.classList.contains('label_ustensils')) {
            btnList[2].classList.add('isOpen');
            openListTagChoice(icons[2], 2, icons[1], 1, icons[0], 0);
        }
    }));
}
