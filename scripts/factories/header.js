// export function buildHeader(){
// header.className = 'header_page container'
// header.innerHTML = `
// <img src="./assets/logo_toque.png" alt="logo toque de cuisinier" class="d-block mx-auto logo_toque">
// <h1 class=""><img class= "d-block mx-auto" src="./assets/Les petits plats.png" alt="Les petits plats"></h1>`
// return header;
// }

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