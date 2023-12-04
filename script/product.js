let purchasedJackets=[]

let main=document.querySelector('main')

let items=JSON.parse(localStorage.getItem('jackets'))
main.innerHTML=items.map(function(item,index){


    return `
   



  <table class="tableProd">
  <tr>
      <td><img src="${item.url}" width='300' height='300'/></td>
      
      </tr>

      <tr>
      <td><h2>${item.name}</h2></td>
      </tr>


      <tr>   
      <td><p>${item.description}</p></td>
      </tr>

   

<tr>
     <td> <p>${item.price}</p></td>
     </tr>

     <tr>
     <td><button id="buttonProd" value='${index}' data-add>Add to cart</button></td> 
     
     </tr>
     
      </table>
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