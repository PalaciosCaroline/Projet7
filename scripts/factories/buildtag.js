
export function buildTagChoice(element, typeclass){
    const tagelement = document.createElement('div');
    tagelement.className = `tagChoice ${typeclass}`;
    tagelement.id = element;
    const textTag = document.createElement('span');
    textTag.className = 'textTag';
    textTag.innerHTML = element;
    const btnClose = document.createElement('button');
    btnClose.className = 'btnClose';
    const btnIcon = document.createElement('icon');
    btnIcon.className = 'fa-regular fa-circle-xmark';
    tagelement.appendChild(textTag);
    tagelement.appendChild(btnClose);
    btnClose.appendChild(btnIcon);
    return tagelement;
}

export function displayTag(tags) {
    if (!tags || tags.length < 1){
        return true;
    } else if (tags.length >= 1){
        const tagChoiceBox = document.querySelector("#tagChoice_box");
        tagChoiceBox.innerHTML = '';
        for (var i = 1; i < tags.length; i++) {
            const tagElement = buildTagChoice(tags[i].value, tags[i].type);
            tagChoiceBox.appendChild(tagElement);
        }
    }
}

