import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getDatabase, ref as databaseRef, push, set, get,   onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
 
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
const formsRef = ref(database, 'TransportVoucher'); // Declare and initialize formsRef

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for hotel input
    var hotelInput = document.getElementById("hotel");
    var dropdownContainer = document.getElementById("hotel-name-dropdown");
    var addressInput = document.getElementById("hotelladdresss"); // Assuming this is the ID of your hotel address input

    if (hotelInput && dropdownContainer && addressInput) {
        hotelInput.addEventListener("input", function () {
            populateHotelDropdown("hotel", "hotel-name-dropdown", "hotelladdresss");
        });
    } else {
        console.error("Hotel input, dropdown container, or address input not found");
    }

    // Add event listener for duplicating input fields
    var duplicateButton = document.getElementById("duplicate-btn");

    if (duplicateButton) {
        duplicateButton.addEventListener("click", function () {
            duplicateInputFields();
        });
    } else {
        console.error("Duplicate button not found");
    }

    function duplicateInputFields() {
        // Get the container
        var container = document.getElementById('inputContainer');

        if (!container) {
            console.error("Container not found");
            return;
        }

        // Clone the original input row
        var originalInputRow = container.querySelector('.input-row');
        if (!originalInputRow) {
            console.error("Original input row not found");
            return;
        }

        var newDiv = originalInputRow.cloneNode(true);

        // Update IDs to make them unique
        var suffix = Date.now(); // Add a timestamp suffix for uniqueness
        newDiv.querySelectorAll('[id]').forEach((element) => {
            element.id = element.id + '-' + suffix;
        });

        // Clear the value in the duplicated hotel input
        var duplicatedHotelInput = newDiv.querySelector('input[name="hotel"]');
        if (duplicatedHotelInput) {
            duplicatedHotelInput.value = "";
        }

        // Append the new div to the container
        container.appendChild(newDiv);

        // Add event listener for the duplicated input field
        var duplicatedInput = newDiv.querySelector('input[name="hotel"]');
        if (duplicatedInput) {
            duplicatedInput.addEventListener("input", function () {
                populateHotelDropdown(duplicatedInput.id, 'hotel-name-dropdown-' + suffix, 'hotelladdresss-' + suffix);
            });
        } else {
            console.error("Duplicated input not found");
        }
    }

    // Function to populate hotel dropdown
    function populateHotelDropdown(inputId, dropdownId, addressInputId) {
        // Get the value from the input field
        const hotelInput = document.getElementById(inputId).value.toLowerCase();
    
        // Get the dropdown container and address input field
        const dropdownContainer = document.getElementById(dropdownId);
        const addressInput = document.getElementById(addressInputId);
    
        // Clear the previous dropdown content and address input field
        dropdownContainer.innerHTML = "";
        addressInput.value = "";
    
        // Query the database for all hotel names and addresses
        onValue(vouchersRef, (snapshot) => {
            const data = snapshot.val();
    
            if (data) {
                const matchingHotels = Object.values(data).filter(
                    (voucher) => voucher.hotelName.toLowerCase().startsWith(hotelInput)
                );
    
                matchingHotels.forEach((voucher) => {
                    // Create a new option element
                    const option = document.createElement("div");
                    option.textContent = voucher.hotelName;
                    option.className = "dropdown-item";
    
                    // Add click event to select the hotel name and fill the address
                    option.addEventListener("click", function () {
                        document.getElementById(inputId).value = voucher.hotelName;
    
                        // Concatenate hotelAddress with googleMapLink
                        const combinedAddress = `${voucher.hotelAddress} - ${voucher.hotelPhone}`;
                        addressInput.value = combinedAddress;
    
                        dropdownContainer.innerHTML = ""; // Clear dropdown after selection
                    });
    
                    // Append the option to the dropdown
                    dropdownContainer.appendChild(option);
    
                    // Add a horizontal rule after each option
                    const hr = document.createElement("hr");
                    dropdownContainer.appendChild(hr);
                });
    
                // Display the dropdown container
                dropdownContainer.classList.remove("hidden");
            }
        });
    }
    
});
 

 

document.addEventListener("DOMContentLoaded", function () {
    // ... (your existing code) ...

    function populateGuestNumber(inputId, dropdownId, numberInputId) {
        // Get the value from the input field
        const guestNameInput = document.getElementById(inputId).value.toLowerCase();

        // Get the dropdown container
        const dropdownContainer = document.getElementById(dropdownId);

        // Hide the dropdown if the input value is empty
        if (guestNameInput.length === 0) {
            dropdownContainer.classList.add("hidden");
            return;
        }

        // Clear the previous dropdown content
        dropdownContainer.innerHTML = "";

        // Query the database for all guest names and numbers
        onValue(guestsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const guestDetails = Object.values(data);

                guestDetails.forEach((guest) => {
                    // Check if the guest name starts with the input
                    if (guest.guestName.toLowerCase().startsWith(guestNameInput)) {
                        // Create a new option element
                        const option = document.createElement("div");
                        option.textContent = guest.guestName;
                        option.className = "dropdown-item";

                        // Add click event to select the guest name and fill guest number
                        option.addEventListener("click", function () {
                            document.getElementById(inputId).value = guest.guestName;
                            document.getElementById(numberInputId).value = guest.contactNumber;
                            dropdownContainer.innerHTML = ""; // Clear dropdown after selection
                        });

                        // Append the option to the dropdown
                        dropdownContainer.appendChild(option);
                    }
                });

                // Display the dropdown container
                dropdownContainer.classList.remove("hidden");
            }
        });
    }

    document.getElementById("guestName").addEventListener("input", function () {
        populateGuestNumber("guestName", "guest-name-dropdown", "guestNumber");
    });

    // ... (your existing code) ...
});



////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
 

document.addEventListener("DOMContentLoaded", function () {
    // Get references to the input fields
    const travelDateInput = document.getElementById("travelDate");
    const autoFillDateInput = document.querySelector('#autoFillDate input[type="date"]');
    const dayInput = document.querySelector('#tourTable tbody tr td input[type="text"]');

    // Set initial value from travelDate to autoFillDate
    autoFillDateInput.value = travelDateInput.value;

    // Add an event listener to the travelDate input
    travelDateInput.addEventListener("input", function () {
        // Update autoFillDate when travelDate changes
        autoFillDateInput.value = travelDateInput.value;

        // Get the selected date from autoFillDateInput
        const selectedDate = new Date(autoFillDateInput.value);

        // Check if the selectedDate is valid
        if (!isNaN(selectedDate.getTime())) {
            // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
            const dayOfWeek = selectedDate.getDay();

            // Define an array of days
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            // Populate the dayInput with the corresponding day of the week
            dayInput.value = daysOfWeek[dayOfWeek];
        } else {
            // Clear the dayInput if the selected date is invalid
            dayInput.value = "";
        }
    });

    // ... (your existing code) ...
});

 
//////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const addRowButton = document.getElementById("add-row-btn");

    if (addRowButton) {
        let rowCounter = 1; // Counter to track the number of added rows

        addRowButton.addEventListener("click", function () {
            addNewRow(rowCounter);
            rowCounter++;
        });
    } else {
        console.error("Add row button not found");
    }

    function addNewRow(counter) {
        // Get a reference to the table body
        const tableBody = document.getElementById("tourTable").getElementsByTagName("tbody")[0];

        // Create a new row
        const newRow = tableBody.insertRow(tableBody.rows.length);

        // Create cells for the new row
        const dayCell = newRow.insertCell(0);
        const autoFillDateCell = newRow.insertCell(1);
        const programCell = newRow.insertCell(2);

        // Add input elements to the cells
        dayCell.innerHTML = `<input type="text" placeholder="Enter day" class="w-full p-2 border rounded border-slate-700">`;
        autoFillDateCell.innerHTML = `<td class="p-2"><input type="date" class="w-full p-2 border rounded border-slate-700"></td>`;
        programCell.innerHTML = `<input type="text" placeholder="Enter tour program" class="w-full p-2 border rounded border-slate-700">`;

        // Auto-fill the date value in the duplicated row
        const originalAutoFillDateInput = document.querySelector('#autoFillDate input[type="date"]');
        const duplicatedAutoFillDateInput = newRow.querySelector('td input[type="date"]');
        const duplicatedDayInput = newRow.querySelector('td input[type="text"]');

        if (originalAutoFillDateInput && duplicatedAutoFillDateInput && duplicatedDayInput) {
            const originalDate = new Date(originalAutoFillDateInput.value);
            if (!isNaN(originalDate.getTime())) {
                // Add counter number of days to the original date
                const newDate = new Date(originalDate);
                newDate.setDate(newDate.getDate() + counter);

                // Format the date as "YYYY-MM-DD" for input type="date"
                const formattedDate = newDate.toISOString().split('T')[0];
                duplicatedAutoFillDateInput.value = formattedDate;

                // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
                const dayOfWeek = newDate.getDay();

                // Define an array of days
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                // Populate the day input with the corresponding day of the week
                duplicatedDayInput.value = daysOfWeek[dayOfWeek];
            }
        }
    }
});
 

// function getTableValues() {
//     var tableValues = [];

//     // Get the content of the table
//     var inputContainer = document.getElementById("inputContainer");
//     var tableRows = inputContainer.querySelectorAll('.input-row');

//     // Extract values from each row
//     tableRows.forEach(function (row) {
//         var cells = row.querySelectorAll('input, select, textarea');
//         var rowValues = [];

//         cells.forEach(function (cell) {
//             rowValues.push(cell.value);
//         });

//         tableValues.push(rowValues);
//     });

//     return tableValues;
// }
 

 
 
// Function to get the value of an input element by ID
function getInputValueById(id) {
    const inputElement = document.getElementById(id);
    return inputElement ? inputElement.value : '';
}
//////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////

 // Function to generate HTML markup for duplicated rows
// Function to generate HTML markup for duplicated rows
// Function to generate HTML markup for duplicated rows
 // Function to generate HTML markup for duplicated rows
// Function to generate HTML markup for duplicated rows
function generateDuplicatedRowsHTML() {
    const container = document.getElementById("inputContainer");
    const duplicatedRowsHTML = [];

    // Iterate through duplicated rows, starting from the second row (index 1)
    const duplicatedRows = container.querySelectorAll('.input-row:not(:first-child)'); // Skip the original row
    duplicatedRows.forEach((duplicatedRow) => {
        const cells = duplicatedRow.getElementsByTagName("td");
        let rowHTML = "<tr>";

        for (let j = 0; j < cells.length; j++) {
            const input = cells[j].querySelector("input");

            if (input) {
                const value = input.value;
                rowHTML += `<td class="  border border-1 border-black text-center px-2 py-1">${value}</td>`;
            }
        }

        rowHTML += "</tr>";
        duplicatedRowsHTML.push(rowHTML);
    });

    return duplicatedRowsHTML.join(""); // Join HTML strings into a single string
}


// ... (other functions remain unchanged)

 


//Print //Print //Print //Print //Print //Print //Print //Print //Print //Print//Print //Print//Print //Print//Print //Print
//Print //Print//Print //Print//Print //Print//Print //Print//Print //Print//Print //Print//Print //Print//Print //Print//Print 
  
document.addEventListener("DOMContentLoaded", function () {
    // ... (your existing code) ...

    // Add event listener for the Print button
    var printButton = document.getElementById("print-btn");

    if (printButton) {
        printButton.addEventListener("click", function () {
            printTransportVoucher();
        });
    } else {
        console.error("Print button not found");
    }

    // Function to print Transport Voucher
    function printTransportVoucher() {
        // Retrieve form data
        const voucherNo = getValueById("voucherNo");
        const confirmationNo = getValueById("ConfirmationNo");
        const transport = getValueById("transport");
        const numberOfVehicles = getValueById("numVehicles");
        const numberOfPax = getValueById("numPax");
        const confirmedBy = getValueById("confirmedBy");
        const arrival = getValueById("arrival");
        const departure = getValueById("departure");
        const travelDate = getValueById("travelDate");
        const duration = getValueById("duration");
        const driver = getValueById("driver");
        const vehicleNo = getValueById("Vehicleno");
        const guestName = getValueById("guestName");
        const guestNumber = getValueById("guestNumber");
        const TourManager = getValueById("TourManager");
        const Contantno = getValueById("Contant-no");
        const notes = getValueById("notes");


         
      
 // Get the table values (modify this based on how you obtain tableValues)
//  var tableValues = getTableValues();
 
        const tourTableData = getTourTableData();
        const duplicatedRowsHTML = generateDuplicatedRowsHTML();

       
     
        
   
    var printWindow = window.open('', '_blank');


 

     // Map the input values for the table row
 // Map the input values for the table row
 



 var tourTableHTML = tourTableData.map(({ day, date, tourProgram }) => `
  <tr class="border border-1 border-black rounded-md">
    <td class="  border border-1 border-black text-center px-2 py-1">${day}</td>
    <td class="  border border-1 border-black text-center px-2 py-1">${date}</td>
    <td class="  border border-1 border-black text-center px-2 py-1">${tourProgram}</td>
  </tr>
`).join('');

 



    printWindow.document.write(` 

  
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap">

    <title>Document</title>
    <style>
    .font-manrope {
        font-family: 'Manrope', sans-serif;
    }

    </style>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>


    <body class="font-manrope">
    <div class="w-full h-screen">
      <div
        class="w-full bg-blue-500 h-24 flex items-center justify-between pl-5 bg-cover"
        style="background-image: url(/assets/imgs/Rectangle1.png)"
      >
        <div class="flex flex-col text-white">
          <h1 class="font-bold text-xl">Transport Voucher</h1>
          <h1 class="text-sm font-light">
            confirmation No: <span> ${confirmationNo}</span>
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
      <div class="mt-5 px-5">
        <div class=" flex justify-between  h-auto">
        <div class=" flex flex-col gap-4">
            <div class=" border border-1 border-black px-2 py-1 flex gap-2 items-center rounded-lg w-auto">
                <h1 class=" text-xl font-semibold">Arrival :</h1>
                <h1>${arrival}</h1>
            </div>
            <div class=" border border-1 border-black px-2 py-1 flex gap-2 items-center rounded-lg w-auto">
                <h1 class=" text-xl font-semibold">Departure :</h1>
                <h1> ${departure}</h1>
            </div>
            <div class="  ">
            <h1>Driver :<span> ${driver}</span> </h1>
            <h1>Vehicle no: <span> ${vehicleNo}</span></h1>
        </div>
        
        </div>
        <div class=" flex flex-col">
            <div class=" flex items-center gap-2 ">
                <h1>Voucher No :</h1>
                <h1>${voucherNo}</h1>
            </div>
            <div class=" flex items-center gap-2 ">
                <h1>Transport :</h1>
                <h1>${transport}</h1>
            </div>
            <div class=" flex items-center gap-2 ">
                <h1>No of vehicles :</h1>
                <h1>${numberOfVehicles}</h1>
            </div>
            <div class=" flex items-center gap-2 ">
                <h1>No of Pax :</h1>
                <h1>${numberOfPax}</h1>
            </div>
            <div class=" flex items-center gap-2 ">
                <h1>Confirmed by :</h1>
                <h1>${confirmedBy}</h1>
            </div>
        </div>
       
        </div>
        <hr class=" w-full mt-3 border-1 border-gray-400">
        <div class=" flex items-center justify-between mt-3">
            <div class=" flex flex-col">
                <div class=" flex items-center gap-2">
                    <h1>Guest Name :</h1>
                    <h1>${guestName}</h1>
                </div>
                <div class=" flex items-center gap-2">
                    <h1>Contact No :</h1>
                    <h1>${guestNumber}</h1>
                </div>
            </div>
            <div class=" flex flex-col ">
                <div class=" flex items-center gap-2">
                    <h1>Travel Date :</h1>
                    <h1>${travelDate}</h1>
                </div>
                <div class=" flex items-center gap-2">
                    <h1>Duration :</h1>
                    <h1>${duration}</h1>
                </div>
            </div>
        </div>
        <hr class=" w-full mt-3 border-1 border-black">

      </div>
      <div class="mt-2 px-5 w-full ">
        <table class="w-full rounded-md text-sm	">
            <tr class=" border border-1 border-black rounded">

            
          <tr class="border border-1 border-black rounded-md text-sm	">
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">Day</th>
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black"> date </th>
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">tour program</th>
          </tr>
          ${tourTableHTML}
           
      
         
         
      </div>
      
       
        </table>
      </div>
      <div class=" mt-5 px-5">
        <div class=" w-full h-12 bg-blue-500 text-white flex items-center justify-center">
            <h1 class=" uppercase text-lg font-semibold">Accommodation details</h1>
        </div>


        <table class="w-full mt-1 text-sm	">
        <tr>
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">check in</th>
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">check out</th>
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">hotel</th>
            <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">address</th>
        </tr>


        ${duplicatedRowsHTML}

        
       
    </table>
      



      </div>
      <div class=" mt-5 px-5">
        <div class=" flex flex-col">
        <div class=" flex gap-2 items-center">
        <h1 class=" flex flex-shrink-0">Notes :</h1>
        <h1 class="whitespace-pre-line" >${notes}</h1>
    </div>
            <div class=" flex gap-2 items-center">
                <h1>Tour Manager :</h1>
                <h1>${TourManager}</h1>
            </div>
            <div class=" flex gap-2 items-center">
                <h1>Contact No :</h1>
                <h1>${Contantno}</h1>
            </div>
        </div>
      </div>
      <div class="mt-10 w-full h-12 bg-blue-500 px-5 flex items-center">
        <div class="flex flex-col text-white text-xs">
          <div class="flex gap-1 items-center">
            <img src="" alt="" />
            <h1>Info@trekkandtravel.com</h1>
            </div>
            <div class="flex gap-1 items-center">
              <img src="" alt="" />
              <h1>Address: Kattuppara, Bridge Junction, Chelakkad Po, Malappuram, Kerala , India- 679323</h1>
          </div>
        </div>
      </div>
    </div>
  </body>
 
  
</div>

 
 
`);


// Close the document stream
printWindow.document.close();
 
// Print the page
setTimeout(() => {
    printWindow.print();
}, 500);
}



 

function getTourTableContent() {
    // You can adapt this function based on your actual data structure
    const tourTableData = /* Fetch your tour table data from the database or elsewhere */ [];

    return tourTableData.map(tour => `
        <tr class="border border-1 border-black rounded-md">
            <td class="  border border-1 border-black text-center px-2 py-1">${tour.day}</td>
            <td class="  border border-1 border-black text-center px-2 py-1">${tour.date}</td>
            <td class="  border border-1 border-black text-center px-2 py-1">${tour.tourProgram}</td>
        </tr>
    `).join('');
}

    
    // Function to get the value of an element by ID
    
});
 
document.getElementById('save').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    saveFormData(); // Call your function to save form data
});


function getValueById(id) {
    const inputElement = document.getElementById(id);
    return inputElement ? inputElement.value : '';
}
 

// Function to save form data to Firebase
  function saveFormData() { 
  
    // // Retrieve form data
    const voucherNo = getValueById("voucherNo");
    const confirmationNo = getValueById("ConfirmationNo");
    const transport = getValueById("transport");
    const numberOfVehicles = getValueById("numVehicles");
    const numberOfPax = getValueById("numPax");
    const confirmedBy = getValueById("confirmedBy");
    const arrival = getValueById("arrival");
    const departure = getValueById("departure");
    const travelDate = getValueById("travelDate");
    const duration = getValueById("duration");
    const driver = getValueById("driver");
    const vehicleNo = getValueById("Vehicleno");
    const guestName = getValueById("guestName");
    const guestNumber = getValueById("guestNumber");
    const TourManagerr = getValueById("TourManager");
    const  Contantno  = getValueById("Contant-no");
    const  notes  = getValueById("notes");

 
   // Get data from the tour table
   const tourTableData = getTourTableData();
 // Get data from the duplicated rows
  const duplicatedRowsData = getDuplicatedRowsData();
        // Generate a new Tour ID with increment
 
    // Save the form data to the Firebase database
    const formData = {
        voucherNo,
        confirmationNo,
        transport,
        numberOfVehicles,
        numberOfPax,
        confirmedBy,
        arrival,
        departure,
        travelDate,
        duration,
        driver,
        vehicleNo,
        guestName,
        guestNumber,
        TourManagerr,
        Contantno,
        tourTable: tourTableData, 
        duplicatedRows: duplicatedRowsData, // Add a new field for duplicated rows
        notes: notes,
        // Add other form fields as needed
    };

    // Assuming you have a 'forms' node in your database to store form data
     

    // Update the voucherNo field
 
    push(formsRef, formData)
        .then(() => {
            // Alert for successful save
            alert("Form data savedd successfully!");
        })
        .catch((error) => {
            // Handle errors if the save operation fails
            console.error("Error saving form data:", error);
            alert("Error saving form data. Please try again.");
        });
    // Push the form data to the 'forms' node
    
}
 
// Function to get data from the tour program table
// function getTourProgramTableData() {
//     const tourProgramTable = document.getElementById("tourProgramTable");
//     const rows = tourProgramTable.querySelectorAll('.input-row');
//     const tourProgramTableData = [];

//     // Iterate through rows and extract data
//     rows.forEach((row) => {
//         const cells = row.getElementsByTagName("td");

//         // Create an object to store data for each row
//         const rowData = {};

//         // Iterate through cells in the current row
//         for (let j = 0; j < cells.length; j++) {
//             const input = cells[j].querySelector("input");

//             if (input) {
//                 const fieldName = input.getAttribute("name");
//                 const value = input.value;

//                 // Add the field and value to the rowData object
//                 rowData[fieldName] = value;
//             }
//         }

//         // Push data of the current row to the array
//         tourProgramTableData.push(rowData);
//     });

//     return tourProgramTableData;
// }



   // Function to get data from the tour table/////////////////////////////////////////////////////////////////
   function getTourTableData() {
    const tourTable = document.getElementById("tourTable");
    const rows = tourTable.getElementsByTagName("tr");
    const tourTableData = [];

    // Iterate through rows and extract data
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
        const cells = rows[i].getElementsByTagName("td");
        const day = cells[0].querySelector("input").value;
        const date = cells[1].querySelector("input[type='date']").value;
        const tourProgram = cells[2].querySelector("input").value;

        // Push data to the array
        tourTableData.push({ day, date, tourProgram });
    }

    return tourTableData;
}

 ////////////////////////////////////////////////////////////////////////
// Function to get data from the duplicated rows
function getDuplicatedRowsData() {
    const container = document.getElementById("inputContainer");
    const duplicatedRowsData = [];

    // Iterate through duplicated rows and extract data
    const duplicatedRows = container.querySelectorAll('.input-row:not(:first-child)'); // Skip the original row
    duplicatedRows.forEach((duplicatedRow) => {
        const cells = duplicatedRow.getElementsByTagName("td");
        const rowData = {};

        for (let j = 0; j < cells.length; j++) {
            const input = cells[j].querySelector("input");

            if (input) {
                const fieldName = input.getAttribute("name");
                const value = input.value;

                rowData[fieldName] = value;
            }
        }

        duplicatedRowsData.push(rowData);
    });

    return duplicatedRowsData;
}
 ////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////VOUCHER ID GENERATION ///////////////////
////////////////////////////////////////////
const submitButton = document.getElementById("save");
const voucherIdInput = document.getElementById("voucherNo");

submitButton.addEventListener("click", async function (event) {
  event.preventDefault();

  // Retrieve the current voucher ID from the database
  const transportVoucherIdRef = ref(database, "transportvoucherId");
  const transportVoucherIdSnapshot = await get(transportVoucherIdRef);
  const transportVoucherId = transportVoucherIdSnapshot.val() || 0;

  // Increment the voucher ID
  const newVoucherId = transportVoucherId + 1;

  // Update the database with the new voucher ID
  await set(transportVoucherIdRef, newVoucherId);

  // Display the updated voucher ID in the input field
  voucherIdInput.value = `IB-TRKKTRVL  ${newVoucherId.toString().padStart(3, '0')}`;
});
 

 
window.onload = async function () {
    // Retrieve the current voucher ID from the database
    const transportVoucherIdRef = ref(database, "transportvoucherId");
    const transportVoucherIdSnapshot = await get(transportVoucherIdRef);
    const transportVoucherId = transportVoucherIdSnapshot.val() || 0;
  
    // Display the current voucher ID in the input field
    voucherIdInput.value = `IB-TRKKTRVL ${transportVoucherId.toString().padStart(3, '0')}`;
  };
  
 ////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


















 





 ////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////






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

document.addEventListener('DOMContentLoaded', function () {

    function handleEnter(event, nextFieldId) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById(nextFieldId).focus();
        }
    }
  
    // Add event listeners for keydown events on input fields
    document.getElementById('ConfirmationNo').addEventListener('keydown', function (event) {
        handleEnter(event, 'transport');
    });
  
    document.getElementById('transport').addEventListener('keydown', function (event) {
        handleEnter(event, 'numVehicles');
    });
  

    document.getElementById('numVehicles').addEventListener('keydown', function (event) {
        handleEnter(event, 'numPax');
    });
  
    document.getElementById('numPax').addEventListener('keydown', function (event) {
        handleEnter(event, 'confirmedBy');
    });
  
    document.getElementById('confirmedBy').addEventListener('keydown', function (event) {
        handleEnter(event, 'arrival');
    });

    document.getElementById('arrival').addEventListener('keydown', function (event) {
        handleEnter(event, 'departure');
    });
    

    document.getElementById('departure').addEventListener('keydown', function (event) {
        handleEnter(event, 'travelDate');
    });
 
    document.getElementById('travelDate').addEventListener('keydown', function (event) {
        handleEnter(event, 'duration');
    });
 
    document.getElementById('duration').addEventListener('keydown', function (event) {
        handleEnter(event, 'driver');
    });
     

    document.getElementById('driver').addEventListener('keydown', function (event) {
        handleEnter(event, 'Vehicleno');
    });

    document.getElementById('Vehicleno').addEventListener('keydown', function (event) {
        handleEnter(event, 'guestName');
    });

    document.getElementById('guestName').addEventListener('keydown', function (event) {
        handleEnter(event, 'guestNumber');
    });
    document.getElementById('guestNumber').addEventListener('keydown', function (event) {
        handleEnter(event, 'checkIn');
    });

    document.getElementById('checkIn').addEventListener('keydown', function (event) {
        handleEnter(event, 'checkOut');
    });


    document.getElementById('checkOut').addEventListener('keydown', function (event) {
        handleEnter(event, 'hotel');
    });



    document.getElementById('hotel').addEventListener('keydown', function (event) {
        handleEnter(event, 'hotelladdresss');
    });



    document.getElementById('notes').addEventListener('keydown', function (event) {
        handleEnter(event, 'TourManager');
    });


    document.getElementById('TourManager').addEventListener('keydown', function (event) {
        handleEnter(event, 'Contant-no');
    });

  });
