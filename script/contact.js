
//declaring the button that will be used to send the data to form spree
let sendingButton= document.querySelector("[sendingButton]");

//calling the sending button and adding an event listener to the button that when it is clicked then it has a setTimeout attached to it 
sendingButton.addEventListener("click", function () {

    //the set timeout is set to 1 second and within the setTimeout we calling the clearTheForm function
  setTimeout(clearTheForm, 1);
});

function clearTheForm() {

    //setting all the values to blank this will reset the values
  document.querySelector("[data-sendingMessage]").value = "";
  document.querySelector("[data-sendingFirstName]").value = "";
  document.querySelector("[ data-sendingEmail]").value = "";
  document.querySelector("[data-sendingLastName]").value = "";
  document.querySelector("[data-sendingNumber]").value = "";
}
