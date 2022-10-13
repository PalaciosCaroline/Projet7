export const boxresultsUl = document.querySelectorAll('.boxresultsUl');
const btnList = document.querySelectorAll('.btn_list');
const icons = document.querySelectorAll('.btn_list i');
const boxresults = document.querySelectorAll('.boxresults');
const inputList = document.querySelectorAll('.inputList');

export function buildUlListfilter(ArrayList, containerList) {
    containerList.innerHTML = '';
    ArrayList.forEach((item => {
        const liSortingItem = document.createElement('li');
        liSortingItem.innerHTML = item;
        liSortingItem.className = 'p-2 liSorting-item text-white';
        containerList.appendChild(liSortingItem);
    })) 
}

function chevronUp(item){
    item.className = 'fa fa-chevron-up text-white';
}

function chevronDown(item){
    item.className = 'fa fa-chevron-down text-white';
}

function openListTagChoice(itemOpen, indexOpen, itemclose1, indexclose1, itemclose2, indexclose2){
    chevronUp(itemOpen);
    boxresults[indexOpen].classList.add('open');
    if(btnList[indexclose1].classList.contains('isOpen')){
        closeListTagChoice(itemclose1, indexclose1);
    }else if(btnList[indexclose2].classList.contains('isOpen')) {
        closeListTagChoice(itemclose2, indexclose2);
    }
}

function closeListTagChoice(item, index){
     boxresults[index].querySelector('input').value = '';
    chevronDown(item);
    btnList[index].classList.remove('isOpen');
    boxresults[index].classList.remove('open');
}

export function getOpenListTag() {
    btnList.forEach(item => item.addEventListener('click', () => {
        if(!item.classList.contains('isOpen')){
            item.classList.add('isOpen');
            if(item.classList.contains('btn_ingredients')){
            // if(e.target.id = 'btn_ingredients'){
                    openListTagChoice(icons[0], 0, icons[1], 1, icons[2], 2);
            }else if(item.classList.contains('btn_appliance')){
                    openListTagChoice(icons[1], 1, icons[0], 0, icons[2], 2);
            } else if(item.classList.contains('btn_ustensils')){
                    openListTagChoice(icons[2], 2, icons[1], 1, icons[0], 0);
            }
        } else if(item.classList.contains('isOpen')){
            if(item.classList.contains('btn_ingredients')){
                closeListTagChoice(icons[0], 0);
                inputList[0].value = '';
            } else if(item.classList.contains('btn_appliance')){
                closeListTagChoice(icons[1], 1);
                inputList[1].value = '';
            } else if(item.classList.contains('btn_ustensils')){
                closeListTagChoice(icons[2], 2);
                inputList[2].value = '';
            }
        }
    }));

    inputList.forEach(item => item.addEventListener('focusin', (e) => {
        if(e.target.parentNode.classList.contains('label_ingredients')){
            btnList[0].classList.add('isOpen');
            openListTagChoice(icons[0], 0, icons[1], 1,icons[2], 2);
        } else if(e.target.parentNode.classList.contains('label_appliance')) {
            btnList[1].classList.add('isOpen');
            openListTagChoice(icons[1], 1,icons[0], 0,icons[2], 2);
        } else if(e.target.parentNode.classList.contains('label_ustensils')) {
            btnList[2].classList.add('isOpen');
            openListTagChoice(icons[2], 2, icons[1], 1, icons[0], 0);
        }
    }));
}
