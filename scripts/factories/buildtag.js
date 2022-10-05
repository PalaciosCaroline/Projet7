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
    } else if (tags.length >= 0){
        const tagChoiceBox = document.querySelector("#tagChoice_box");
        tagChoiceBox.innerHTML = '';
        tags.forEach((tag) => {
            const tagElement = buildTagChoice(tag.value, tag.type);
            tagChoiceBox.appendChild(tagElement);
        });
    } else if (tags.length <= 0){
        return true;
    }

}

