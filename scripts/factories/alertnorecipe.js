export let isAlert;

export function noRecipeAlert(){
    document.querySelector('.input_search_bar').classList.add('alert');
    document.querySelector('#fieldset_searchbar').classList.add('alert');
    return isAlert = true;
}

export function removeNoRecipeAlert(){
    document.querySelector('.input_search_bar').classList.remove('alert');
    document.querySelector('#fieldset_searchbar').classList.remove('alert');
    return isAlert = false;
}