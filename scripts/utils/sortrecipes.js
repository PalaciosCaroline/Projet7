export function getStringForCompare(string) {
    return string
        .toLowerCase()
        .replace(/[àäâ]/g, "a")
        .replace(/[éèêë]/g, "e")
        .replace(/[']/g, "")
        .replace(/[.,"]/g, "")
        .replace(/[\d]/g, "")
        .replace(/[ç]/g, "c")
        .replace(/[îï]/g, "i")
        .replace(/[ôö]/g, "o")
        .replace(/[ùûû]/g, "u");
}

function swap(recipesforsort, leftIndex, rightIndex){
    var temp = recipesforsort[leftIndex];
    recipesforsort[leftIndex] = recipesforsort[rightIndex];
    recipesforsort[rightIndex] = temp;
}

function partition(recipesforsort, left, right) {
    let pivot   = recipesforsort[Math.floor((right + left) / 2)],
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (getStringForCompare(recipesforsort[i].name) < getStringForCompare(pivot.name)) {
            i++;
        }
        while (getStringForCompare(recipesforsort[j].name) > getStringForCompare(pivot.name)) {
            j--;
        }
        if (i <= j) {
            swap(recipesforsort, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

export function quickSort(recipesforsort, left, right) {
    let index;
    if (recipesforsort.length > 1) {
        index = partition(recipesforsort, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(recipesforsort, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(recipesforsort, index, right);
        }
    }
    return recipesforsort;
}
