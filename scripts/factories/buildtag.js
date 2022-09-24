
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

