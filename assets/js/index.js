// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4LcJYB55sh3dGiCBVEkkZlKV5B4GWPVU",
    authDomain: "trekkandtravel-7daeb.firebaseapp.com",
    databaseURL: "https://trekkandtravel-7daeb-default-rtdb.firebaseio.com",
    projectId: "trekkandtravel-7daeb",
    storageBucket: "trekkandtravel-7daeb.appspot.com",
    messagingSenderId: "313424140423",
    appId: "1:313424140423:web:43dfbbe67b8dfafc564022"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to your formData in the database
const formDataRef = ref(database, 'formData');

// Get the formData entries and update the HTML
onValue(formDataRef, (snapshot) => {
    const formData = snapshot.val();
    const formDataListElement = document.getElementById('formDataList');

    if (formDataListElement) {
        formDataListElement.innerHTML = '';

        for (const key in formData) {
            const listItem = document.createElement('li');
            const entry = formData[key];
            const confirmationNumber = entry ? entry.confirmationnumber : undefined;

            if (confirmationNumber !== undefined) {
                listItem.textContent = confirmationNumber;
                formDataListElement.appendChild(listItem);
            } else {
                console.log(`Confirmation number is undefined for entry with key: ${key}`);
                console.log(`Entry for key ${key}:`, entry);
            }
        }
    }

    const formDataTotal = formData ? Object.keys(formData).length : 0;
    document.getElementById('formdataTotal').textContent = formDataTotal;
});



// Reference to your TransportVoucher data in the database
 
// Reference to your TransportVoucher data in the database
const transportVoucherRef = ref(database, 'TransportVoucher');

// Get the TransportVoucher entries and update the HTML
onValue(transportVoucherRef, (snapshot) => {
    const transportVoucherData = snapshot.val();
    const transportVoucherListElement = document.getElementById('transportVoucherList'); // Adjust the ID as needed

    if (transportVoucherListElement) {
        transportVoucherListElement.innerHTML = '';

        for (const key in transportVoucherData) {
            const listItem = document.createElement('li');
            const entry = transportVoucherData[key];
            const confirmationNumber = entry ? entry.confirmationnumber : undefined;

            if (confirmationNumber !== undefined) {
                listItem.textContent = confirmationNumber;
                transportVoucherListElement.appendChild(listItem);
            } else {
                console.log(`Confirmation number is undefined for entry with key: ${key}`);
                console.log(`Entry for key ${key}:`, entry);
            }
        }
    }

    const transportVoucherTotal = transportVoucherData ? Object.keys(transportVoucherData).length : 0;
    document.getElementById('TransportVoucherTotal').textContent = transportVoucherTotal;
});

//////////////////////////////////////
//////////////////////////////////////
// Replace 'TransportVoucher' with 'itnery' in the database reference
const itneryRef = ref(database, 'itinerary');

// Get the itnery entries and update the HTML
onValue(itneryRef, (snapshot) => {
    const itneryData = snapshot.val();
    const itneryListElement = document.getElementById('itneryList'); // Adjust the ID as needed

    if (itneryListElement) {
        itneryListElement.innerHTML = '';

        for (const key in itneryData) {
            const listItem = document.createElement('li');
            const entry = itneryData[key];
            const confirmationNumber = entry ? entry.confirmationnumber : undefined;

            if (confirmationNumber !== undefined) {
                listItem.textContent = confirmationNumber;
                itneryListElement.appendChild(listItem);
            } else {
                console.log(`Confirmation number is undefined for entry with key: ${key}`);
                console.log(`Entry for key ${key}:`, entry);
            }
        }
    }

    const itneryTotal = itneryData ? Object.keys(itneryData).length : 0;
    document.getElementById('ItneryTotal').textContent = itneryTotal;
});


// Get the TransportVoucher entries and update the HTML
 
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
 //////////////////////////////////////
//////////////////////////////////////

// Add this script in your existing HTML file or link it through a separate script file

// Reference to the View Vouchers button
 








var currentDate = new Date();

// Format the date as needed (e.g., "MM/DD/YYYY")
var formattedDate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

// Set the formatted date as the content of the button
document.getElementById('dateButton').innerText = formattedDate;





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