// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";


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

// ... (previous code)
document.addEventListener('DOMContentLoaded', () => {
    // Reference to the 'formData' node
    const formDataRef = ref(database, 'formData');
  
    // Reference to the dropdown element, search input, and display div
    const voucherDropdown = document.getElementById('hotel-voucher-dropdown');
    const confirmationNumberInput = document.getElementById('confirmation-number');
    const displayFetchAll = document.getElementById('display_fetchall');
  
    // Listen for changes in the data
    onValue(formDataRef, (snapshot) => {
      const data = snapshot.val();
  
      // Check if data is not null
      if (data) {
        // Extract confirmation numbers
        const confirmationNumbers = Object.keys(data).map((key) => data[key].confirmationnumber);
  
        // Handle input event to filter dropdown options
        confirmationNumberInput.addEventListener('input', () => {
          const searchTerm = confirmationNumberInput.value.trim().toLowerCase();
  
          // Hide the dropdown if the search term is empty or '0'
          if (!searchTerm || searchTerm === '0') {
            voucherDropdown.classList.add('hidden');
            return;
          }
  
          // Filter confirmation numbers based on search term
          const filteredConfirmationNumbers = confirmationNumbers.filter((number) =>
            number.toLowerCase().startsWith(searchTerm)
          );
  
          // Remove existing options
          voucherDropdown.innerHTML = '';
  
          // Add filtered options to the dropdown
          filteredConfirmationNumbers.forEach((confirmationNumber) => {
            const option = document.createElement('div');
            option.textContent = confirmationNumber;
            option.classList.add('dropdown-item'); // You may want to add a class for styling
            option.addEventListener('click', () => {
              // Auto-fill the confirmation-number field with the selected option
              confirmationNumberInput.value = confirmationNumber;
  
              // Hide the dropdown after selection
              voucherDropdown.classList.add('hidden');
            });
            voucherDropdown.appendChild(option);
          });
  
          // Show the dropdown
          voucherDropdown.classList.remove('hidden');
        });
 
  
            // Add an event listener to handle item selection
           // ... (previous code)

// Add an event listener to handle item selection
// Add an event listener to handle item selection
voucherDropdown.addEventListener('click', async (event) => {
    // Check if the clicked element is a dropdown item
    if (event.target.classList.contains('dropdown-item')) {
        // Set the selected confirmation number to the input field
        confirmationNumberInput.value = event.target.textContent;

        // Fetch data based on the selected confirmation number
        const selectedConfirmationNumber = confirmationNumberInput.value;
        const selectedData = data[Object.keys(data).find(key => data[key].confirmationnumber === selectedConfirmationNumber)];
        

// Map terms and conditions and display them
displayFetchAll.innerHTML = `
    

 

<!-- ... (other HTML code) -->

<label for="noOfAdults" class="block mb-4">No of Adults:</label>
<input type="text" id="noOfAdults" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="No of Adults" value="${selectedData.NoofAdult}">

<label for="arrival" class="block mb-4">Arrival:</label>
<input type="text" id="arrival" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Arrival" value="${selectedData.arrival}">

<label for="bookedBy" class="block mb-4">Booked By:</label>
<input type="text" id="bookedBy" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Booked By" value="${selectedData.bookedBy}">

<label for="contactNo" class="block mb-4">Contact No:</label>
<input type="text" id="contactNo" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Contact No" value="${selectedData.contactNo}">

<label for="departure" class="block mb-4">Departure:</label>
<input type="text" id="departure" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Departure" value="${selectedData.departure}">

<label for="googleMapLink" class="block mb-4">Google Map Link:</label>
<input type="text" id="googleMapLink" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Google Map Link" value="${selectedData.googleMapLink}">

<label for="guestCitizen" class="block mb-4">Guest Citizen:</label>
<input type="text" id="guestCitizen" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Guest Citizen" value="${selectedData.guestCitizen}">

<label for="guestName" class="block mb-4">Guest Name:</label>
<input type="text" id="guestName" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Guest Name" value="${selectedData.guestName}">

<!-- Repeat this pattern for other input fields -->
 
<!-- ... (previous HTML code) -->

<label for="hotelNumber" class="block mb-4">Hotel Number:</label>
<input type="text" id="hotelNumber" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Hotel Number" value="${selectedData.hotelNumber}">

<label for="issuedBy" class="block mb-4">Issued By:</label>
<input type="text" id="issuedBy" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Issued By" value="${selectedData.issuedBy}">

<label for="issuedDate" class="block mb-4">Issued Date:</label>
<input type="text" id="issuedDate" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Issued Date" value="${selectedData.issuedDate}">

<label for="mailId" class="block mb-4">Mail ID:</label>
<input type="text" id="mailId" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Mail ID" value="${selectedData.mailId}">

<textarea id="notes" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Notes">${selectedData.notes}</textarea>
<textarea id="specialRequest" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Special Request">${selectedData.specialRequest}</textarea>
<textarea id="paymentInfo" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Payment Information">${selectedData.paymentInfo}</textarea>

<label for="checkInDate" class="block mb-4">Check-In Date:</label>
<input type="text" id="checkInDate" class="w-full p-2 border rounded border-slate-700 mb-4" placeholder="Check-In Date" value="${selectedData.checkInDate}">

<!-- (Repeat this for other input elements) -->

<div class="mb-4">
    <label for="termsConditions" class="block">Terms & Conditions:</label>
    ${selectedData.termsConditions.map((term, index) => `
        <input type="text" id="term${index + 1}" class="w-full p-2 border rounded border-slate-700 mb-2" placeholder="Term ${index + 1}" value="${term}">
    `).join('')}
</div>

<div class="mb-4">
    <label for="cancellationPolicy" class="block">Cancellation Policy:</label>
    ${selectedData.cancellationPolicy.map((term, index) => `
        <input type="text" id="policy${index + 1}" class="w-full p-2 border rounded border-slate-700 mb-2" placeholder="Policy ${index + 1}" value="${term}">
    `).join('')}
</div>

<div class="mb-4">
    <label for="roomDetails" class="block">Room Details:</label>
    ${selectedData.roomDetails.map((room, roomIndex) => `
        <li>
            <ul>
                ${Object.entries(room).map(([key, value]) => `
                    <input type="text" id="${key}" class="w-full p-2 border rounded border-slate-700 mb-2" placeholder="${key}" value="${value}">
                `).join('')}
            </ul>
        </li>
    `).join('')}
</div>

<!-- ... (remaining HTML code) -->





 
            <!-- Add other data fields as needed -->
        `;
        
        // Hide the dropdown
        voucherDropdown.classList.add('hidden');
        
    }
    
});
 

function openPrintPage() {
    // Extract form values
    var confirmationnumber = document.getElementById('confirmation-number').value;
    

    // ... (other form values)

    // Open the print window
    const printWindow = window.open('', '_blank');

    // Write the printable content
    printWindow.document.write(`
        <!-- Your HTML content for the printed page -->
        <html>
            <!-- ... (your HTML content) ... -->

            ${confirmationnumber}


        </html>
    `);

    // Close the document stream
    printWindow.document.close();

    // Print the page
    printWindow.print();
}

// Add an event listener to the Print button
document.getElementById('printButton').addEventListener('click', function () {
    openPrintPage();
});

// Function to map termsConditions
 

// ... (remaining code)

        }
    });
});


//////////////////////////////////////
//////////////////////////////////////
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
 