
//this is my base array where all my items will be stored in the admin page
let jackets = [];

//this is declaring a varaible for my table where my values will be displayed
let table = document.querySelector('table');


//this is my constructor function is declared that will be housing all of the objects which i havve declared
function Constructor(id, name, description, price, url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url = url;

    //got the idea from our lecturer matthew that if we want to display the quantity then we need to declare it will a default value of 1
    //this will serve a function later on to display the quantity effectively 
    this.quantity = 1;
}


//this is all the objects that i have created which will be passed into the constructor
    let item1 = new Constructor(1, "NarutoVsSasuke", 'Limited Edition Naruto vs Sasuke Jacket', 200, 'https://i.postimg.cc/tRKBTgzC/Jacket-white-B.png');
    let item2 = new Constructor(2, "Luffy", 'Black and white one piece jacket', 700, 'https://i.postimg.cc/ydP7NGM7/Jacket2-white-B.png');
    let item3 = new Constructor(3, "Zoro", 'One piece jacket with zoro on the front', 100, 'https://i.postimg.cc/V6BXkYs5/Jacket3-white-B.png');
    let item4 = new Constructor(4, "Pirates", 'One piece grafitti style jacket with the whole team', 700, 'https://i.postimg.cc/Tw7Y9SCC/Jacket4-white-B.png');
    let item5 = new Constructor(5, "ZoroBlackAndWhite", 'Black and white jacket featuring one piece character zoro', 500, 'https://i.postimg.cc/85hxkrrW/Jacket5-white-B.png');
    let item6 = new Constructor(6, "Naruto", 'Black and White naruto jacket', 300, 'https://i.postimg.cc/J0zKwy3R/jacket6-white-B.png');



//the jackets. push function is pretty obvious this method is responsible for pushing the objects which was created into the array that was created.
jackets.push(item1, item2, item3, item4, item5, item6);

//This piece of code is responsible for setting the array to the local storage. and also giving it a key of 'jackets'
localStorage.setItem('jackets', JSON.stringify(jackets));


//what i have done immediately after setting the item in the local storage is immediatly retrieving it using the getItem and then how do i call it using the 
//key called 'jackets' key
jackets = JSON.parse(localStorage.getItem('jackets'));


//this is declaring the delete button variable that is being called usign the class name '.delete'
let deleteButton = document.querySelector('.delete');


//This code is here to display the showSpinner we will use this later when the table values in the admin reaches 0 then it will display the spinner
function showSpinner() {
    let addSpinner = `
    <div id="spinner">
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
        </div>
    `;

    //this piece of codewill display the spinner inside the table tag using innerHTML
    table.innerHTML = addSpinner;
}


function updateWhenAddorDelete(){ 
    localStorage.setItem('jackets',JSON.stringify(jackets))
    jackets=JSON.parse(localStorage.getItem('jackets'))
   
}

//this function is here to call the delete function which passes the parameter called position then when we call the array within the function by the name
//jacket and using dot notation to splice() and then assigning the position of 1
function removeItem(position) {
    jackets.splice(position, 1);
updateWhenAddorDelete()
    //then after we call warren() function to display the values that have been deleted but we dont set it into the local stoage 
    warren();
}


//this is calling the table variable and adding an event listen to any item inside the table that has a class item of 'delete'
table.addEventListener('click', function (event) {

    //here it looks for any item that was declared inside the innerHTML that contains a class named of "delete"
    if (event.target.classList.contains('delete')) {


        // when the item is targeted and found that it calls the removeItem function which was declared by the top and then  it targets a value... inside the value is an index
        //to which it will then delete
        removeItem(event.target.value);


        //but now i made an embedded if statement which says that if the arrya lenght reaches 0 then it must display the showSpinner() function
        if (jackets.length === 0) {
            showSpinner();
        }
    } 

    else if (event.target.matches('[data-editItemButton]')) {
        let index = event.target.dataset.index;
        displayEditModal(jackets[index], index);
    }
});

function warren() {
    let sortButton = `<button data-sort id="btnSort2">Sort Items</button>`;
    let addButton = `<button id="adminAdd">A NEW ITEM</button>`;
    let headerValues = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>`;

    let products = jackets.map(function (item, index) {
        return `
            <tbody>
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>R${item.price}</td>
                    <td>${item.description}</td>
                    <td><img src="${item.url}" width='300' height='300'/></td>
                    <td><button data-editItemButton id="adminEdit" data-index="${index}">Edit</button></td>
                    <td><button class="delete" value='${index}'>Delete</button></td>
                </tr>
            </tbody>
        `;
    });

    table.innerHTML = sortButton + headerValues + addButton + products.join('');
}

warren();

function addNewItemEventListener(){
document.getElementById('adminAdd').addEventListener('click', function () {
    document.getElementById('Modal').innerHTML = `
        <div id="addItemModal" data-addItemModal class="modal fade" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addItemModalLabel">Add New Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addItemForm" data-addItemForm>
                            <label for="itemId">ID:</label>
                            <input type="number" id="itemId" data-itemId required>
                            <label for="itemName">Name:</label>
                            <input type="text" id="itemName" data-itemName required>
                            <label for="itemDescription">Description:</label>
                            <input type="text" id="itemDescription"  data-itemDescription required>
                            <label for="itemPrice">Price:</label>
                            <input type="number" id="itemPrice" data-Price required>
                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    let addItemModal = new bootstrap.Modal(document.querySelector('[data-addItemModal]'));
    addItemModal.show();

    document.querySelector('[data-addItemForm]').addEventListener('submit', function (event) {
        event.preventDefault();

        let newItemId = document.querySelector('[data-itemId]').value;
        let newItemName = document.querySelector('[data-itemName]').value;
        let newItemDescription = document.querySelector('[data-itemDescription]').value;
        let newItemPrice = document.querySelector('[data-Price]').value;

        let newItem = {
            id: parseInt(newItemId),
            name: newItemName,
            description: newItemDescription,
            price: parseInt(newItemPrice),
            url: 'https://i.postimg.cc/3rZ0H0D8/profile-Image.png',
            quantity: 1,
        };

        jackets.push(newItem);
        localStorage.setItem('jackets', JSON.stringify(jackets));

        warren();
       
        addItemModal.hide();
        addNewItemEventListener();

        sortItems();
    });
});}
addNewItemEventListener();
 



function displayEditModal(item, index) {
    document.getElementById('Modal').innerHTML = `
        <div id="editItemModal" data-editModalItem class="modal fade" tabindex="-1" aria-labelledby="editItemModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editItemModalLabel" >Edit Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editItemForm" data-editedFormItem>
                            <input type="hidden" id="editItemIndex" data-editIndexOfItem value="${index}">
                            <label for="editItemId">ID:</label>
                            <input type="number" id="editItemId"  data-editIdOfItem value="${item.id}" required>
                            <label for="editItemName">Name:</label>
                            <input type="text" id="editItemName"  data-editNameOfItem value="${item.name}" required>
                            <label for="editItemDescription">Description:</label>
                            <input type="text" id="editItemDescription"  data-editDescriptionOfItem value="${item.description}" required>
                            <label for="editItemPrice">Price:</label>
                            <input type="number" id="editItemPrice"  data-editPriceOfItem value="${item.price}" required>
                            <button type="submit">Confirm final changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    let editItem = new bootstrap.Modal(document.querySelector('[data-editModalItem]'));
    editItem.show();

    document.querySelector('[data-editedFormItem]').addEventListener('submit', function (event) {
        event.preventDefault();

        let editedIndexOfItem = parseInt(document.querySelector('[data-editIndexOfItem]').value);
        jackets[editedIndexOfItem].id = parseInt(document.querySelector('[data-editIdOfItem]').value);
        jackets[editedIndexOfItem].name = document.querySelector('[data-editNameOfItem]').value;
        jackets[editedIndexOfItem].description = document.querySelector('[data-editDescriptionOfItem]').value;
        jackets[editedIndexOfItem].price = parseInt(document.querySelector('[data-editPriceOfItem]').value);

        localStorage.setItem('jackets', JSON.stringify(jackets));
        
        editItem.hide();

        addNewItemEventListener();
        sortItems();
        warren();
    });
}


function sortItems() {
    //calling the array jackets along with the sort method. it then passes 2 parameters a and b and then assigns them to variables called PriceA and PriceB
    jackets.sort((a, b) => {
        let priceA = a.price
        let priceB = b.price

        if (priceA < priceB) 
        {
            return -1;
        }
        if (priceA > priceB) 
        {
            return 1;
        }
        
        return 0;
    });
}

let btnSort=document.querySelector('[data-sort]')
btnSort.addEventListener('click', () => {
    sortItems();
    warren();
    addNewItemEventListener();
});