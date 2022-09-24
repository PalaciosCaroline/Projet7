export function showModal(){
    const allRecipesCard = document.querySelectorAll('card');
    for (let i = 0; i < allRecipesCard.length; i++) {
        allRecipesCard[i].addEventListener('click', (event) => {
        event.preventDefault();
        const recipeChoiceId = allRecipesCard[i].data('id');
        console.log(recipeChoiceId);
        const modalBoxRecipe = document.getElementById('modalBoxRecipe');
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
        const recipeChoice = data.recipes.filter(recipe => recipe.id = recipeChoiceId)
        modalBoxRecipe.append(getCardRecipe(recipeChoice));
        })

        const btnCloseModal = document.getElementById('btn_closeModal');
        btnCloseModal.addEventListener('click', (event) => {
            event.preventDefault();
            modalBoxRecipe.remove(getCardRecipe(recipeChoice));
            modal.style.display = 'none';
        })
    }
}

// export function showCardModal() {
// // card.addEventListener('click', (event) => {
//     // event.preventDefault();
//     const modalBoxRecipe = document.getElementById('modalBoxRecipe');
//     const modal = document.getElementById('modal');
//     modal.style.display = 'flex';
//     modalBoxRecipe.innerHTML = '';
//     const cardModal = document.createElement('article');
//     cardModal.className = 'card border-secondary'
//     cardModal.innerHTML = `
//             <img class="card-img-top" src="./assets/carrotcake.jpg" alt="" />
//             <div className="cardText card-body">
//                 <header id="cardHeader" class="card-header d-flex justify-content-between">
//                     <h3 class="card-title">${recipe.name}</h3>
//                     <div class="cardTime">
//                     <img src="./assets/clock_icon.png" alt="" aria-hidden='true'/>
//                     <span class="font-weight-bold">${recipe.time}</span>
//                     </div>
//                 </header>
//                 <div class="row card_textContent d-flex justify-content-between">
//                     <ul id="cardUlIngredients" class="col-6">${getLiIngredients()}
//                     </ul>
//                     <div id="card_description" class="col-6">
//                         <p class="">${recipe.description}</p>
//                     </div>
//                 </div>
//             </div> `
//     modalBoxRecipe.append(cardModal);
//     // })
// }

// export function closeCardModal() {
//     // const btnCloseModal = document.getElementById('btn_closeModal');
//     // btnCloseModal.addEventListener('click', (event) => {
//         // event.preventDefault();
//         modal.style.display = 'none';
//         modalBoxRecipe.innerHTML = '';
//         // modalBoxRecipe.remove(cardModal);
//         // card.focus();
//     // })
// }