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