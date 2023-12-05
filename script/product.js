let btnSort = document.querySelector('[data-sort]');
let btnSearch = document.querySelector('[data-search]');
let main = document.querySelector('main');
let purchasedJackets = [];
let container=document.querySelector('[data-productsCard]')
// Retrieve items from localStorage or initialize an empty array
let  jackets = JSON.parse(localStorage.getItem('jackets'));

// Call display() when the page loads
display();

main.addEventListener('click', function () {
    if (event.target.hasAttribute('data-add')) {
        add(event.target.value);
    }
});

// Sort function for organizing items alphabetically
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

function display(filteredItems) {
    let productCardsContainer = document.querySelector('[data-productsCard]');

//if you call the function display without passing any argument, then what will happen 
//is that it will display all the items
//because the the itemsToDisplay with default to the items using the || operator which will display all items
        
    productCardsContainer.innerHTML = (filteredItems || jackets).map(function (item, index) {
        return `
        <div class="col-md-4 my-5 d-flex justify-content-center">
        <div class="card h-100" style="width: 18rem;">

            <img src="${item.url}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 style="color: #44D62C;" class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text" style="font-size: 16px;">Price: ${item.price}</p>
                <div class="d-flex justify-content-center"> <!-- This div ensures buttons are in the same row -->
                    <button class="btn btn-primary add-cart-button">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
        `;
    }).join('');
}

// Call the display function
display();

// Event listener for the Sort button
btnSort.addEventListener('click', () => {
    sortItems();
    display();
});






// This function will be used to search for values that the user has added
function search() {
    let userInput = document.querySelector('[data-input]').value.toUpperCase();

    // Filter items based on user input then convert the user input to upperCase
    let filteredItems = jackets.filter(item => item.name.toUpperCase().includes(userInput));

    // If the filtered element is greater than 0, items are found
    if (filteredItems.length > 0) {
        // If items are found, display only those items
        display(filteredItems);
    } else if (filteredItems.length==0) {
       container.innerHTML='<p class="para">Item(s) was not found</p>' 
    }
}

// Event listener for the Search button
btnSearch.addEventListener('click', () => {
    search();
});
