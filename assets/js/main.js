// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};










/////////////////
////////////////
/////////////////
////////////////



document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'd') {
      window.open('index.html');
  } else if (event.ctrlKey  && event.key === 'h') {
      window.open('Hotel_voucher.html');
  } else if (event.ctrlKey   && event.key === 'm') {
      window.open('transport_voucher.html');
  } else if (event.ctrlKey && event.key === 'i') {
      window.open('Itnery.html');
  } else if (event.ctrlKey && event.key === 'r') {
      window.open('add_resort.html');
  } else if (event.ctrlKey && event.key === 'o') {
      window.open('Contacts.html');
  } else if (event.ctrlKey && event.key === 's') {
      window.open('settings.html');
  }
});
////////
/////////////////
////////////////
/////////////////
////////////////