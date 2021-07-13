const catsDB = {};

function nextID(){
    let id;
    do {
        id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    }
    while (catsDB[id] != undefined);

    return id;
}

function addCat(item){
    catsDB[nextID()] = item
}

function deleteCat(id){
    delete catsDB[id]
}

module.exports = {
    addCat,
    deleteCat, 
    catsDB
}
