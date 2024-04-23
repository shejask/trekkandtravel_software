// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import  { getDatabase, ref, push, onValue, child ,get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
 



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
initializeApp(firebaseConfig);
const database = getDatabase();
const vouchersRef = ref(database, 'vouchers');
const guestsRef = ref(database, 'guests'); // Add a reference to the 'guests' node
 

 
 

 

// Function to populate hotel names in the dropdown
function populateHotelNames() {
    const hotelDropdown = document.getElementById('hotel-name');

    onValue(vouchersRef, (snapshot) => {
        hotelDropdown.innerHTML = '<option value="" selected disabled>Select Hotel</option>';

        snapshot.forEach((childSnapshot) => {
            const hotelName = childSnapshot.val().hotelName;
            const option = document.createElement('option');
            option.value = hotelName;
            option.textContent = hotelName;
            hotelDropdown.appendChild(option);
        });
    });
}

// Function to populate guest names in the dropdown
function populateGuestNames() {
    const guestDropdown = document.getElementById('guest-name');

    onValue(guestsRef, (snapshot) => {
        guestDropdown.innerHTML = '<option value="" selected disabled>Select Guest</option>';

        snapshot.forEach((childSnapshot) => {
            const guestName = childSnapshot.val().guestName;
            const option = document.createElement('option');
            option.value = guestName;
            option.textContent = guestName;
            guestDropdown.appendChild(option);
        });
    });
}

// Function to populate other input fields based on selected hotel name
function populateHotelDropdown(searchTerm) {
    const dropdownContainer = document.getElementById("hotel-name-dropdown");
    dropdownContainer.innerHTML = ""; // Clear previous data


    document.getElementById('hotel-address').removeAttribute('readonly');
document.getElementById('google-map-link').removeAttribute('readonly');
document.getElementById('hotel-phone').removeAttribute('readonly');

const fileInput = document.getElementById("hotel-photo");
   






    onValue(vouchersRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const voucher = childSnapshot.val();
            const hotelName = voucher.hotelName;

            // Check if the hotel name matches the search term
            if (hotelName.toLowerCase().includes(searchTerm.toLowerCase())) {
                const option = document.createElement("div");
                option.textContent = hotelName;
                option.className = "p-2 cursor-pointer hover:bg-gray-200";
                option.addEventListener("click", () => {
                    document.getElementById("hotel-name").value = hotelName;
                    dropdownContainer.classList.add("hidden");
                    document.getElementById('hotel-address').value = voucher.hotelAddress;
                    document.getElementById('google-map-link').value = voucher.googleMapLink;
                    document.getElementById('hotel-phone').value = voucher.hotelPhone;


                     // Enable input fields
                     document.getElementById('hotel-address').removeAttribute('readonly');
                     document.getElementById('google-map-link').removeAttribute('readonly');
                     document.getElementById('hotel-phone').removeAttribute('readonly');
 
                     // Auto-fill terms and conditions
                     updateTermsAndConditions(voucher.termsAndCondition);
                     updateCancellationPolicy(voucher.cancellationPolicy);

 
                    // Fetch and display the image
                    const hotelPhotoPreview = document.getElementById('hotel-photo-preview');
                    if (voucher.hotelPhoto) {
                        hotelPhotoPreview.src = voucher.hotelPhoto;

                        fileInput.style.display = 'none';


                    } else {
                        // If hotelPhoto is not defined, reset the image source
                        hotelPhotoPreview.src = '';

                        fileInput.style.display = 'block';
                    }

                    // Enable input fields
                    document.getElementById('hotel-address').removeAttribute('readonly');
                    document.getElementById('google-map-link').removeAttribute('readonly');
                    document.getElementById('hotel-phone').removeAttribute('readonly');
                });

                dropdownContainer.appendChild(option);
            }
        });
    });

    // Handle the case when no hotel name is selected
    dropdownContainer.addEventListener("mouseleave", () => {
        const selectedHotelName = document.getElementById("hotel-name").value;

        if (!selectedHotelName) {
            document.getElementById('hotel-address').value = '';
            document.getElementById('google-map-link').value = '';
            document.getElementById('hotel-phone').value = '';


            

            // Reset the image source
            document.getElementById('hotel-photo-preview').src = '';
            fileInput.style.display = 'block';
            // Disable input fields
            document.getElementById('hotel-address').setAttribute('readonly', 'readonly');
            document.getElementById('google-map-link').setAttribute('readonly', 'readonly');
            document.getElementById('hotel-phone').setAttribute('readonly', 'readonly');


             // Clear terms and conditions
             updateTermsAndConditions([]);
             updateCancellationPolicy([]);
        }

    });
}

// ... (Your existing code)

// Function to update terms and conditions
// ... (Your existing code)

// Function to update terms and conditions
function updateTermsAndConditions(termsAndConditions) {
  const termsContainer = document.getElementById('terms-container');

  // Clear existing terms and conditions
  termsContainer.innerHTML = '';

  // Add input fields based on the fetched terms and conditions
  termsAndConditions.forEach((term, index) => {
      const inputField = createInputField(term);
      termsContainer.appendChild(inputField);
  });

  // Add a button to add more terms and conditions
  const addButton = document.createElement('button');
  addButton.type = 'button';
  // addButton.id = 'add-terms-button';
  // addButton.classList.add('bg-green-500', 'text-white', 'py-2', 'px-4', 'rounded', 'hover:bg-green-600');
  // addButton.textContent = 'Add';
  addButton.addEventListener('click', () => {
      const newInputField = createInputField('');
      termsContainer.appendChild(newInputField);
  });
  termsContainer.appendChild(addButton);

  // ... (Your existing code)

  // Function to create an input field for terms and conditions
  function createInputField(value) {
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.placeholder = 'Enter terms & condition';
      inputField.value = value;
      inputField.classList.add('w-full', 'p-2', 'border', 'rounded', 'border-slate-700', 'mb-2', 'terms-condition-input');
      return inputField;
  }
}
/////////////////////////////////////////////
function updateCancellationPolicy(cancellationPolicy) {
  const cancellationPolicyContainer = document.getElementById('cancellation-policy-container');

  // Clear existing cancellation policies
  cancellationPolicyContainer.innerHTML = '';

  // Add input fields based on the fetched cancellation policies
  cancellationPolicy.forEach((policy, index) => {
      const inputField = createInputField(policy);
      cancellationPolicyContainer.appendChild(inputField);
  });

  // Add a button to add more cancellation policies
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.id = 'add-cancellation-button';
  // addButton.classList.add('bg-green-500', 'text-white', 'py-2', 'px-4', 'rounded', 'hover:bg-green-600');
  // addButton.textContent = 'Add';
  addButton.addEventListener('click', () => {
      const newInputField = createInputField('');
      cancellationPolicyContainer.appendChild(newInputField);
  });
  cancellationPolicyContainer.appendChild(addButton);

  // Function to create an input field for cancellation policies
  function createInputField(value) {
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.placeholder = 'Enter cancellation policy';
      inputField.value = value;
      inputField.classList.add('w-full', 'p-2', 'border', 'rounded', 'border-slate-700', 'mb-2', 'cancellation-policy-input');
      return inputField;
  }
}


////////////////////////////////////
 





// Event listener for input field
const hotelNameInput = document.getElementById("hotel-name");
hotelNameInput.addEventListener("input", function () {
    const searchTerm = this.value;
    populateHotelDropdown(searchTerm);

    // Show/hide the dropdown based on user input
    const dropdownContainer = document.getElementById("hotel-name-dropdown");
    dropdownContainer.classList.toggle("hidden", searchTerm === "");
});

// Event listener for guest name input field
const guestNameInput = document.getElementById("guest-name");
guestNameInput.addEventListener("input", function () {
    const searchTerm = this.value;
    populateGuestDropdown(searchTerm);

    // Show/hide the dropdown based on user input
    const dropdownContainer = document.getElementById("guest-name-dropdown");
    dropdownContainer.classList.toggle("hidden", searchTerm === "");
});

 

// Function to populate guest names in the dropdown based on search term
function populateGuestDropdown(searchTerm) {
    const dropdownContainer = document.getElementById("guest-name-dropdown");
    dropdownContainer.innerHTML = ""; // Clear previous data

    onValue(guestsRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const guestKey = childSnapshot.key;
            const guest = childSnapshot.val();

            // Adjust this part based on your data structure
            const guestName = guest.guestName; // Update to the actual property name
            const guestNumber = guest.contactNumber; // Update to the actual property name
            const guestCitizen = guest.citizen;



             


            // Check if the guest name matches the search term
            if (guestName.toLowerCase().includes(searchTerm.toLowerCase())) {
                const option = document.createElement("div");
                option.textContent = guestName;
                option.className = "p-2 cursor-pointer hover:bg-gray-200";
                option.addEventListener("click", () => {
                    document.getElementById("guest-name").value = guestName;
                    dropdownContainer.classList.add("hidden");

                    // Set guest number based on selected guest name
                    document.getElementById("guest-number").value = guestNumber;


                    document.getElementById("guest-citizen").value = guestCitizen;
                });

                dropdownContainer.appendChild(option);
            }
        });
    });

    // Handle the case when no guest name is selected
    dropdownContainer.addEventListener("mouseleave", () => {
        const selectedGuestName = document.getElementById("guest-name").value;

        if (!selectedGuestName) {
            // Reset the guest number
            document.getElementById("guest-number").value = '';
            document.getElementById("guest-citizen").value = '';
        }
    });
}

 
// Call the functions to populate hotel and guest names
populateHotelNames();
populateGuestNames();








 









document.getElementById("add-room-button").addEventListener("click", function () {
  // Clone the room details div
  const roomDetailsContainer = document.getElementById("room-details-container");
  const clonedRoomDetails = roomDetailsContainer.querySelector(".room-details").cloneNode(true);

  // Clear input values in the cloned div
  clonedRoomDetails.querySelectorAll('input').forEach(input => input.value = '');

  // Append the cloned div to the container
  roomDetailsContainer.appendChild(clonedRoomDetails);
});

// Modify the openPrintPage function to include room details






function handleFormSubmission() {
 
    // Additional fields
    const cancellationPolicy = [];
    document.querySelectorAll('.cancellation-policy-input').forEach(input => {
        cancellationPolicy.push(input.value);
    });

 
    // Add your logic to submit the cancellation policy data to Firebase or perform other actions
    console.log("Cancellation Policy:", cancellationPolicy);

    // Open the print page
    openPrintPage();
}

// ... (Existing code)


// Function to open the print page
  function openPrintPage() {
  // Extract form values
  var confirmationnumber = document.getElementById('confirmation-number').value;

  var hotelName = document.getElementById('hotel-name').value;
  var hotelAddress = document.getElementById('hotel-address').value;
  var googleMapLink = document.getElementById('google-map-link').value;
  var hotelPhone = document.getElementById('hotel-phone').value;
  var hotellPhoto = document.getElementById('hotel-photo-preview').src;
  
   

  
  var hotelPhotoInput = document.getElementById('hotel-photo');
  // var hotelphoto = hotelPhotoInput.files[0]; // Get the selecte
   
  var guestName = document.getElementById('guest-name').value;
  var guestNumber = document.getElementById('guest-number').value;
  var guestCitizen = document.getElementById('guest-citizen').value;

  var NoofAdult = document.getElementById('No-of-Adults').value;


  var issuedBy = document.getElementById('issued-by').value;
  var issuedDate = document.getElementById('issued-date').value;
  var bookedBy = document.getElementById('booked-by').value;
  var contactNo = document.getElementById('contact-no').value;
  var mailId = document.getElementById('mail-id').value;

  var checkInDate = document.getElementById('check-in-date').value;
  var checkInTime = document.getElementById('check-in-time').value;
  var checkOutDate = document.getElementById('check-out-date').value;
  var checkOutTime = document.getElementById('check-out-time').value;

  var notes = document.getElementById('notes').value;
  var specialRequest = document.getElementById('special-request').value;
  var paymentInfo = document.getElementById('payment-info').value;
  var arrival = document.getElementById('arrival').value;
  var ticketNo = document.getElementById('ticket-no').value;
  var departure = document.getElementById('departure').value;
  var ticketNotwo = document.getElementById('ticket-no-two').value;

 
  const roomDetails = [];
  document.querySelectorAll('.room-details').forEach(room => {
      const roomType = room.querySelector('#room-type').value;
      const noOfRooms = room.querySelector('#no-of-rooms').value;
      const noOfExtraBed = room.querySelector('#no-of-extra-bed').value;
      const childWithoutBed = room.querySelector('#child-without-bed').value;
      const mealPlan = room.querySelector('#meal-plan').value;

      roomDetails.push({ roomType, noOfRooms, noOfExtraBed, childWithoutBed, mealPlan });
  });
  





  var termsInputs = document.querySelectorAll('.terms-condition-input');
  var termsConditions = Array.from(termsInputs).map(input => input.value);


  // Extract "Cancellation Policy" values
  var cancellationInputs = document.querySelectorAll('.cancellation-policy-input');
  var cancellationPolicy = Array.from(cancellationInputs).map(input => input.value);



  

// Get the selected image file
var hotelPhotoInput = document.getElementById('photo');
var selectedPhoto = hotelPhotoInput.files[0];
var photoURL = selectedPhoto ? URL.createObjectURL(selectedPhoto) : ''; // Get a temporary URL for the selected photo

// ... (other form values)

// Open the print window

    // Open the print window
  const printWindow = window.open('', '_blank');

  // Write the printable content
  printWindow.document.write(`
 
   
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
  <style>
      .body{
          font-family: 'Manrope', sans-serif;
font-family: 'Poppins', sans-serif;
      }
  </style>
  <title>Document</title>
</head>
 

  <body>
  <script>
    const num = [1, 2];
  </script>
  <div class="w-full h-auto">
    <div
      class="w-full bg-blue-500 h-24 flex items-center justify-between pl-5 bg-cover"
      style="background-image: url(/assets/imgs/Rectangle1.png)"
    >
      <div class="flex flex-col text-white">
        <h1 class="font-bold text-xl">Hotel Voucher</h1>
        <h1 class="text-sm font-light">
          confirmation No: <span>${confirmationnumber}</span>
        </h1>
      </div>
      <div
        class="w-auto bg-white h-12 px-2 py-3 rounded-l-full flex items-center justify-center gap-2"
      >
        <div class="flex flex-col items-end">
        <img src="/assets/imgs/TREKK & TRAVEL LOGO.png" alt="" width="200" />
        </div>
      </div>
    </div>
    <div class="mt-5 w-full h-auto px-5">
      <div class="flex w-full h-40 bg-black">
        <div class="w-1/2 h-full bg-gray-300">
          <img
            class="w-full h-full object-cover"
            src="${photoURL ? photoURL : hotellPhoto}"
            alt=""
          />
        </div>
        <div
          class="w-full h-full bg-yellow-500 flex flex-col items-start justify-center gap-5 text-black px-5 py-3"
        >
          <h1 class="font-semibold text-xl">${hotelName}</h1>

          <div class="flex flex-col">
            <div class="flex gap-1 items-center">
              <h1>Address :</h1>
              <h1>${hotelAddress}</h1>
            </div>
            <div class="flex gap-1 items-center">
            <h1>Google map :</h1>
            <h1>${googleMapLink}</h1>
            <a href="${googleMapLink}" target="_blank">  

         </div>
        
        
        
            <div class="flex gap-1 items-center">
              <h1>Phone no :</h1>
              <h1>${hotelPhone}</h1>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    <div class="mt-8">
      <div class="w-full h-auto flex justify-center">
        <div
          class="w-2/3 h-auto py-2 rounded-2xl border-2 border-black flex items-center justify-between px-3"
        >
          <div class="flex flex-col justify-center items-center">
            <h1 class="font-semibold text-xl">Check in</h1>
            <h1>${checkInDate}</h1>
            <h1>${checkInTime}</h1>
          </div>
          <hr class="border-2 border-blue-400 w-1/4" />
          <div class="flex flex-col justify-center items-center">
            <h1 class="font-semibold text-xl">Check out</h1>
            <h1>${checkOutDate}</h1>
            <h1>${checkOutTime}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 px-10">
      <div class="w-full h-auto flex justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-lg font-semibold">Guest Details</h1>
          <div class="flex flex-col">
            <div class="flex gap-1">
              <h1>Booking name :</h1>
              <h1>${guestName}</h1>
            </div>
            <div class="flex gap-1">
              <h1>Contact no :</h1>
              <h1>${guestNumber}</h1>
            </div>
            <div class="flex gap-1">
              <h1>Citizen no :</h1>
              <h1>${guestCitizen}</h1>
            </div>
            <div class="flex gap-1">
              <h1>No of Adults :</h1>
              <h1>${NoofAdult}</h1>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Issued by :</h1>
            <h1>${issuedBy}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Issued date :</h1>
            <h1>${issuedDate}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Booked by :</h1>
            <h1>${bookedBy}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Contanct no :</h1>
            <h1>${contactNo}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Mail id :</h1>
            <h1>${mailId}</h1>
          </div>
        </div>
        
      </div>
      <hr class="border border-gray-400 mt-3" />
            </div>
    <div class="mt-3 px-10">
      <div class="w-full flex justify-between gap-5 flex-wrap h-auto">
        <!-- map from here to 👇 -->

        ${roomDetails.map(room => `
        <div class="flex flex-shrink-0 flex-col gap-2">
          <div class="flex gap-1">
            <h1 class="text-lg font-semibold">Room type :</h1>
            <h1 class="text-lg font-semibold">${room.roomType}</h1>
          </div>
          <div class="flex flex-col">
            <div class="flex gap-1">
              <h1>No of Rooms :</h1>
              <h1>${room.noOfRooms}</h1>
            </div>
            <div class="flex gap-1">
              <h1>No of Extra Bed :</h1>
              <h1>${room.noOfExtraBed}</h1>
            </div>
            <div class="flex gap-1">
              <h1>Child without bed :</h1>
              <h1> ${room.childWithoutBed}</h1>
            </div>
            <div class="flex gap-1">
              <h1>Meal plan :</h1>
              <h1>${room.mealPlan}</h1>
            </div>
          </div>
        </div>
        `).join('')}
        <!-- to here -->
        </div>
      </div>
      <hr class="border border-gray-400 mt-1" />
    </div>
    <div class="mt-5 px-10">
      <div class="w-full flex justify-between h-auto gap-10">
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-semibold">Notes:</h1>
          <h1>
          ${notes}
          </h1>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-semibold">Special Request:</h1>
          <h1>
          ${specialRequest}
          </h1>
        </div>
      </div>
      <hr class="border border-gray-400 mt-3" />
    </div>
    <div class="mt-5 px-10">
      <div class="flex flex-col gap-1">
        <h1 class="text-lg font-semibold">Payment Information</h1>
        <h1>
        ${paymentInfo}
        </h1>
      </div>
      <hr class="border border-gray-400 mt-3" />
    </div>
    <div class="mt-3 px-10">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <h1 class="text-lg font-semibold">Arrival:</h1>
          <h1><span class="underline mr-2">${arrival}</span>${ticketNo}</h1>
        </div>
        <div class="flex gap-2">
          <h1 class="text-lg font-semibold">Departure:</h1>
          <h1><span class="underline  mr-2" >${departure}</span>${ticketNotwo}</h1>
        </div>
      </div>
      <hr class="border border-gray-400 mt-3" />
            </div>
    <div class="mt-3 px-10">
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-semibold">Term & conditions</h1>
          <div class="px-5">
            <ul class="list-disc text-sm">
            ${termsConditions.map(term => `<li>${term}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-semibold">Cancellation Policy</h1>
          <div class="px-5">
            <ul class="list-disc text-sm">
            ${cancellationPolicy.map(policy => `<li>${policy}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 w-full h-12 bg-blue-500 px-5 flex items-center">
      <div class="flex flex-col text-white text-xs">
        <div class="flex gap-1 items-center">
          <img src="" alt="" />
          <h1>yourname @gmail.com,www.trekkandtravel.com</h1>
        </div>
        <div class="flex gap-1 items-center">
          <img src="" alt="" />
          <h1>Street address here, city name zipcode</h1>
        </div>
      </div>
    </div>
  </div>
</body>


   


 
          

  `);


  

  // Close the document stream
  printWindow.document.close();

  // Print the page
  setTimeout(() => {
    printWindow.print();
}, 500);
}
 

// Add event listener for the "Create Bill" button
document.getElementById("create-bill-button").addEventListener("click", function () {
    handleFormSubmission();
});






document.getElementById("add-terms-button").addEventListener("click", function () {
    const termsContainer = document.getElementById("terms-container");

    // Create a new input field
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter terms & condition";
    input.className = "w-full p-2 border rounded border border-slate-700 mb-2 terms-condition-input";

    // Append the new input field to the container
    termsContainer.appendChild(input);
});


 

// ... (your existing code) ...

// Event listener for the "Add Cancellation Policy" button
document.getElementById("add-cancellation-button").addEventListener("click", function () {
    const cancellationContainer = document.getElementById("cancellation-policy-container");

    // Create a new input field
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter cancellation policy";
    input.className = "w-full p-2 border rounded border border-slate-700 mb-2 cancellation-policy-input";

    // Append the new input field to the container
    cancellationContainer.appendChild(input);
});

 



 
 
// function toggleInputFields() {
//     const inputContainer = document.getElementById('inputContainer');
//     inputContainer.style.display = inputContainer.style.display === 'none' ? 'block' : 'none';
// }

// // Attach the toggle function to the button click event
// document.getElementById('showButton').addEventListener('click', toggleInputFields);
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

 // Assume you have initialized your Firebase app
// const firebaseConfig = { ... };
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

// Event listener for the "Print" button
document.getElementById("save-button").addEventListener("click", function () {
  // Save the form data to the database
  saveFormDataToDatabase();

  // Handle the rest of your logic (e.g., opening the print page)
  
});


// Add an event listener to fetch data when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchConfirmationNumbers();
});

// Function to fetch confirmation numbers from the database
// Function to fetch confirmation numbers from the database
// Function to fetch all confirmation numbers from the database
// Function to fetch all confirmation numbers from the database
// Function to fetch all confirmation numbers from the database
function fetchConfirmationNumbers() {
  const formDataRef = ref(database, 'formData');

  // Get a snapshot of the formData node
  get(formDataRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Extract confirmation numbers from the child nodes
      const confirmationNumbers = Object.keys(snapshot.val());

      // Update the dropdown with confirmation numbers
      updateConfirmationDropdown(confirmationNumbers);
    } else {
      console.log('No data found in the formData node.');
    }
  }).catch((error) => {
    console.error('Error fetching confirmation numbers:', error);
  });
}

// Function to update the dropdown with confirmation numbers
function updateConfirmationDropdown(confirmationNumbers) {
  const dropdown = document.getElementById('hotel-voucher-dropdown');
  dropdown.innerHTML = ''; // Clear the dropdown

  // Populate the dropdown with confirmation numbers
  confirmationNumbers.forEach((confirmationNumber) => {
    const option = document.createElement('div');
    option.classList.add('dropdown-item');
    option.textContent = confirmationNumber;
    option.addEventListener('click', () => selectConfirmationNumber(confirmationNumber));
    dropdown.appendChild(option);
  });
}

// Function to handle the selection of a confirmation number
function selectConfirmationNumber(confirmationNumber) {
  document.getElementById('confirmation-number').value = confirmationNumber;

  // Fetch and populate other form fields based on the selected confirmation number
  fetchAndPopulateFormData(confirmationNumber);

  // Hide the dropdown
  hideConfirmationDropdown();
}

// Function to fetch and populate form data based on the selected confirmation number
function fetchAndPopulateFormData(confirmationNumber) {
  const formDataRef = ref(database, 'formData/' + confirmationNumber);

  get(formDataRef).then((snapshot) => {
    if (snapshot.exists()) {
      const formData = snapshot.val();
      populateFormFields(formData);
    } else {
      console.log('Form data not found for the selected confirmation number.');
      clearFormFields();
    }
  }).catch((error) => {
    console.error('Error fetching form data:', error);
  });
}

// Function to hide the confirmation dropdown
function hideConfirmationDropdown() {
  const dropdown = document.getElementById('hotel-voucher-dropdown');
  // dropdown.classList.add('hidden');
}

// Function to populate form fields with the fetched data
// Function to populate form fields with the fetched data
function populateFormFields(formData) {

  console.log(formData);

  // Update your form fields based on the formData object
  document.getElementById('confirmation-number').value = formData.confirmationnumber;
  document.getElementById('hotel-name').value = formData.hotelName;
  document.getElementById('hotel-address').value = formData.hotelAddress;
  document.getElementById('google-map-link').value = formData.googleMapLink;
  document.getElementById('hotel-phone').value = formData.hotelPhone;
  document.getElementById('guest-name').value = formData.guestName;
  document.getElementById('guest-number').value = formData.guestNumber;
  document.getElementById('guest-citizen').value = formData.guestCitizen;
  document.getElementById('No-of-Adults').value = formData.NoofAdult;
  document.getElementById('issued-by').value = formData.issuedBy;
  document.getElementById('issued-date').value = formData.issuedDate;
  document.getElementById('booked-by').value = formData.bookedBy;
  document.getElementById('contact-no').value = formData.contactNo;
  document.getElementById('mail-id').value = formData.mailId;
  document.getElementById('check-in-date').value = formData.checkInDate;
  document.getElementById('check-in-time').value = formData.checkInTime;
  document.getElementById('check-out-date').value = formData.checkOutDate;
  document.getElementById('check-out-time').value = formData.checkOutTime;
  document.getElementById('notes').value = formData.notes;
  document.getElementById('special-request').value = formData.specialRequest;
  document.getElementById('payment-info').value = formData.paymentInfo;
  document.getElementById('arrival').value = formData.arrival;
  document.getElementById('ticket-no').value = formData.ticketNo;
  document.getElementById('departure').value = formData.departure;
  document.getElementById('ticket-no-two').value = formData.ticketNotwo;

  // Populate room details
  formData.roomDetails.forEach((room, index) => {
    document.getElementById(`room-type-${index}`).value = room.roomType;
    document.getElementById(`no-of-rooms-${index}`).value = room.noOfRooms;
    document.getElementById(`no-of-extra-bed-${index}`).value = room.noOfExtraBed;
    document.getElementById(`child-without-bed-${index}`).value = room.childWithoutBed;
    document.getElementById(`meal-plan-${index}`).value = room.mealPlan;
  });

  // Populate terms and conditions
  const termsContainer = document.getElementById('terms-container');
  termsContainer.innerHTML = '';
  formData.termsConditions.forEach(term => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter terms & condition';
    input.className = 'w-full p-2 border rounded border-slate-700 mb-2 terms-condition-input';
    input.value = term;
    termsContainer.appendChild(input);
  });

  // Populate cancellation policy
  const cancellationContainer = document.getElementById('cancellation-policy-container');
  cancellationContainer.innerHTML = '';
  formData.cancellationPolicy.forEach(policy => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter cancellation policy';
    input.className = 'w-full p-2 border rounded border-slate-700 mb-2 cancellation-policy-input';
    input.value = policy;
    cancellationContainer.appendChild(input);
  });
}

// Function to clear form fields
function clearFormFields() {
  // Clear all form fields
  // For example:
  document.getElementById('hotel-name').value = '';
  document.getElementById('hotel-address').value = '';
  // ... (clear other fields)
}

// Add event listener for the "confirmation-number" input
document.getElementById('confirmation-number').addEventListener('input', function () {
  const confirmationNumberInput = document.getElementById('confirmation-number');
  const dropdown = document.getElementById('hotel-voucher-dropdown');

  // If the input is not empty, show the dropdown and fetch confirmation numbers
  if (confirmationNumberInput.value.trim() !== '') {
    dropdown.classList.remove('hidden');
    fetchConfirmationNumbers();
  } else {
    // If the input is empty, hide the dropdown
    dropdown.classList.add('hidden');
  }
});

// ... (rest of your code)

// Call fetchConfirmationNumbers at the appropriate place to initialize the dropdown
fetchConfirmationNumbers();


// Function to fetch and populate form data based on the selected confirmation number
// Function to fetch all confirmation numbers from the database 
























// The function to save data to Firebase
async function saveFormDataToDatabase() {

 // Create a reference to the database node where you want to store the data
 var formDataRef = ref(database, 'formData');

 push(formDataRef, {
  
  // ... (other form data)
}).then(function () {
  alert('Successfully saved');
  console.log('Data saved successfully!');
}).catch(function (error) {
  console.error('Error saving data:', error);
});




  var confirmationnumber = document.getElementById('confirmation-number').value;
  var hotelName = document.getElementById('hotel-name').value;
  var hotelAddress = document.getElementById('hotel-address').value;
  var googleMapLink = document.getElementById('google-map-link').value;
  var hotelPhone = document.getElementById('hotel-phone').value;
  var hotellPhoto = document.getElementById('hotel-photo-preview').src;
  
  var hotelPhotoInput = document.getElementById('hotel-photo');
  // var hotelphoto = hotelPhotoInput.files[0]; // Get the selected file
   
  var guestName = document.getElementById('guest-name').value;
  var guestNumber = document.getElementById('guest-number').value;
  var guestCitizen = document.getElementById('guest-citizen').value;

  var NoofAdult = document.getElementById('No-of-Adults').value;

  var issuedBy = document.getElementById('issued-by').value;
  var issuedDate = document.getElementById('issued-date').value;
  var bookedBy = document.getElementById('booked-by').value;
  var contactNo = document.getElementById('contact-no').value;
  var mailId = document.getElementById('mail-id').value;

  var checkInDate = document.getElementById('check-in-date').value;
  var checkInTime = document.getElementById('check-in-time').value;
  var checkOutDate = document.getElementById('check-out-date').value;
  var checkOutTime = document.getElementById('check-out-time').value;

  var notes = document.getElementById('notes').value;
  var specialRequest = document.getElementById('special-request').value;
  var paymentInfo = document.getElementById('payment-info').value;
  var arrival = document.getElementById('arrival').value;
  var ticketNo = document.getElementById('ticket-no').value;
  var departure = document.getElementById('departure').value;
  var ticketNotwo = document.getElementById('ticket-no-two').value;




  const roomDetails = [];
  document.querySelectorAll('.room-details').forEach(room => {
      const roomType = room.querySelector('#room-type').value;
      const noOfRooms = room.querySelector('#no-of-rooms').value;
      const noOfExtraBed = room.querySelector('#no-of-extra-bed').value;
      const childWithoutBed = room.querySelector('#child-without-bed').value;
      const mealPlan = room.querySelector('#meal-plan').value;

      roomDetails.push({ roomType, noOfRooms, noOfExtraBed, childWithoutBed, mealPlan });
  });

  var termsInputs = document.querySelectorAll('.terms-condition-input');
  var termsConditions = Array.from(termsInputs).map(input => input.value);

  // Extract "Cancellation Policy" values
  var cancellationInputs = document.querySelectorAll('.cancellation-policy-input');
  var cancellationPolicy = Array.from(cancellationInputs).map(input => input.value);

 // Get the selected image file
  var hotelPhotoInputFile = document.getElementById('photo');
  var selectedPhoto = hotelPhotoInputFile.files[0];
  var photoURL = selectedPhoto ? URL.createObjectURL(selectedPhoto) : '';



  // ... rest of your variables

  // Create a reference to the database node where you want to store the data
  var formDataRef = ref(database, 'formData');

  // Push the data to the database
  push(formDataRef, {
      confirmationnumber: confirmationnumber,
      hotelName:hotelName,
      hotelAddress:hotelAddress,
      googleMapLink:googleMapLink,
      hotelPhone:hotelPhone,
      hotellPhoto:hotellPhoto,
      hotelPhotoInput:hotelPhotoInput,
      guestName:guestName,
      guestNumber:guestNumber,
      guestCitizen:guestCitizen,
      NoofAdult:NoofAdult,
      issuedBy:issuedBy,
      issuedDate:issuedDate,
      bookedBy:bookedBy,
      contactNo:contactNo,
      mailId:mailId, 
      checkInDate:checkInDate,
      checkInTime:checkInTime,
      checkOutDate:checkOutDate,
      checkOutTime:checkOutTime,
      notes:notes,
      specialRequest:specialRequest,
      paymentInfo:paymentInfo,
      arrival:arrival,
      ticketNo:ticketNo,
      departure:departure,
      ticketNotwo:ticketNotwo,
      termsConditions: termsConditions,
      cancellationPolicy: cancellationPolicy, 
      roomDetails: roomDetails,
      photoURL:photoURL,
    

 

        // ... (other form data)
    }).then(function () {
      alert('Successfully saved');
      console.log('Data saved successfully!');
    }).catch(function (error) {
      console.error('Error saving data:', error);
    });
   
}


 
