let purchasedJackets=[]

let main=document.querySelector('main')

let items=JSON.parse(localStorage.getItem('jackets'))
main.innerHTML=items.map(function(item,index){


    return `
    <div>
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    <p>${item.price}</p>
    <p><img src="${item.url}"    width='300' height='300'/></p>
    <button value='${index}' data-add>Add to cart</button>
    </div>
    `
}).join('')


function add(index){
    purchasedJackets.push(items[index])
    localStorage.setItem('purchasedJackets',JSON.stringify(purchasedJackets))
}

main.addEventListener('click', function(){

    if(event.target.hasAttribute('data-add'))
    {
        add(event.target.value)
    }
})