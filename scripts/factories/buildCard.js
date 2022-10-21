const modalBoxRecipe = document.getElementById('modalBoxRecipe');
const modal = document.getElementById('modal');

function getCardRecipe(recipe) {

    function getUnit(elt) { 
        if (elt)
            if(elt == 'grammes') {
                return 'g';
            } else if (elt == 'cuillères à soupe') {
                return 'cuillères';
            } else { return elt;
        }  
    }

    function getLiIngredients() {
        let ul = '<ul>'
               recipe.ingredients.forEach(item => {
                   const unit = (item.unit)? item.unit : "";
                   const li = `<li><span class="font-weight-bold">${item.ingredient
                    ? item.ingredient : ""}</span>${item.quantity ? `: ${item.quantity}` : ''} ${item.unit ? getUnit(item.unit) : ""}</li>`;
                   ul += li;
               })
               ul += '</ul>';
       return ul;
       }

    const card = document.createElement('article');
    card.className = 'card border-secondary';
    const cardContent = `
    <img class="card-img-top" src="./assets/carrotcake.jpg" alt="" />
    <div class="cardText card-body">
        <header id="cardHeader" class="card-header d-flex justify-content-between">
            <h2 class="card-title">${recipe.name}</h2>
            <div class="cardTime">
            <i class="fa-regular fa-clock" aria-hidden='true'></i>
            <span class="font-weight-bold">${recipe.time} min</span>
            </div>
        </header>
        <div class="row card_textContent d-flex justify-content-between">
            <ul id="cardUlIngredients" class="col-6">${getLiIngredients()}
            </ul>
            <div id="card_description" class="col-6">
                <p class="">${recipe.description}</p>
            </div>
        </div>
    </div> `
    card.innerHTML = cardContent;

    card.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'flex';
    modalBoxRecipe.innerHTML = '';
    const cardModal = document.createElement('article');
    cardModal.className = 'card'
    cardModal.innerHTML = cardContent;
    modalBoxRecipe.append(cardModal);
    })

    const btnCloseModal = document.getElementById('btn_closeModal');
    btnCloseModal.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'none';
    })

    document.addEventListener('keyup',  (e) => {
        if (e.key === 'Escape') {
        e.preventDefault();
        modal.style.display = 'none';
        }
    })       
    return card;
}

export function displayRecipes(value){
    const boxRecipes = document.getElementById('box_recipes');
    boxRecipes.innerHTML = '';
    value.forEach(recipe => boxRecipes.appendChild(getCardRecipe(recipe)));
}
