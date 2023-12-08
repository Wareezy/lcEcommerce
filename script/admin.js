//this is my base array where all my items will be stored in the admin page
let jackets = [];

//this is declaring a varaible for my table where my values will be displayed
let table = document.querySelector("table");

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
let item1 = new Constructor(
  1,
  "NarutoVsSasuke",
  "Limited Edition Naruto vs Sasuke Jacket",
  200,
  "https://i.postimg.cc/tRKBTgzC/Jacket-white-B.png"
);
let item2 = new Constructor(
  2,
  "Luffy",
  "Black and white one piece jacket",
  700,
  "https://i.postimg.cc/ydP7NGM7/Jacket2-white-B.png"
);
let item3 = new Constructor(
  3,
  "Zoro",
  "One piece jacket with zoro on the front",
  100,
  "https://i.postimg.cc/V6BXkYs5/Jacket3-white-B.png"
);
let item4 = new Constructor(
  4,
  "Pirates",
  "One piece grafitti style jacket with the whole team",
  700,
  "https://i.postimg.cc/Tw7Y9SCC/Jacket4-white-B.png"
);
let item5 = new Constructor(
  5,
  "ZoroBlackAndWhite",
  "Black and white jacket featuring one piece character zoro",
  500,
  "https://i.postimg.cc/85hxkrrW/Jacket5-white-B.png"
);
let item6 = new Constructor(
  6,
  "Naruto",
  "Black and White naruto jacket",
  300,
  "https://i.postimg.cc/J0zKwy3R/jacket6-white-B.png"
);

//the jackets. push function is pretty obvious this method is responsible for pushing the objects which was created into the array that was created.
jackets.push(item1, item2, item3, item4, item5, item6);

//This piece of code is responsible for setting the array to the local storage. and also giving it a key of 'jackets'
localStorage.setItem("jackets", JSON.stringify(jackets));

//what i have done immediately after setting the item in the local storage is immediatly retrieving it using the getItem and then how do i call it using the
//key called 'jackets' key
jackets = JSON.parse(localStorage.getItem("jackets"));

//this is declaring the delete button variable that is being called usign the class name '.delete'
let deleteButton = document.querySelector(".delete");

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

function updateWhenAddorDelete() {
  localStorage.setItem("jackets", JSON.stringify(jackets));
  jackets = JSON.parse(localStorage.getItem("jackets"));
}

//this function is here to call the delete function which passes the parameter called position then when we call the array within the function by the name
//jacket and using dot notation to splice() and then assigning the position of 1
function removeItem(position) {
  jackets.splice(position, 1);
  updateWhenAddorDelete();
  //then after we call warren() function to display the values that have been deleted but we dont set it into the local stoage
  warren();
}

//this is calling the table variable and adding an event listen to any item inside the table that has a class item of 'delete'
table.addEventListener("click", function (event) {
  //here it looks for any item that was declared inside the innerHTML that contains a class named of "delete"
  if (event.target.classList.contains("delete")) {
    // when the item is targeted and found that it calls the removeItem function which was declared by the top and then  it targets a value... inside the value is an index
    //to which it will then delete
    removeItem(event.target.value);

    //but now i made an embedded if statement which says that if the arrya lenght reaches 0 then it must display the showSpinner() function
    if (jackets.length === 0) {
      showSpinner();
    }
  }
  //this code basically just means that if there are elements that are present in the 'jackets ' array
  //then we must check for a specific event and whether the event target matches the specific selection which is ('[data-editItemButton]')
  //the event was basically triggered by an element with a 'data-edtiItemButton' attribute
  else if (event.target.matches("[data-editItemButton]")) {
    //if this event is true then it will retreive the index of the clicked element
    //from the 'data-index' attribute of the clicked button

    //the dataset property is being used to access the customer data attributes that is found on an HTML element
    //preferably attributes that begin with the word "data-"
    //they basically allow you to stored private data to the page or application
    let index = event.target.dataset.index;

    //this line of code will call the 'displayModalWhichEdits' function with the jackets at the speicifed index and the index itself
    displayModalWhichEdits(jackets[index], index);
  }
});

//this function is simply responsible for displaying the content for the admin page
function warren() {
  //this variable will be responsible for displaying the sort item button
  let sortButton = `<button data-sort id="btnSort2">Sort Items</button>`;

  //this variable will be responsible for displaying the sort add button
  let addButton = `<button id="adminAdd" data-adminAdd>A NEW ITEM</button>`;

  //this variable will be responsible for displaying the table headers
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

  //this variable will be responsible for mapping through the jackets array which we declared at the beginning of the code
  //and it will display in the table the id,name,price,description,picture as well as the edit button and the delete button
  let products = jackets.map(function (item, index) {
    return `
            <tbody>
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>R${item.price}</td>
                    <td>${item.description}</td>
                    <td><img id="imgAdmin" src="${item.url}" width='300' height='300'/></td>
                    <td><button data-editItemButton id="adminEdit" data-index="${index}">Edit</button></td>
                    <td><button class="delete" value='${index}'>Delete</button></td>
                </tr>
            </tbody>
        `;
  });

  //this code will be displaying to the table variable and what we are basically doing is just calling all the variables that we have created
  table.innerHTML = sortButton + headerValues + addButton + products.join("");
}

//here im just calling the function again to be displayed
warren();

//this function was created with the sole purpose of adding a new item into the jackets array
function addNewItemEventListener() {
  //this code is finding the button that contains the the data tag '[data-adminAdd]'
  document
    .querySelector("[data-adminAdd]")
    .addEventListener("click", function () {
      //then when the button is clicked then it will be displayed in the div with the tag "data-modal"
      document.querySelector("[data-modal]").innerHTML = `
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

      //here is where the comments stopped

      // Create a new Bootstrap modal instance for the 'Add Item' modal
      let addItemModal = new bootstrap.Modal(
        document.querySelector("[data-addItemModal]")
      );

      // Show the 'Add Item' modal when the 'adminAdd' button is clicked
      addItemModal.show();

      // Add an event listener to the form inside the 'Add Item' modal
      document
        .querySelector("[data-addItemForm]")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          try {
            // Retrieve values from form fields
            let newItemId = document.querySelector("[data-itemId]").value;
            let newItemName = document.querySelector("[data-itemName]").value;
            let newItemDescription = document.querySelector(
              "[data-itemDescription]"
            ).value;
            let newItemPrice = document.querySelector("[data-Price]").value;

            // Check if required fields are not empty
            if (
              !newItemId ||
              !newItemName ||
              !newItemDescription ||
              !newItemPrice
            ) {
              throw new Error("Please fill in all required fields.");
            }

            // Check if the price is a valid number
            if (isNaN(newItemPrice) || newItemPrice <= 0) {
              throw new Error(
                "Please enter a valid positive number for the price."
              );
            }

            // Create a new item object with the provided values
            let newItem = {
              id: parseInt(newItemId),
              name: newItemName,
              description: newItemDescription,
              price: parseInt(newItemPrice),
              url: "https://i.postimg.cc/3rZ0H0D8/profile-Image.png",
              quantity: 1,
            };

            // Add the new item to the 'jackets' array
            jackets.push(newItem);

            // Store the updated 'jackets' array in local storage
            localStorage.setItem("jackets", JSON.stringify(jackets));

            // Call the function 'warren' (assuming it's a valid function)
            warren();

            // Hide the 'Add Item' modal
            addItemModal.hide();

            // Call the function 'addNewItemEventListener'
            addNewItemEventListener();
          } catch (error) {
            // Display an alert with the error message to the user
            alert(error.message);
          }
        });
    });
}

// Call the function to set up the event listener
addNewItemEventListener();

function displayModalWhichEdits(item, index) {
  document.getElementById("Modal").innerHTML = `
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

  // Create a new Bootstrap modal instance for the 'Edit Item' modal
  let editItem = new bootstrap.Modal(
    document.querySelector("[data-editModalItem]")
  );

  // Show the 'Edit Item' modal when triggered
  editItem.show();

  // Add an event listener to the form inside the 'Edit Item' modal
  document
    .querySelector("[data-editedFormItem]")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      try {
        // Retrieve the index of the item being edited from the form
        let editedIndexOfItem = parseInt(
          document.querySelector("[data-editIndexOfItem]").value
        );

        // Update the properties of the item at the specified index
        jackets[editedIndexOfItem].id = parseInt(
          document.querySelector("[data-editIdOfItem]").value
        );
        jackets[editedIndexOfItem].name = document.querySelector(
          "[data-editNameOfItem]"
        ).value;
        jackets[editedIndexOfItem].description = document.querySelector(
          "[data-editDescriptionOfItem]"
        ).value;
        jackets[editedIndexOfItem].price = parseInt(
          document.querySelector("[data-editPriceOfItem]").value
        );

        // Store the updated 'jackets' array in local storage
        localStorage.setItem("jackets", JSON.stringify(jackets));

        // Hide the 'Edit Item' modal
        editItem.hide();

        // Call functions to update the display and event listeners
        warren();
        addNewItemEventListener();
      } catch (error) {
        // Display an alert with the error message if an error occurs
        alert(error.message);
      }
    });
}

function sortItems() {
  //calling the array jackets along with the sort method. it then passes 2 parameters a and b and then assigns them to variables called PriceA and PriceB
  jackets.sort((a, b) => {
    let priceA = a.price;
    let priceB = b.price;

    if (priceA < priceB) {
      return -1;
    }
    if (priceA > priceB) {
      return 1;
    }

    return 0;
  });
}

let btnSort = document.querySelector("[data-sort]");
btnSort.addEventListener("click", () => {
  sortItems();
  warren();
  addNewItemEventListener();
});
