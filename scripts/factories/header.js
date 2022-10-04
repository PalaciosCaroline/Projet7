// export function buildHeader(){
// const header = document.createElement('header');
// header.className = 'header_page container'
// header.innerHTML = `
// <img src="./assets/logo_toque.png" alt="logo toque de cuisinier" class="d-block mx-auto logo_toque">
// <h1 class=""><img class= "d-block mx-auto" src="./assets/Les petits plats.png" alt="Les petits plats"></h1>`
// return header;
// }

export function noRecipeAlert(){
    document.getElementById('noresult_box').innerHTML =
    '<div class="norecipe">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
    document.querySelector('.input_search_bar').classList.add('alert');
    document.querySelector('#fieldset_searchbar').classList.add('alert');
    document.querySelector('#fieldset_searchbar i').classList.add('alertColor');
}

export function removeNoRecipeAlert(){
    document.getElementById('noresult_box').innerHTML = '';
    document.querySelector('.input_search_bar').classList.remove('alert');
    document.querySelector('#fieldset_searchbar').classList.remove('alert');
    document.querySelector('#fieldset_searchbar i').classList.remove('alertColor');
}