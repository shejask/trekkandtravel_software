 // Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";



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
 // Reference to the Firebase Storage
 const storage = getStorage();

// Reference to the formData in the database
const formDataRef = ref(database, 'formData');

// Reference to the confirmation name dropdown element
const confirmationNameDropdown = document.getElementById('confirmation-name-dropdown');
const confirmationNumberInput = document.getElementById('confirmation-number');
const hotelNameInput = document.getElementById('hotel-name');
const hotelAddressInput = document.getElementById('hotel-address');
const googleMapLinkInput = document.getElementById('google-map-link');
const hotelPhoneInput = document.getElementById('hotel-phone');

// Reference to the guest details input elements
const guestNameInput = document.getElementById('guest-name');
const guestNumberInput = document.getElementById('guest-number');
const  guestCitizenInput = document.getElementById('guest-Citizen')
const noOfAdultsInput = document.getElementById('No-of-Adults');



const issuedByInput = document.getElementById('issued-by');
 
const  issuedDateInput = document.getElementById('issued-date');
const bookedByInput = document.getElementById('booked-by');
const contactNoInput = document.getElementById('contact-no');
const mailIdInput = document.getElementById('mail-id');



// Reference to the check-in/check-out details input elements
const checkInDateInput = document.getElementById('check-in-date');
const checkInTimeInput = document.getElementById('check-in-time');
const checkOutDateInput = document.getElementById('check-out-date');
const checkOutTimeInput = document.getElementById('check-out-time');
const notesInput = document.getElementById('notes');
const specialRequestInput = document.getElementById('special-request');
const paymentInfoInput = document.getElementById('payment-info');
const arrivalInput = document.getElementById('arrival');
const ticketNoTwoInput = document.getElementById('ticket-no-two');
const departureInput = document.getElementById('departure');
const ticketNoInput = document.getElementById('ticket-no');

// Reference to the terms and cancellation policy containers
 
const cancellationPolicyInput = document.getElementById('cancellation-policy');

 // Reference to the room details container
 // Reference to the room details container
 const roomDetailsContainer = document.getElementById('room-details-container');


// Reference to the hotel photo preview element
const hotelPhotoPreview = document.getElementById('hotel-photo-preview');


// ...


// ... (Previous code)




// Function to update the dropdown based on the search query
function updateDropdown(searchQuery) {
    // Fetch confirmation numbers from Firebase
    onValue(formDataRef, (snapshot) => {
      const formData = snapshot.val();
  
      // Check if data exists and is an object
      if (formData && typeof formData === 'object') {
        // Extract confirmation numbers
        const confirmationNumbers = Object.keys(formData);
  
        // Clear existing content in the dropdown
        confirmationNameDropdown.innerHTML = '';
  
        // Populate the dropdown with matching confirmation numbers
        confirmationNumbers.forEach((confirmationNumber) => {
          console.log('confirmationNumber:', confirmationNumber);
          const currentConfirmationNumber = formData[confirmationNumber]?.confirmationnumber?.toLowerCase();
          console.log('currentConfirmationNumber:', currentConfirmationNumber);
          
          if (currentConfirmationNumber && currentConfirmationNumber.includes(searchQuery)) {
            const option = document.createElement('div');
            option.textContent = formData[confirmationNumber].confirmationnumber;
            option.classList.add('dropdown-item'); // Add Tailwind CSS class if needed
            confirmationNameDropdown.appendChild(option);
  
            // Add click event listener to populate input fields on item click
            option.addEventListener('click', () => {
              // Update input fields with corresponding data
              const selectedConfirmationNumber = formData[confirmationNumber];
  
              
            ///////////////////////////////////////////
 ///////////////////////////////////////////
 ///////////////////////////////////////////
 ///////////////////////////////////////////
 ///////////////////////////////////////////


            hotelNameInput.value = selectedConfirmationNumber.hotelName || '';
            hotelAddressInput.value = selectedConfirmationNumber.hotelAddress || '';
            googleMapLinkInput.value = selectedConfirmationNumber.googleMapLink || '';
            hotelPhoneInput.value = selectedConfirmationNumber.hotelPhone || '';

            
            guestNameInput.value = selectedConfirmationNumber.guestName || '';
            guestNumberInput.value = selectedConfirmationNumber.guestNumber || '';

            guestCitizenInput.value  = selectedConfirmationNumber.guestCitizen || '';
             
            noOfAdultsInput.value = selectedConfirmationNumber.NoofAdult  || '';
      


            issuedByInput.value = selectedConfirmationNumber.issuedBy || '';
            issuedDateInput.value = selectedConfirmationNumber.issuedDate || '';
            bookedByInput.value = selectedConfirmationNumber.bookedBy || '';
            contactNoInput.value = selectedConfirmationNumber.contactNo || '';
            mailIdInput.value = selectedConfirmationNumber.mailId || '';


            checkInDateInput.value = selectedConfirmationNumber.checkInDate || '';
            checkInTimeInput.value = selectedConfirmationNumber.checkInTime || '';
            checkOutDateInput.value = selectedConfirmationNumber.checkOutDate || '';
            checkOutTimeInput.value = selectedConfirmationNumber.checkOutTime || '';
            notesInput.value = selectedConfirmationNumber.notes || '';
            specialRequestInput.value = selectedConfirmationNumber.specialRequest || '';
            paymentInfoInput.value = selectedConfirmationNumber.paymentInfo || '';
            arrivalInput.value = selectedConfirmationNumber.arrival || '';
            ticketNoTwoInput.value = selectedConfirmationNumber.ticketNo || '';
            departureInput.value = selectedConfirmationNumber.departure || '';
            ticketNoInput.value = selectedConfirmationNumber.ticketNotwo|| '';
        
            cancellationPolicyInput.value = selectedConfirmationNumber.cancellationPolicy || '';
   
  // Additional field

  if (selectedConfirmationNumber.roomDetails && selectedConfirmationNumber.roomDetails.length > 0) {
    // Clear existing content
    roomDetailsContainer.innerHTML = '';

    // Loop through each item in roomDetails
    selectedConfirmationNumber.roomDetails.forEach(room => {
      // Create input fields for each property
      createInputField(roomDetailsContainer, 'Room Type:', room.roomType || 'N/A');
      createInputField(roomDetailsContainer, 'No of Rooms:', room.noOfRooms || 'N/A');
      createInputField(roomDetailsContainer, 'No of Extra Bed:', room.noOfExtraBed || 'N/A');
      createInputField(roomDetailsContainer, 'Child Without Bed:', room.childWithoutBed || 'N/A');
    });
  } else {
    // If no roomDetails, display a message or handle as needed
    roomDetailsContainer.innerHTML = 'No room details available';
  }

    

  // Additional field

  ///////////////////////////////////////////
  const termsConditionsContainer = document.getElementById('Terms-container');
  if (selectedConfirmationNumber.termsConditions && selectedConfirmationNumber.termsConditions.length > 0) {
    // Clear existing content
    termsConditionsContainer.innerHTML = '';

    // Loop through each item in termsConditions
    selectedConfirmationNumber.termsConditions.forEach((term, index) => {
      // Create input fields for each index
      createInputField(termsConditionsContainer, `Terms&Condition ${index + 1}:`, term || 'N/A');
    });
  } else {
    // If no termsConditions, display a message or handle as needed
    termsConditionsContainer.innerHTML = 'No terms conditions available';
  }
 ///////////////////////////////////////////

  // Additional field
   
  const cancellationPolicyContainer = document.getElementById('cancellation-container');
  if (selectedConfirmationNumber.cancellationPolicy && selectedConfirmationNumber.cancellationPolicy.length > 0) {
    // Clear existing content
    cancellationPolicyContainer.innerHTML = '';

    // Loop through each item in cancellationPolicy
    selectedConfirmationNumber.cancellationPolicy.forEach((policy, index) => {
      // Create input fields for each index
      createInputField(cancellationPolicyContainer, `Cancellation Policy ${index + 1}:`, policy || 'N/A');
    });
  } else {
    // If no cancellationPolicy, display a message or handle as needed
    cancellationPolicyContainer.innerHTML = 'No cancellation policy available';
  }
 ///////////////////////////////////////////
 ///////////////////////////////////////////
// Fetch hotel photo URL from selectedConfirmationNumber and display it in the preview
// Fetch hotel photo URL from selectedConfirmationNumber and display it in the preview
// Fetch hotel photo URL from selectedConfirmationNumber and display it in the preview
// Fetch and fill room details from the database
// Fetch and fill room details from the database
onValue(formDataRef, (snapshot) => {
  const formData = snapshot.val();
  if (formData && typeof formData === 'object') {
    const selectedConfirmationNumber = formData[confirmationNumber];

    if (selectedConfirmationNumber && selectedConfirmationNumber.roomDetails) {
      const roomDetailsContainer = document.getElementById('room-details-container');

      // Clear existing content
      roomDetailsContainer.innerHTML = '';

      // Loop through each room detail item
      selectedConfirmationNumber.roomDetails.forEach((room, index) => {
        const roomContainer = document.createElement('div');
        roomContainer.id = `room-${index}`;
        roomContainer.classList.add('mb-4');

        // Create input fields for each property
        createRoomInputField(roomContainer, 'Room Type:', room.roomType || 'N/A');
        createRoomInputField(roomContainer, 'No. of Rooms:', room.noOfRooms || 'N/A');
        createRoomInputField(roomContainer, 'No. of Extra Beds:', room.noOfExtraBed || 'N/A');
        createRoomInputField(roomContainer, 'Child Without Bed:', room.childWithoutBed || 'N/A');
        createRoomInputField(roomContainer, 'Meal Plan:', room.mealPlan || 'N/A');

        // Append the room container to the room details container
        roomDetailsContainer.appendChild(roomContainer);
      });
    }
  }
});
// Fetch hotel photo URL from selectedConfirmationNumber and display it in the preview
// Fetch hotel photo URL from selectedConfirmationNumber and display it in the preview
// Assuming roomDetails is an array of objects
 
// Initialize a variable to store the image URL
 // Initialize a variable to store the image URL
 

// Fetch hotel photo URL from selectedConfirmationNumber
// Fetch hotel photo URL from selectedConfirmationNumber and display it in the preview
onValue(formDataRef, (snapshot) => {
  const formData = snapshot.val();
  if (formData && typeof formData === 'object') {
    const selectedConfirmationNumber = formData[confirmationNumber];

    if (selectedConfirmationNumber && selectedConfirmationNumber.hotellPhoto) {
      imageURL = selectedConfirmationNumber.hotellPhoto;

      // Log for debugging
      console.log('selectedConfirmationNumber:', selectedConfirmationNumber);
      console.log('imageURL:', imageURL);

      // Set the src attribute of the hotel-photo-preview element
      hotelPhotoPreview.src = imageURL;
    }
  }
});

 ///////////////////////////////////////////
 ///////////////////////////////////////////
 ///////////////////////////////////////////
  
              // Hide the dropdown
              confirmationNameDropdown.classList.remove('hidden'); // Remove the 'hidden' class initially

            });
          }
        });
  
        // Toggle the visibility of the dropdown based on whether there are matching items
        confirmationNameDropdown.classList.toggle('hidden', confirmationNumbers.length === 0);
      }
    });
  }
// Variable to store the imageURL
let imageURL;
  




// Add an event listener to the input for real-time search
confirmationNumberInput.addEventListener('input', () => {
  const searchQuery = confirmationNumberInput.value.toLowerCase();
  updateDropdown(searchQuery);
  
  // Hide the dropdown if the input has no value
  confirmationNameDropdown.classList.add('hidden');
});


function createInputField(container, label, value) {
    const labelElement = document.createElement('label');
    labelElement.innerText = label;
    container.appendChild(labelElement);
  
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = value;
    inputElement.classList.add('w-full', 'p-2', 'border', 'rounded');
    container.appendChild(inputElement);
  }
////////////////////////////////////////////////
/////////////////////////////////////////////
///////////////////////////////////////////////
// Function to create input fields for room details
// Function to create input fields for room details
function createRoomInputField(container, label, value) {
  const labelElement = document.createElement('label');
  labelElement.textContent = label;

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = value;
  inputElement.classList.add('w-full', 'p-2', 'rounded', 'border', 'border-slate-700');

  container.appendChild(labelElement);
  container.appendChild(inputElement);
}

 

function updateFirebaseData() {
    // Fetch the selected confirmation number
    const selectedConfirmationNumber = confirmationNumberInput.value;
  
    // Create an object with the updated data
    const updatedData = {
      hotelName: hotelNameInput.value,
      hotelAddress: hotelAddressInput.value,
      googleMapLink: googleMapLinkInput.value,
      hotelPhone: hotelPhoneInput.value,
      guestName: guestNameInput.value,
      guestNumber: guestNumberInput.value,
      NoofAdult: noOfAdultsInput.value,
      issuedBy: issuedByInput.value,
      issuedDate: issuedDateInput.value,
      bookedBy: bookedByInput.value,
      contactNo: contactNoInput.value,
      mailId: mailIdInput.value,
      checkInDate: checkInDateInput.value,
      checkInTime: checkInTimeInput.value,
      checkOutDate: checkOutDateInput.value,
      checkOutTime: checkOutTimeInput.value,
      notes: notesInput.value,
      specialRequest: specialRequestInput.value,
      paymentInfo: paymentInfoInput.value,
      arrival: arrivalInput.value,
      ticketNo: ticketNoTwoInput.value,
      departure: departureInput.value,
      ticketNotwo: ticketNoInput.value,
      cancellationPolicy: cancellationPolicyInput.value,
      // ... (Add other fields as needed)
    };
  
    // Update the data in the database at the specific path based on the selected confirmation number
    set(ref(database, `formData/${selectedConfirmationNumber}`), updatedData)
      .then(() => {
        console.log('Data updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  }
  
  // Add an event listener to the save button
  const saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', updateFirebaseData);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 // Function to create HTML for room details
function generateRoomDetailsHTML(roomDetails) {
  let roomDetailsHTML = '';

  if (roomDetails && roomDetails.length > 0) {
      roomDetails.forEach((room, index) => {
          roomDetailsHTML += `
              <div id="room-${index}" class="mb-4">
                  <label>Room Type:</label>
                  <input type="text" value="${room.roomType || 'N/A'}" class="w-full p-2 border rounded">
                  <label>No. of Rooms:</label>
                  <input type="text" value="${room.noOfRooms || 'N/A'}" class="w-full p-2 border rounded">
                  <label>No. of Extra Beds:</label>
                  <input type="text" value="${room.noOfExtraBed || 'N/A'}" class="w-full p-2 border rounded">
                  <label>Child Without Bed:</label>
                  <input type="text" value="${room.childWithoutBed || 'N/A'}" class="w-full p-2 border rounded">
                  <label>Meal Plan:</label>
                  <input type="text" value="${room.mealPlan || 'N/A'}" class="w-full p-2 border rounded">
              </div>
          `;
      });
  }

  return roomDetailsHTML;
}

// Function to update the room details container
function updateRoomDetailsContainer(selectedConfirmationNumber) {
  const roomDetailsContainer = document.getElementById('room-details-container');

  // Clear existing content
  roomDetailsContainer.innerHTML = '';

  // Generate HTML for room details
  const roomDetailsHTML = generateRoomDetailsHTML(selectedConfirmationNumber.roomDetails);

  // Append the room details HTML to the container
  roomDetailsContainer.innerHTML = roomDetailsHTML;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const printButton = document.getElementById('print-button');
 

// Add this code inside the event listener for the print button
printButton.addEventListener('click', () => {
    // Open a new window
    const printWindow = window.open('', '_blank');

  

 
  // Extract values from the input fields within the "Terms-container" div
  const termsContainer = document.getElementById('Terms-container');
  const termsInputFields = termsContainer.querySelectorAll('input');

  // Extract values from the input fields within the "cancellation-container" div
  const cancellationContainer = document.getElementById('cancellation-container');
  const cancellationInputFields = cancellationContainer.querySelectorAll('input');
 
  // Create arrays to store the input field values
  const termsInputFieldValues = [];
  const cancellationInputFieldValues = [];
  // const roomDetails = [];

  // Function to retrieve input field values
  const getInputFieldValues = (inputFields, valuesArray) => {
    inputFields.forEach(inputField => {
      valuesArray.push(inputField.value);
    });
  };

  // Get values for "Term & conditions" input fields
  getInputFieldValues(termsInputFields, termsInputFieldValues);

  // Get values for "Cancellation Policy" input fields
  getInputFieldValues(cancellationInputFields, cancellationInputFieldValues);

 
   // Create HTML content for room details
 
 //////////////////////
   // Extract room details from the database 
 ///////////////////////////
    // Write the HTML content to the new window
    printWindow.document.write(`
    
   
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
<style>
.font-manrope {
    font-family: 'Manrope', sans-serif;
}

</style>
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
          confirmation No: <span>${confirmationNumberInput.value}</span>
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
          <img class="w-full h-full object-cover" src="${imageURL}" alt="" />
        </div>
        <div
          class="w-full h-full bg-yellow-500 flex flex-col items-start justify-center gap-5 text-black px-5 py-3"
        >
          <h1 class="font-semibold text-xl">${hotelNameInput.value}</h1>

          <div class="flex flex-col">
            <div class="flex gap-1 items-center">
              <h1>Address :</h1>
              <h1>${hotelAddressInput.value}</h1>
            </div>
            <div class="flex gap-1 items-center">
            <h1>Google map :</h1>
            <h1>${googleMapLinkInput.value}</h1>

         </div>
        
        
        
            <div class="flex gap-1 items-center">
              <h1>Phone no :</h1>
              <h1>${hotelPhoneInput.value}</h1>
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
            <h1>${checkInDateInput.value}</h1>
            <h1>${checkInTimeInput.value}</h1>
          </div>
          <hr class="border-2 border-blue-400 w-1/4" />
          <div class="flex flex-col justify-center items-center">
            <h1 class="font-semibold text-xl">Check out</h1>
            <h1>${checkOutDateInput.value}</h1>
            <h1>${checkOutTimeInput.value}</h1>
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
              <h1>${guestNameInput.value}</h1>
            </div>
            <div class="flex gap-1">
              <h1>Contact no :</h1>
              <h1>${guestNumberInput.value}</h1>
            </div>
            <div class="flex gap-1">
              <h1>Citizen no :</h1>
              <h1>${guestCitizenInput.value}</h1>
            </div>
            <div class="flex gap-1">
              <h1>No of Adults :</h1>
              <h1>${noOfAdultsInput.value}</h1>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Issued by :</h1>
            <h1>${issuedByInput.value}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Issued date :</h1>
            <h1>${issuedDateInput.value}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Booked by :</h1>
            <h1>${bookedByInput.value}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Contanct no :</h1>
            <h1>${contactNoInput.value}</h1>
          </div>
          <div class="flex items-center gap-2 text-black">
            <h1 class="">Mail id :</h1>
            <h1>${mailIdInput.value}</h1>
          </div>
        </div>
        
      </div>
      <hr class="border border-gray-400 mt-3" />
            </div>
    <div class="mt-3 px-10">
      <div class="w-full flex justify-between gap-5 flex-wrap h-auto">
        <!-- map from here to 👇 -->
        
        
      

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
          ${notesInput.value}
          </h1>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-semibold">Special Request:</h1>
          <h1>
          ${specialRequestInput.value}
          </h1>
        </div>
      </div>
      <hr class="border border-gray-400 mt-3" />
    </div>
    <div class="mt-5 px-10">
      <div class="flex flex-col gap-1">
        <h1 class="text-lg font-semibold">Payment Information</h1>
        <h1>
        ${paymentInfoInput.value}
        </h1>
      </div>
      <hr class="border border-gray-400 mt-3" />
    </div>
    <div class="mt-3 px-10">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <h1 class="text-lg font-semibold">Arrival:</h1>
          <h1><span class="underline mr-2">${arrivalInput.value}</span>${ticketNoInput.value}</h1>
        </div>
        <div class="flex gap-2">
          <h1 class="text-lg font-semibold">Departure:</h1>
          <h1><span class="underline  mr-2" >${departureInput.value}</span>${ticketNoTwoInput.value}</h1>
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
            ${termsInputFieldValues.map(value => `<li>${value}</li>`).join('')}
   
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-semibold">Cancellation Policy</h1>
          <div class="px-5">
            <ul class="list-disc text-sm">
            ${cancellationInputFieldValues.map(value => `<li>${value}</li>`).join('')}

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

 
  
    // Close the document for writing
    printWindow.document.close();
    printWindow.print();
    // Trigger the print dialog
    setTimeout(() => {
      printWindow.print();
  }, 500);
  });
  




  function getRoomDetailsHTML(container) {
    const roomDetails = container.querySelectorAll('.room-details-item');
    return Array.from(roomDetails)
      .map((roomDetail) => `<li>${roomDetail.innerText}</li>`)
      .join('');
  }









































 


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
