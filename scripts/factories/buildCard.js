export function getCardRecipe(recipe) {
        const card = document.createElement('article');
        card.classList = 'card';
        card.innerHTML = `
        <img class="card-img-top" src="" alt="" />
        <div className="cardText card-body">
            <header id="cardHeader" class="card-header d-flex justify-content-between">
                <h3 class="card-title">${recipe.name}</h3>
                <div class="cardTime">
                <img src="./assets/clock_icon.png" alt="" aria-hidden='true'/>
                <span>${recipe.time}</span>
                </div>
            </header>
            <div class="card_textContent d-flex justify-content-between">
                <ul id="cardUlIngredients" class="">${recipe.ingredients.map(
                    (element) =>
                      `<li><span>${element.ingredient}</span> : ${
                        "quantity" in element ? element.quantity : ""
                      }
                  ${"unit" in element ? element.unit : ""}`
                  )}</li>
                </ul>
                <div id="card_description" class="">
                    <p>${recipe.description}</p>
                </div>
            </div>
        </div>
        `
    return card;
}


