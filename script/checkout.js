let cartItems=JSON.parse(localStorage.getItem('purchasedJackets'))
let table= document.querySelector('table')

//declaring a variable for the delete button
let deleteButton=document.querySelector('.delete')
let btnPurchase=document.querySelector('[data-purchase]')


// this function is responsible for finding the duplicates which is located in the purchasedJackets array which has the variable name cartItems
function updateCartItems() {
    let updatedCart = [];
    cartItems.forEach(item => {
        let existingItem = updatedCart.find(updatedItem => updatedItem.name === item.name);
        if (existingItem) {

            // Increase quantity for duplicates
            existingItem.quantity += 1; 
        } else {
            updatedCart.push({ ...item, quantity: 1 }); // Add new items with quantity 1
        }
    });
    cartItems = updatedCart;
}




//this is just the function

function removeItem(position)
{

    cartItems.splice(position,1)
    displayCheckout() 
}


// map through the array 
//or use a conditional statement to loop through the array and add all the prices
function displayCheckout(){

    let tableHead = `
    <!-- This code is responsible for displaying the headers of the table -->
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th> 
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove Item</th>
        </tr>
    </thead>
`;

let totalPrice = 0;

let displayCheckout = cartItems.map((item, index) => {


    
    let totalPriceItem = item.price * item.quantity;
    totalPrice += totalPriceItem;

    return `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td><img src="${item.url}" width='300' height='300'/></td>
            <td>R${totalPriceItem}</td>
            <td>${item.quantity}</td>
            <td><button class="delete" value='${index}'>Delete</button></td>
        </tr>
    `;
});

let totalRow = `
    <tr>
        <td colspan="4">Total Price of all Items</td>
        <td>R${totalPrice}</td>
        <td colspan="2"></td>
    </tr>
`;

table.innerHTML = tableHead + displayCheckout.join('') + totalRow;
}

updateCartItems();
displayCheckout()



//this piece of code calls the table variable and assigns a function to it 
table.addEventListener('click', function(){

    //even.target refers to the actual HTML element on which the event occurs
    //when the event is triggered then the event.target points to the elemeht that triggered the event
    if(event.target.classList.contains('delete')){
        //removing the value which is based on the index
        removeItem(event.target.value)
        // alert(event.target.value)
        
        localStorage.setItem('purchasedJackets',JSON.stringify(cartItems))


    }
})

function displayModal() {
    // Create the modal structure using innerHTML
    document.getElementById('Modal').innerHTML = `
        <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="purchaseModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="purchaseModalLabel">Purchase Confirmation</h5>
                        <button type="button" class="btn-close" id="modalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Thank you for your purchase!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="modalCloseButton" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Show the modal using Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    modal.show();

    // Event listener for the modal close button
    document.getElementById('modalCloseButton').addEventListener('click', () => {
        // Clear the content of the table
        document.querySelector('table').innerHTML = '';
        // Close the modal
        modal.hide();
        // Clear local storage and reset cartItems
        localStorage.removeItem('purchasedJackets');
        cartItems = [];
        // Display the updated checkout
        displayCheckout();
    });
}

// Event listener for the purchase button
document.getElementById('adminPurchase').addEventListener('click', () => {
    // Display the modal
    updateCartItems();
    displayModal();
});


