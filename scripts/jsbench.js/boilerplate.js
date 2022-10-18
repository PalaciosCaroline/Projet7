function getStringForCompare(string) {
    return string
      .toLowerCase()
       .replace(/[àäâ]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[']/g, "")
      .replace(/[\d]/g, "")
      .replace(/[ç]/g, "c")
      .replace(/[îï]/g, "i")
      .replace(/[ôö]/g, "o")
      .replace(/[ùûû]/g, "u");
}

let datas = {};
datas.recipes = [...recipesSort];

let datasProxy = new Proxy(datas, {
    set: function(target, key, value) {
        target[key] = value;
        switch(key) {  
            case 'searchString': {
                const result = searchRecipeBySearchBar(value);
                if(result){
                datasProxy.filtredRecipes = [...result];
                }
              break;
            }
        }
        return true;
    }
});

datasProxy.filtredRecipes = [...recipesSort];
datasProxy.searchLength = 5;
datasProxy.searchString = 'ananas';
datasProxy.searchLength = 2;
datasProxy.searchString = 'coc';
datasProxy.searchLength = 3;
datasProxy.searchString = 'coco';
datasProxy.searchLength = 4;
datasProxy.searchString = 'coc';

