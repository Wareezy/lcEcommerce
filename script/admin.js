let jackets=[]

function Constructor(id,name,description,price,url)
{
    this.id=id;
    this.name=name;
    this.description=description;
    this.price=price;
    this.url=url;
}


//creating the objects that will be passed into the constructor function

let item1=new Constructor(1,"NarutoVsSasuke",'Limited Edition Naruto vs Sasuke Jacket',500,'https://i.postimg.cc/tRKBTgzC/Jacket-white-B.png')
let item2=new Constructor(2,"Luffy",'Black and white one piece jacket',700,'https://i.postimg.cc/ydP7NGM7/Jacket2-white-B.png')
let item3=new Constructor(3,"Zoro",'One piece jacket with zoro on the front',600,'https://i.postimg.cc/V6BXkYs5/Jacket3-white-B.png')
let item4=new Constructor(4,"Pirates",'One piece grafitti style jacket with whole team',700,'https://i.postimg.cc/Tw7Y9SCC/Jacket4-white-B.png')
let item5=new Constructor(5,"ZoroBlackAndWhite",'Black and white jacket featuring one piece character zoro',500,'https://i.postimg.cc/85hxkrrW/Jacket5-white-B.png')
let item6=new Constructor(6,"Naruto",'Black and White naruto jacke',800,'https://i.postimg.cc/J0zKwy3R/jacket6-white-B.png')

jackets.push(item1,item2,item3,item4,item5,item6)

localStorage.setItem('jackets',JSON.stringify(jackets))

jackets=JSON.parse(localStorage.getItem('jackets'))

let table=document.querySelector('table')

function remove(position){

    favourite()
    jackets.splice(position,1)

    warren()
}
function warren(){
    let products=jackets.map(function(item,index){



        return `
        <tr>

        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>R${item.price}</td>
        <td>${item.description}</td>
        <td><img src="${item.url}" width='300' height='300'/></td>
        <td><button id="adminAdd">Add</button></td>
        <td><button id="adminEdit">Edit</button></td>
        <td><button class="delete" value='${index}'>Delete</button></td>
        
        
        </tr>
        `
    })

    table.innerHTML=products.join('')
}
warren()

function favourite()
{
localStorage.setItem('items',JSON.stringify(items))
items=JSON.parse(localStorage.getItem('items'))

}
let deleteButton=document.querySelector('.delete')
table.addEventListener('click', function(){

    if(event.target.classList.contains('delete')){
        //removing the value which is based on the index
        remove(event.target.value)
        // alert(event.target.value)

    }
})