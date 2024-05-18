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
// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

// Reference to the TransportVoucher node in your database
const transportVoucherRef = ref(database, 'TransportVoucher');

// Reference to the HTML input and div
const voucherInput = document.getElementById('VoucherNo');
const voucherIdListDiv = document.getElementById('VoucherIdlist');
const databaseNodeId = document.getElementById('databasenodeId');
const confirmationNoInput = document.getElementById('ConfirmationNo');
const transportInput = document.getElementById('transport');
const numVehiclesInput = document.getElementById('numVehicles');
const numPaxInput = document.getElementById('numPax');
const confirmedByInput = document.getElementById('confirmedBy');
const arrivalInput = document.getElementById('arrival');
const departureInput = document.getElementById('departure');
const travelDateInput = document.getElementById('travelDate');
const durationInput = document.getElementById('duration');
const driverInput = document.getElementById('driver');
const vehicleNoInput = document.getElementById('vehicleNo');
const guestNameInput = document.getElementById('guestName');
const guestNumberInput = document.getElementById('guestNumber');
const voucherNumInput = document.getElementById('voucherNum');
const TourManagerInput = document.getElementById('TourManager');
const ContantnoInput = document.getElementById('Contant-no');




const tourTableBody = document.getElementById('tourTableBody');

// Reference to the new table body
const duplicatedRowsBody = document.getElementById('duplicatedRowsBody');


 

// Listen for input changes on the voucher input
voucherInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();

  // Listen for changes in the TransportVoucher node
  onValue(transportVoucherRef, (snapshot) => {
    const transportVoucherData = snapshot.val();

    // Check if the data exists
    if (transportVoucherData) {
      // Filter voucher numbers based on the search term
      const filteredVoucherNumbers = Object.values(transportVoucherData)
        .filter(parent => parent.voucherNo.toLowerCase().includes(searchTerm))
        .map(parent => parent.voucherNo);

      // Display filtered voucher numbers in the HTML div
      voucherIdListDiv.innerHTML = `${filteredVoucherNumbers.map(voucherNo => `<h6 class="cursor-pointer">${voucherNo}</h6>`).join('')}`;

      // Add click event listener to each list item
      const listItems = voucherIdListDiv.querySelectorAll('h6');
      listItems.forEach(item => {
        item.addEventListener('click', () => {
          // Set the selected voucher number to the input field
          voucherInput.value = item.textContent;

          // Fetch the corresponding unique key from the database
          const uniqueKey = Object.keys(transportVoucherData).find(key => transportVoucherData[key].voucherNo === item.textContent);

         


          // Display the unique key in the HTML h1
          databaseNodeId.textContent = uniqueKey ? `Unique Key: ${uniqueKey}` : 'Unique Key not available';

          // Auto-fill ConfirmationNo from the database
          if (uniqueKey) {
            confirmationNoInput.value = transportVoucherData[uniqueKey]?.confirmationNo || '';
            transportInput.value = transportVoucherData[uniqueKey]?.transport || '';
            numVehiclesInput.value = transportVoucherData[uniqueKey]?.numVehicles || 0;
            numPaxInput.value = transportVoucherData[uniqueKey]?.numPax || 0;
            confirmedByInput.value = transportVoucherData[uniqueKey]?.confirmedBy || '';
            arrivalInput.value = transportVoucherData[uniqueKey]?.arrival || '';
            departureInput.value = transportVoucherData[uniqueKey]?.departure || '';
            travelDateInput.value = transportVoucherData[uniqueKey]?.travelDate || '';
            durationInput.value = transportVoucherData[uniqueKey]?.duration || '';
            driverInput.value = transportVoucherData[uniqueKey]?.driver || '';
            vehicleNoInput.value = transportVoucherData[uniqueKey]?.vehicleNo || '';
            guestNameInput.value = transportVoucherData[uniqueKey]?.guestName || '';
            guestNumberInput.value = transportVoucherData[uniqueKey]?.guestNumber || '';
            // voucherNumInput.value = transportVoucherData[uniqueKey]?.voucherNo || '';

            TourManagerInput.value = transportVoucherData[uniqueKey]?.TourManagerr || '';
            ContantnoInput.value = transportVoucherData[uniqueKey]?.Contantno || '';

             





             // Fetch and display tour table data
        const tourTableData = transportVoucherData[uniqueKey]?.tourTable || [];

        // Clear existing table rows
        tourTableBody.innerHTML = '';

        // Populate the table with fetched data
        tourTableData.forEach((tour) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${tour.day}</td><td>${tour.date}</td><td>${tour.tourProgram}</td>`;
            tourTableBody.appendChild(row);
        });





        const duplicatedRowsData = transportVoucherData[uniqueKey]?.duplicatedRows || [];

        // Clear existing table rows
        duplicatedRowsBody.innerHTML = '';

        // Populate the table with fetched data
        duplicatedRowsData.forEach((row) => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td>${row.checkIn}</td><td>${row.checkOut}</td><td>${row.hotel}</td><td>${row.hotelAddress}</td>`;
            duplicatedRowsBody.appendChild(tableRow);
        });














          }

          // Hide the VoucherIdlist div
          voucherIdListDiv.style.display = 'none';
        });
      });

      // Show the VoucherIdlist div if there are matching voucher numbers
      voucherIdListDiv.style.display = filteredVoucherNumbers.length > 0 ? 'block' : 'none';
    } else {
      // Handle the case when there is no data
      voucherIdListDiv.innerHTML = 'No voucher numbers available.';
    }
  }, (error) => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
});











// ... (Existing code)

// Reference to the HTML elements
// ... (Existing code)

// Reference to the print button
const printButton = document.getElementById('printButton');

// Listen for click events on the print button
printButton.addEventListener('click', () => {
    // Open a new tab for printing
    const printWindow = window.open('', '_blank');

    // Write the content you want to print to the new tab
    printWindow.document.write(`

    <html>
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


    <body class="">

    <div class="w-full h-screen">
      <div
        class="w-full bg-blue-500 h-24 flex items-center justify-between pl-5 bg-cover"
        style="background-image: url(/assets/imgs/Rectangle1.png)"
      >
        <div class="flex flex-col text-white">
          <h1 class="font-bold text-xl">Transport Voucher</h1>
          <h1 class="text-sm font-light">
            confirmation No: <span>${confirmationNoInput.value}</span>
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
                <h1>${arrivalInput.value}</h1>
            </div>
            <div class=" border border-1 border-black px-2 py-1 flex gap-2 items-center rounded-lg w-auto">
                <h1 class=" text-xl font-semibold">Departure :</h1>
                <h1> ${departureInput.value}</h1>
            </div>
            <div class="  ">
            <h1>Driver :<span> ${driverInput.value}</span> </h1>
            <h1>Vehicle no: <span> ${vehicleNoInput.value}</span></h1>
        </div>
        </div>

        <div class=" flex flex-col">
        <div class=" flex items-center gap-2 ">
            <h1>Voucher No :</h1>
            <h1>${voucherInput.value}</h1>
        </div>
        <div class=" flex items-center gap-2 ">
            <h1>Transport :</h1>
            <h1>${transportInput.value}</h1>
        </div>
        <div class=" flex items-center gap-2 ">
            <h1>No of vehicles :</h1>
            <h1>${numVehiclesInput.value}</h1>
        </div>
        <div class=" flex items-center gap-2 ">
            <h1>No of Pax :</h1>
            <h1>${numPaxInput.value}</h1>
        </div>
        <div class=" flex items-center gap-2 ">
            <h1>Confirmed by :</h1>
            <h1>${confirmedByInput.value}</h1>
        </div>
    </div>
    </div>
        <hr class=" w-full mt-3 border-1 border-gray-400">

        <div class=" flex items-center justify-between mt-3">
        <div class=" flex flex-col">
            <div class=" flex items-center gap-2">
                <h1>Guest Name :</h1>
                <h1>${guestNameInput.value}</h1>
            </div>
            <div class=" flex items-center gap-2">
                <h1>Contact No :</h1>
                <h1>${guestNumberInput.value}</h1>
            </div>
        </div>
        <div class=" flex flex-col ">
        <div class=" flex items-center gap-2">
            <h1>Travel Date :</h1>
            <h1>${travelDateInput.value}</h1>
        </div>
        <div class=" flex items-center gap-2">
            <h1>Duration :</h1>
            <h1>${durationInput.value}</h1>
        </div>
    </div>
</div>
<hr class=" w-full mt-3 border-1 border-black">

</div>
<div class="mt-2 px-5 w-full ">
  <table class="w-full rounded-md">
      <tr class=" border border-1 border-black rounded">

      
    <tr class="border border-1 border-black rounded-md">
      <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">Day</th>
      <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black"> date </th>
      <th class="uppercase text-lg font-semibold bg-yellow-400 text-black border border-1 border-black">tour program</th>
    </tr>
    <tbody id="tourTableBody">
    <!-- Populate the table with fetched data -->
    ${getPrintableTableContent('tourTableBody')}
</tbody>
</table>
</div>
<div class=" mt-5 px-5">
  <div class=" w-full h-12 bg-blue-500 text-white flex items-center justify-center">
      <h1 class=" uppercase text-lg font-semibold">acommadation details</h1>
  </div>

  <table class="w-full mt-8">
  <thead>
      <tr>
          <th class="uppercase border border-1 border-black text-center px-2 py-1">Check-In</th>
          <th class="uppercase border border-1 border-black text-center px-2 py-1">Check-Out</th>
          <th class="uppercase border border-1 border-black text-center px-2 py-1">Hotel</th>
          <th class="uppercase border border-1 border-black text-center px-2 py-1">Hotel Address</th>
      </tr>
  </thead>
  <tbody id="duplicatedRowsBody">
      <!-- Populate the table with fetched data -->
      ${getPrintableTableContent('duplicatedRowsBody')}
  </tbody>
</table>
</div>
<div class=" mt-5 px-5">
  <div class=" flex flex-col">
      <div class=" flex gap-2 items-center">
          <h1>Tour Manager :</h1>
          <h1>${TourManagerInput.value}</h1>
      </div>
      <div class=" flex gap-2 items-center">
          <h1>Contact No :</h1>
          <h1>${ContantnoInput.value}</h1>
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
 
</html>
     
   
    `);

      // Close the document for writing
      printWindow.document.close();
                  printWindow.print();


      // Listen for the onload event to ensure content is fully loaded before printing
      // Print the page
setTimeout(() => {
    printWindow.print();
}, 500);
  });
// Function to generate printable table content with specified class
// Function to generate printable table content with specified class
function getPrintableTableContent(tableId) {
  const tableBody = document.getElementById(tableId);
  const rows = tableBody.querySelectorAll('tr');

  let printableContent = '';
  rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      printableContent += `<tr>${Array.from(cells).map(cell => `<td class="uppercase border border-1 border-black text-center px-2 py-1">${cell.innerHTML}</td>`).join('')}</tr>`;
  });

  return printableContent;
}












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
