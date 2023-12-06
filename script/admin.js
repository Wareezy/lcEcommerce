let jackets=[]
//declaring a variable for table
let table=document.querySelector('table')

//declaring a variable for the spinner
let spinner = document.querySelector('spinner');

function Constructor(id,name,description,price,url)
{
    this.id=id;
    this.name=name;
    this.description=description;
    this.price=price;
    this.url=url;
    this.quantity=1
}


//creating the objects that will be passed into the constructor function

let item1=new Constructor(1,"NarutoVsSasuke",'Limited Edition Naruto vs Sasuke Jacket',200,'https://i.postimg.cc/tRKBTgzC/Jacket-white-B.png')
let item2=new Constructor(2,"Luffy",'Black and white one piece jacket',700,'https://i.postimg.cc/ydP7NGM7/Jacket2-white-B.png')
let item3=new Constructor(3,"Zoro",'One piece jacket with zoro on the front',100,'https://i.postimg.cc/V6BXkYs5/Jacket3-white-B.png')
let item4=new Constructor(4,"Pirates",'One piece grafitti style jacket with whole team',700,'https://i.postimg.cc/Tw7Y9SCC/Jacket4-white-B.png')
let item5=new Constructor(5,"ZoroBlackAndWhite",'Black and white jacket featuring one piece character zoro',500,'https://i.postimg.cc/85hxkrrW/Jacket5-white-B.png')
let item6=new Constructor(6,"Naruto",'Black and White naruto jacket',300,'https://i.postimg.cc/J0zKwy3R/jacket6-white-B.png')


//push the objects into the array jackets 
jackets.push(item1,item2,item3,item4,item5,item6)


//set the items into the local storage 
localStorage.setItem('jackets',JSON.stringify(jackets))


//get itmes from the local storage
jackets=JSON.parse(localStorage.getItem('jackets'))


//declaring a variable for the delete button
let deleteButton=document.querySelector('.delete')

function showSpinner() {
    //This function is responsible for displaying the spinner to the html page
    let addSpinner = `
    <div id="spinner">
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
        </div>
    `


    table.innerHTML = addSpinner
    // Replace table content with spinner
}

//this function is used to call the delete buttons functionality
function removeItem(position)
{

    jackets.splice(position,1)
    // Best()
    warren()   
}

//this piece of code calls the table variable and assigns a function to it 
table.addEventListener('click', function(){

    //even.target refers to the actual HTML element on which the event occurs
    //when the event is triggered then the event.target points to the elemeht that triggered the event
    if(event.target.classList.contains('delete')){
        //removing the value which is based on the index
        removeItem(event.target.value)
        // alert(event.target.value)
if(jackets.length===0){
    showSpinner()
}
    }
})


//this function will be used to display the arrays values into the html
function warren(){

    let addButton=
    `
    <!-- This code is responsible for displaying the headers of the table -->


    <button id="adminAdd">A NEW ITEM</button>`
    let headerValues=
    `
    <!-- This code is responsible for displaying the headers of the table -->
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
        </thead>`
      
        


    let products=jackets.map(function(item,index){
        return `
        <table>
        
        <tbody>
        <!-- This code is basically responsible for displaying the values over and over again -->
        
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>R${item.price}</td>
                <td>${item.description}</td>
                <td><img src="${item.url}" width='300' height='300'/></td>
                <td><button id="adminEdit">Edit</button></td>
                <td><button class="delete" value='${index}'>Delete</button></td>
            </tr>

        </tbody>
    </table>
    
   
        `
    })

    table.innerHTML=headerValues+addButton+products.join('')
}
warren()


// ... (Your existing code)

document.getElementById('adminAdd').addEventListener('click', function () {
    // Display the modal using innerHTML, the modal code was retrieved from the boostrap website and just altered
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

    // This piece of code is responsible for showing the modal
    let addItemModal = new bootstrap.Modal(document.querySelector('[data-addItemModal]'));
    addItemModal.show();

    //what this piece of code does is Add an event listener to the form inside the modal to handle new item addition
    document.querySelector('[data-addItemForm]').addEventListener('submit', function (event) {
        event.preventDefault();

        // declare values of the differnet items that the 
        let newItemId = document.querySelector('[data-itemId]').value;
        let newItemName = document.querySelector('[data-itemName]').value;
        let newItemDescription = document.querySelector('[data-itemDescription]').value;
        let newItemPrice = document.querySelector('[data-Price]').value;

        // Create a new item object directly
        let newItem = {
            id: parseInt(newItemId),
            name: newItemName,
            description: newItemDescription,
            price: parseInt(newItemPrice),
            url: 'https://i.postimg.cc/3rZ0H0D8/profile-Image.png',
            quantity:1,
        };

        // Add the new item to the jackets array
        jackets.push(newItem);

        // Save the updated jackets array to local storage
        localStorage.setItem('jackets', JSON.stringify(jackets));

        // Refresh the table to display the new item
        warren();

        // Hide the modal
        addItemModal.hide();
    });
});


// ... (Your existing code)
