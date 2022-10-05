
export function buildTagChoice(element, typeclass){
    const tagelement = document.createElement('div');
    tagelement.className = `tagChoice ${typeclass}`;
    tagelement.id = element;
    const textTag = document.createElement('span');
    textTag.className = 'textTag';
    textTag.innerHTML = element;
    const btnClose = document.createElement('img');
    btnClose.className = 'btnClose';
    btnClose.src = './assets/close.svg'
    btnClose.setAttribute('data-element', element);
    tagelement.appendChild(textTag);
    tagelement.appendChild(btnClose);
    return tagelement;
}

export function displayTag(tags) {
    if (!tags){
        return true;
    } else (tags.length >= 0)
        const tagChoiceBox = document.querySelector("#tagChoice_box");
        tagChoiceBox.innerHTML = '';
        for (var i = 0; i < tags.length; i++) {
            if(tags[i].type != 'search_bar'){
            const tagElement = buildTagChoice(tags[i].value, tags[i].type);
            tagChoiceBox.appendChild(tagElement);
            }
        }
}



