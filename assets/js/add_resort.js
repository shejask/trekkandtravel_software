// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

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
const guestsRef = ref(database, 'guests');
const storage = getStorage();

// Vouchers Form
const voucherForm = document.getElementById("voucher-form");
const vouchersContainer = document.getElementById("vouchers-container");

voucherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const hotelName = document.getElementById("hotel-name").value;
    const hotelAddress = document.getElementById("hotel-address").value;
    const hotelPhone = document.getElementById("hotel-phone").value;
     const googleMapLink = document.getElementById("google-map-link").value; // Add this line

     const hotelPhotoInput = document.getElementById("hotel-photo");
     const hotelPhoto = hotelPhotoInput.files[0]; // Get the selected file

    
    const termsAndCondition = Array.from(document.getElementsByClassName("terms-condition-input")).map(input => input.value);
    const cancellationPolicy = Array.from(document.getElementsByClassName("cancellation-policy-input")).map(input => input.value);



    const storageReference = storageRef(storage, `hotel_photos/${hotelPhoto.name}`);
    const snapshot = await uploadBytes(storageReference, hotelPhoto);
    const photoURL = await getDownloadURL(snapshot.ref);

    

 

    const newVoucherRef = push(vouchersRef);
    await set(newVoucherRef, {
        hotelName,
        hotelAddress,
        hotelPhone,
        hotelPhoto: photoURL,
        googleMapLink, // Add this line
        termsAndCondition, // Make sure this property is set
        cancellationPolicy, // Add this line
      });

      alert("Voucher created successfully!");
    location.reload();
});

// Vouchers Functions
const editVoucher = (voucherKey) => {
    const voucherRef = ref(database, `vouchers/${voucherKey}`);

    onValue(voucherRef, (snapshot) => {
        const voucher = snapshot.val();

        const editForm = document.getElementById("edit-form");
        editForm.style.display = "block";
        document.getElementById("edit-hotel-name").value = voucher.hotelName;
        document.getElementById("edit-hotel-address").value = voucher.hotelAddress;
        document.getElementById("edit-hotel-phone").value = voucher.hotelPhone;
        document.getElementById("edit-google-map-link").value = voucher.googleMapLink;

        // Update the lines below to populate terms and conditions and cancellation policy
        document.getElementById("edit-terms").value = voucher.termsAndCondition ? voucher.termsAndCondition.join(', ') : '';
        document.getElementById("edit-cancellation-policy").value = voucher.cancellationPolicy ? voucher.cancellationPolicy.join(', ') : '';

        // Add an event listener to the edit form
        editForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const editedHotelName = document.getElementById("edit-hotel-name").value;
            const editedHotelAddress = document.getElementById("edit-hotel-address").value;
            const editedHotelPhone = document.getElementById("edit-hotel-phone").value;
            const editedGoogleMapLink = document.getElementById("edit-google-map-link").value;

            // Get edited terms and conditions and cancellation policy
            const editedTerms = document.getElementById("edit-terms").value.split(',').map(term => term.trim());
            const editedCancellationPolicy = document.getElementById("edit-cancellation-policy").value.split(',').map(policy => policy.trim());

            // Check if a new image was selected for the voucher
            const editHotelPhoto = document.getElementById("edit-hotel-photo").files[0];
            let newPhotoURL = voucher.hotelPhoto;

            if (editHotelPhoto) {
                const storageReference = storageRef(storage, `hotel_photos/${editHotelPhoto.name}`);
                const snapshot = await uploadBytes(storageReference, editHotelPhoto);
                newPhotoURL = await getDownloadURL(snapshot.ref);
            }

            // Update the voucher data in the database
            set(voucherRef, {
                hotelName: editedHotelName,
                hotelAddress: editedHotelAddress,
                hotelPhone: editedHotelPhone,
                googleMapLink: editedGoogleMapLink,
                hotelPhoto: newPhotoURL,
                termsAndCondition: editedTerms,
                cancellationPolicy: editedCancellationPolicy,
            });

            // Hide the edit form after submission
            editForm.style.display = "none";

            // Show an alert to indicate successful editing
            alert("Voucher edited successfully!");

            // Reload the page to reflect the changes
            location.reload();
        });
    });
};


const deleteVoucher = (voucherKey) => {
    const voucherRef = ref(database, `vouchers/${voucherKey}`);

    set(voucherRef, null);

    alert("Voucher deleted successfully!");
    location.reload();
};

// Fetch and display vouchers
onValue(vouchersRef, (snapshot) => {
    vouchersContainer.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
        const voucherKey = childSnapshot.key;
        const voucher = childSnapshot.val();

        const voucherElement = document.createElement("div");
        voucherElement.id = voucherKey;
        voucherElement.classList.add("bg-gray-300", "p-4","w-96", "ml-5", "rounded-lg", "shadow-md" , "mb-4");

         
        const hotelNameElement = document.createElement("p");
        hotelNameElement.textContent = `Hotel Name: ${voucher.hotelName}`;
        hotelNameElement.classList.add("w-96", "p-2", "rounded",  "border-slate-700");

        const hotelAddressElement = document.createElement("p");
        hotelAddressElement.textContent = `Hotel Address: ${voucher.hotelAddress}`;
        hotelAddressElement.classList.add("w-96", "p-2", "rounded","border-slate-700");

        const hotelPhoneElement = document.createElement("p");
        hotelPhoneElement.textContent = `Hotel Phone: ${voucher.hotelPhone}`;
        hotelPhoneElement.classList.add("w-96", "p-2", "rounded",  "border-slate-700");

        const googleMapLinkElement = document.createElement("p"); // Add this line
        googleMapLinkElement.textContent = `Google Map Link: ${voucher.googleMapLink || "N/A"}`; // Add this line
        googleMapLinkElement.classList.add("w-96", "p-2", "rounded",  "border-slate-700");

        const hotelImageElement = document.createElement("img");
        hotelImageElement.src = voucher.hotelPhoto;
        hotelImageElement.classList.add("w-30", "h-20", "rounded",  );





        const termsAndConditionElement = document.createElement("p");
        termsAndConditionElement.textContent = `Terms & Condition: ${voucher.termsAndCondition ? voucher.termsAndCondition.join(', ') : "N/A"}`;
        termsAndConditionElement.classList.add("w-96", "p-2", "rounded", "border-slate-700");



        const cancellationPolicyElement = document.createElement("p");
        cancellationPolicyElement.textContent = `Cancellation Policy: ${voucher.cancellationPolicy ? voucher.cancellationPolicy.join(', ') : "N/A"}`;
        cancellationPolicyElement.classList.add("w-96", "p-2", "rounded", "border-slate-700");

         


 



        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "bg-green-800 text-white py-2 px-4 rounded hover:bg-green-600";
        editButton.addEventListener("click", () => {
            editVoucher(voucherKey);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "bg-red-500 ml-3 text-white py-2 px-4 rounded hover:bg-red-600";
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this voucher?")) {
                deleteVoucher(voucherKey);
            }
        });

 
        voucherElement.appendChild(hotelNameElement);
        voucherElement.appendChild(hotelAddressElement);
        voucherElement.appendChild(hotelPhoneElement);
        voucherElement.appendChild(googleMapLinkElement); // Add this line
        voucherElement.appendChild(termsAndConditionElement);
        voucherElement.appendChild(cancellationPolicyElement);
        voucherElement.appendChild(hotelImageElement);
        
        voucherElement.appendChild(editButton);
        voucherElement.appendChild(deleteButton);

        
 
        vouchersContainer.appendChild(voucherElement);



    });
});

// Guests Form
const guestForm = document.getElementById("guest-form");
const guestsContainer = document.getElementById("guests-container");
const citizen = document.getElementById("citizen");

 

guestForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const guestName = document.getElementById("guest-name").value;
    const contactNumber = document.getElementById("contact-number").value;
    const citizen = document.getElementById("citizen").value; // Added this line for the "Citizen" field


    const newGuestRef = push(guestsRef);
    await set(newGuestRef, {
        guestName,
        contactNumber,
        citizen, 
    });

    alert("Guest added successfully!");
    location.reload();
});

 

const deleteGuest = (guestKey) => {
    const guestRef = ref(database, `guests/${guestKey}`);

    set(guestRef, null);

    alert("Guest deleted successfully!");
    location.reload();
};

// Fetch and display guests
// Fetch and display guests
onValue(guestsRef, (snapshot) => {
    guestsContainer.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
        const guestKey = childSnapshot.key;
        const guest = childSnapshot.val();

        const guestElement = document.createElement("div");
        guestElement.id = guestKey;
        guestElement.classList.add("bg-gray-300", "p-4", "w-96", "rounded-lg", "shadow-md", "mb-4");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "bg-green-800 text-white py-2 px-4 rounded hover:bg-green-600";
        editButton.addEventListener("click", () => {
            editGuest(guestKey);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "bg-red-500 text-white ml-3 py-2 px-4 rounded hover:bg-red-600";
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this guest?")) {
                deleteGuest(guestKey);
            }
        });

        const guestNameElement = document.createElement("p");
        guestNameElement.textContent = `Guest Name: ${guest.guestName}`;

        const contactNumberElement = document.createElement("p");
        contactNumberElement.textContent = `Contact Number: ${guest.contactNumber}`;

        const citizenElement = document.createElement("p"); // Added this line
        citizenElement.textContent = `Mail id: ${guest.citizen || "N/A"}`; // Added this line

        guestElement.appendChild(guestNameElement);
        guestElement.appendChild(contactNumberElement);
        guestElement.appendChild(citizenElement); // Added this line
        guestElement.appendChild(editButton);
        guestElement.appendChild(deleteButton);

        guestsContainer.appendChild(guestElement);
    });
});


const editGuest = (guestKey) => {
    const guestRef = ref(database, `guests/${guestKey}`);

    onValue(guestRef, (snapshot) => {
        const guest = snapshot.val();

        // Create a form for editing guest details
        const editForm = document.createElement("form");
        editForm.id = "edit-guest-form";
        editForm.className = "bg-white p-4 rounded-lg shadow-md mb-4";

        // Guest Name input
        const guestNameLabel = document.createElement("label");
        guestNameLabel.textContent = "Guest Name:";
        const guestNameInput = document.createElement("input");
        guestNameInput.type = "text";
        guestNameInput.id = "edit-guest-name";
        guestNameInput.required = true;
        guestNameInput.className = "w-full p-2 border rounded";
        guestNameInput.value = guest.guestName;

        // Contact Number input
        const contactNumberLabel = document.createElement("label");
        contactNumberLabel.textContent = "Contact Number:";
        const contactNumberInput = document.createElement("input");
        contactNumberInput.type = "tel";
        contactNumberInput.id = "edit-contact-number";
        contactNumberInput.required = true;
        contactNumberInput.className = "w-full p-2 border rounded";
        contactNumberInput.value = guest.contactNumber;

        // Citizen input
        const citizenLabel = document.createElement("label");
        citizenLabel.textContent = "Mail id:";
        const citizenInput = document.createElement("input");
        citizenInput.type = "text";
        citizenInput.id = "edit-citizen";
        citizenInput.required = true;
        citizenInput.className = "w-full p-2 border rounded";
        citizenInput.value = guest.citizen || ''; // Use default value if 'citizen' is undefined

        // Save Changes button
        const saveChangesButton = document.createElement("button");
        saveChangesButton.type = "button"; // Change type to prevent form submission
        saveChangesButton.textContent = "Save Changes";
        saveChangesButton.className = "bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800";

        // Add event listener for saving changes
        saveChangesButton.addEventListener("click", async () => {
            // Get edited values
            const editedGuestName = document.getElementById("edit-guest-name").value;
            const editedContactNumber = document.getElementById("edit-contact-number").value;
            const editedCitizen = document.getElementById("edit-citizen").value;

            // Update guest details in the database
            set(guestRef, {
                guestName: editedGuestName,
                contactNumber: editedContactNumber,
                citizen: editedCitizen,
            });

            // Hide the edit form after submission
            editForm.style.display = "none";

            // Show an alert to indicate successful editing
            alert("Guest edited successfully!");

            // Reload the page to reflect the changes
            location.reload();
        });

        // Append elements to the form
        editForm.appendChild(guestNameLabel);
        editForm.appendChild(guestNameInput);
        editForm.appendChild(contactNumberLabel);
        editForm.appendChild(contactNumberInput);
        editForm.appendChild(citizenLabel);
        editForm.appendChild(citizenInput);
        editForm.appendChild(saveChangesButton);

        // Append the form to the guests container
        guestsContainer.appendChild(editForm);
    });
};




// ... (your existing code)

// Function to handle form submission
function handleFormSubmission() {
    // ... (your existing code)

    const selectedArrivalOption = document.getElementById("arrival-options").value;
    const arrivalFrom = document.getElementById("arrival-from").value;

    const selectedDepartureOption = document.getElementById("departure-options").value;
    const departureFrom = document.getElementById("departure-from").value;

    // Add your logic to submit the selected arrival and departure data to Firebase or perform other actions
    console.log("Selected arrival:", selectedArrivalOption, arrivalFrom);
    console.log("Selected departure:", selectedDepartureOption, departureFrom);
}

// ... (your existing code)



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






document.getElementById("add-terms-button").addEventListener("click", function () {
    const termsContainer = document.getElementById("terms-container");

    // Create a new input field
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter terms & condition";
    input.className = "w-full p-2 p-2 border rounded border border-slate-700 mb-2   terms-condition-input";

    // Append the new input field to the container
    termsContainer.appendChild(input);
});


 

 
document.getElementById("add-cancellation-button").addEventListener("click", function () {
    const cancellationContainer = document.getElementById("cancellation-container");

    // Create a new input field
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter cancellation policy";
    input.className = "w-full p-2 border rounded mb-2 cancellation-policy-input";

    // Append the new input field to the container
    cancellationContainer.appendChild(input);
});


 



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


 





