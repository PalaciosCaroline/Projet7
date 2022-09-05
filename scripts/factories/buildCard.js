export function getCardRecipe(recipe) {

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

      
        const divCard = document.createElement('div');
        divCard.classList = 'divCard col-md-6 col-xl-4 col-sm-12';
        divCard.innerHTML = `
        <article class="card border-secondary">
            <img class="card-img-top" src="" alt="" />
            <div className="cardText card-body">
                <header id="cardHeader" class="card-header d-flex justify-content-between">
                    <h3 class="card-title">${recipe.name}</h3>
                    <div class="cardTime">
                    <img src="./assets/clock_icon.png" alt="" aria-hidden='true'/>
                    <span class="font-weight-bold">${recipe.time}</span>
                    </div>
                </header>
                <div class="row card_textContent d-flex justify-content-between">
                    <ul id="cardUlIngredients" class="col-6">${getLiIngredients()}
                    </ul>
                    <div id="card_description" class="col-6">
                        <p>${recipe.description}</p>
                    </div>
                </div>
            </div>
        </article>
        `
    return divCard;
}


