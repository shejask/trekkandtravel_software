// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, query, get, onValue, orderByKey } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

 

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
 
 

const tourIdInput = document.getElementById('tourId');
const allTourIdDiv = document.getElementById('alltourid');
const traveldateInput = document.getElementById('traveldate'); // Define traveldateInput

tourIdInput.addEventListener('input', async function () {
    const searchText = tourIdInput.value.trim();

    // Clear previous results
    allTourIdDiv.innerHTML = '';

    if (searchText !== '') {
        // Query the database for matching tour IDs
        const tourIdsQuery = query(ref(database, 'itinerary'), orderByKey());

        // Get the data from the query
        const snapshot = await get(tourIdsQuery);

        // Iterate over the results and display them
        if (snapshot.exists()) {
            snapshot.forEach((uniqueIdSnapshot) => {
                const tourIdValue = uniqueIdSnapshot.child('tourId').val();

                // Check if the tour ID matches the search text
                if (tourIdValue && tourIdValue.includes(searchText)) {
                    const tourIdElement = document.createElement('div');
                    tourIdElement.textContent = tourIdValue;
                    allTourIdDiv.appendChild(tourIdElement);
                }
            });
        } else {
            allTourIdDiv.textContent = 'No matching tour IDs found.';
        }
    }
});

 





allTourIdDiv.addEventListener('click', async function (event) {
  const selectedTourId = event.target.textContent;
  tourIdInput.value = selectedTourId;

  const queryRef = query(ref(database, 'itinerary'), orderByKey());
  const snapshot = await get(queryRef);

  if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
          const { tourId, travelDate, guestName, guestNumber, arrivalDetails, departureDetails, numberOfPax, packagename,amountdetails,anytextdescription,applicabletaxes,customersupport,
            driverallowances,duration,fieldfive,fieldfour,fieldone,fieldthree,fieldtwo,govttaxes, night,notesinput,personalnature,tourcontact,tourexecutive,tourmail,
            transferssightseeing,heading,description,cancellationNotes,notes,tourexclusions,tourHighlights,inclusions,tableData,formContainers,formData,

          } = childSnapshot.val();

          
          if (tourId === selectedTourId) {
              traveldateInput.value = travelDate || '';
              document.getElementById('guestName').value = guestName || '';
              document.getElementById('guestNumber').value = guestNumber || '';
              document.getElementById('arrival-details').value = arrivalDetails || '';
              document.getElementById('departure-details').value = departureDetails || '';
              document.getElementById('number-of-pax').value = numberOfPax || '';
              document.getElementById('packageNamee').value = packagename || '';
              document.getElementById('anytext-description').value = anytextdescription || '';
              document.getElementById('headingg').value = heading || '';            
              document.getElementById('descriptionn').value = description || '';
              document.getElementById('duration').value = duration  || '';
              document.getElementById('night').value = night  || '';
              document.getElementById('amount-details').value = amountdetails  || '';
              document.getElementById('personal-nature').value = personalnature  || '';
              document.getElementById('applicable-taxes').value = applicabletaxes  || '';
              document.getElementById('transfers-sightseeing').value = transferssightseeing  || '';
              document.getElementById('driver-allowances').value =  driverallowances  || '';
              document.getElementById('govt-taxes').value = govttaxes  || '';
              document.getElementById('customer-support').value = customersupport  || '';
              document.getElementById('field-one').value =  fieldone  || '';
              document.getElementById('field-two').value = fieldtwo  || '';
              document.getElementById('field-three').value = fieldthree  || '';
              document.getElementById('field-four').value = fieldfour  || '';
              document.getElementById('field-five').value = fieldfive  || '';
              document.getElementById('notes').value = notesinput  || '';
              document.getElementById('tour-executive').value = tourexecutive  || '';
              document.getElementById('tour-contact').value = tourcontact  || '';
              document.getElementById('tour-mail').value = tourmail  || '';





 
       // Display each index of tourHighlights in separate input fields
       const tourHighlightsInputsContainer = document.getElementById('tourHighlightsInputsContainer');
       tourHighlightsInputsContainer.innerHTML = ''; // Clear previous content

       if (Array.isArray(tourHighlights)) {
           tourHighlights.forEach((highlight, index) => {
               const inputField = document.createElement('input');
               inputField.type = 'text';
               inputField.value = highlight;
               inputField.classList.add('w-full', 'p-2', 'border', 'mb-5', 'rounded', 'border-slate-700');
               inputField.readOnly = true;

               // Append each input field to the container
               tourHighlightsInputsContainer.appendChild(inputField);
           });
       }

       // Display tourHighlights in a div
       const tourHighlightsDiv = document.getElementById('tourHighlightsDiv');
       if (tourHighlightsDiv) {
           tourHighlightsDiv.textContent = Array.isArray(tourHighlights) ? tourHighlights.join(', ') : '';
       } else {
           console.warn('tourHighlightsDiv is null');
       }

/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// ... (previous code)

// ... (previous code)

// Check if formData is defined and is an object
// Check if formData is defined and is an object

// Check if formData is defined and is an object
// Check if formData is defined and is an object

// Check if formData is defined and is an object

// Check if formData is defined and is an object
 
// ... (remaining code)


// Check if formData is defined and is an object
 
// Check if formData is defined and is an object
if (formData && typeof formData === 'object' && !Array.isArray(formData)) {
  const formDataInputsContainer = document.getElementById('formDataInputsContainer');
  formDataInputsContainer.innerHTML = ''; // Clear previous content

  // Check if 'options' exists in formData
  if (formData.options && typeof formData.options === 'object' && !Array.isArray(formData.options)) {
    // Iterate over options in formData.options and display them
    Object.keys(formData.options).forEach((optionKey) => {
      const option = formData.options[optionKey];

      // Check if the option has required properties
      if (option && option.amount && option.title) {
        // Display "Title" in an h1 tag
        const titleElement = document.createElement('h1');
        titleElement.textContent = option.title;

        // Display "Amount" label
        const amountLabel = document.createElement('label');
        amountLabel.textContent = 'Amount';

        // Display "Amount" in an input field
        const amountInputField = document.createElement('input');
        amountInputField.type = 'text';
        amountInputField.value = option.amount;
        amountInputField.classList.add('w-full', 'p-2', 'mb-3', 'border', 'rounded', 'border-slate-700');
        amountInputField.readOnly = true;

        // Display "accommodationDetails" as a table
        if (option.accommodationDetails && Array.isArray(option.accommodationDetails)) {
          const accommodationTable = document.createElement('table');
          accommodationTable.classList.add('w-full', 'border', 'border-collapse', 'mb-4');

          // Create table rows
          option.accommodationDetails.forEach((item, rowIndex) => {
            const row = document.createElement('tr');
            for (const key in item) {
              const cell = document.createElement('td');
              cell.textContent = item[key];

              // Only add the header row if it's the first row
              if (rowIndex === 0) {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerCell.classList.add('p-2', 'border', 'border-slate-700');
                accommodationTable.appendChild(headerCell);
              }

              cell.classList.add('p-2', 'border', 'border-slate-700');
              row.appendChild(cell);
            }
            accommodationTable.appendChild(row);
          });

          // Append the table to the container
          formDataInputsContainer.appendChild(titleElement);
          formDataInputsContainer.appendChild(amountLabel);
          formDataInputsContainer.appendChild(amountInputField);
          formDataInputsContainer.appendChild(accommodationTable);
        } else {
          console.warn(`Invalid structure for accommodationDetails in formData option: ${optionKey}`);
        }
      } else {
        console.warn(`Invalid structure for formData option: ${optionKey}`);
      }
    });
  } else {
    console.warn('Invalid structure for formData.options');
  }
} else {
  console.warn('formData is not an object or is not defined.');
}


// ... (remaining code)

 
 
/////////////////////////////////////////////////////////////////////////////////

// Assuming formContainers is an array inside the database snapshot
// ... (previous code)

// ... (previous code)

// ... (previous code)

// ... (previous code)
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
// ... (previous code)
// ... (previous code)
if (Array.isArray(formContainers)) {
  formContainersDiv.innerHTML = ''; // Clear previous content

  formContainers.forEach((container) => {
    const { date, dayNumber, descriptionDetails, heading, inclusions, fileUrl } = container;

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('form-container');

    containerDiv.innerHTML = `

     
    <label   class="block">Day No :</label>
    <input type="text" value="${dayNumber}" name="dayNumber" min="1" class="w-full p-2 border rounded border border-slate-700">

    <label   class="block">Date :</label>
    <input type="text" value="${formatDate(date)}" name="date" min="1" class="w-full p-2 border rounded border border-slate-700">

    
    <label   class="block">Heading :</label>
    <input type="text" value="${heading}" min="1" name="heading"  class="w-full p-2 border rounded border border-slate-700">

    
    <label   class="block">Description :</label>
    <input type="text" value="${descriptionDetails}" name="descriptionDetails" min="1" class="w-full mB-5 p-2 border rounded border border-slate-700">

     
     
    <img width="70" class="mt-5" name="fileUrl"  src="${fileUrl} "  alt=""
    />
   
     `;

    if (inclusions) {
      if (Array.isArray(inclusions)) {
        containerDiv.innerHTML += `<p>Inclusions: ${inclusions.join(', ')}</p>`;
      } else if (typeof inclusions === 'string') {
        containerDiv.innerHTML += `<label   class="block">Inclusion :</label> <input name="inclusions" type="text" value="${inclusions}" min="1" class="w-full mB-5 p-2 border rounded border border-slate-700">`;
      } else {
        console.warn('Inclusions is not an array or string:', inclusions);
      }
    }

    // if (fileUrl) {
    //   containerDiv.innerHTML += ` `;

    //   // Check if fileUrl is a string
    //   if (typeof fileUrl === 'string') {
    //     const imageElement = document.createElement('img');
    //     imageElement.src = fileUrl;
    //     imageElement.style.width = '100px'; // Set the width to 100 pixels
    //     imageElement.setAttribute('name', fileUrl); // Set the name attribute to the value of fileUrl


    //     containerDiv.appendChild(imageElement);
    //   } else {
    //     console.warn('File URL is not a string:', fileUrl);
    //   }
    // } else {
    //   console.warn('File URL is not defined for this container:', container);
    // }

    formContainersDiv.appendChild(containerDiv);
  });
} else {
  console.warn('formContainers is not an array or is not defined');
}


// ... (remaining code)

// ... (remaining code)

// ... (remaining code)

// ... (remaining code)

// ... (remaining code)

// ... (remaining code)

       ////////////////////////////////////////////////////////////////////////
  // Display each index of inclusions in separate input fields
  // Display tourHighlights in a div
 
  if (tourHighlightsDiv) {
      tourHighlightsDiv.textContent = Array.isArray(tourHighlights) ? tourHighlights.join(', ') : '';
  } else {
      console.warn('tourHighlightsDiv is null');
  }

  // Display each index of inclusions in separate input fields
  const inclusionsInputsContainer = document.getElementById('inclusionsInputsContainer');
  inclusionsInputsContainer.innerHTML = ''; // Clear previous content

  if (Array.isArray(inclusions)) {
      inclusions.forEach((inclusion, index) => {
          const inputField = document.createElement('input');
          inputField.type = 'text';
          inputField.value = inclusion;
          inputField.classList.add('w-full', 'p-2', 'mb-3', 'border', 'rounded', 'border-slate-700');
          inputField.readOnly = true;

          // Append each input field to the container
          inclusionsInputsContainer.appendChild(inputField);
      });
  } else {
      console.warn('inclusions is not an array or is not defined');
  }

  // Display inclusions in a div
  const inclusionsDiv = document.getElementById('inclusionsDiv');
  if (inclusionsDiv) {
      inclusionsDiv.textContent = Array.isArray(inclusions) ? inclusions.join(', ') : '';
  } else {
      console.warn('inclusionsDiv is null');
  }


/////////////////////////////////////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////////////
// Display each index of tourExclusions in separate input fields
const exclusionsInputsContainer = document.getElementById('tourExclusionsInputsContainer');
exclusionsInputsContainer.innerHTML = ''; // Clear previous content

if (Array.isArray(tourexclusions)) {
    tourexclusions.forEach((tourexclusions, index) => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = tourexclusions;
        inputField.classList.add('w-full', 'p-2', 'mb-3', 'border', 'rounded', 'border-slate-700');
        inputField.readOnly = true;

        // Append each input field to the container
        tourExclusionsInputsContainer.appendChild(inputField);
    });
} else {
    console.warn('inclusions is not an array or is not defined');
}

// Display inclusions in a div
// const tourExclusionsDiv = document.getElementById('tourExclusionsDiv');
// if (tourExclusionsDiv) {
//     tourExclusionsDiv.textContent = Array.isArray(tourexclusions) ? tourexclusions.join(', ') : '';
// } else {
//     console.warn('exclusionsDiv is null');
// }


       ///////////////////////////////////////////////////////////////////
       
        ///////////////////////////////////////////////////////////////////


// Display each index of tourExclusions in separate input fields
const notesContainer = document.getElementById('notesContainer');
notesContainer.innerHTML = ''; // Clear previous content

if (Array.isArray(notes)) {
    notes.forEach((notes, index) => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = notes;
        inputField.classList.add('w-full','mb-5', 'p-2', 'mb-3', 'border', 'rounded', 'border-slate-700');
     

        // Append each input field to the container
        notesContainer.appendChild(inputField);
    });
} else {
    console.warn('inclusions is not an array or is not defined');
}

        
       ///////////////////////////////////////////////////////////////////
       
// Display each index of Tabledata in separate input fields
const tableDataInputsContainer = document.getElementById('tableDataInputsContainer');
if (tableDataInputsContainer) {
    tableDataInputsContainer.innerHTML = ''; // Clear previous content

    if (Array.isArray(tableData) && tableData.length > 0) {
        const table = document.createElement('table');
        table.classList.add('w-full', 'border', 'border-collapse', 'mb-4');

        // Create table header
        const headerRow = document.createElement('tr');
        for (const key in tableData[0]) {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerCell.classList.add('p-2', 'border', 'border-slate-700');
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Create table rows
        tableData.forEach((item) => {
            const row = document.createElement('tr');
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                cell.classList.add('p-2', 'border', 'border-slate-700');
                row.appendChild(cell);
            }
            table.appendChild(row);
        });

        // Append the table to the container
        tableDataInputsContainer.appendChild(table);
    } else {
        console.warn('Tabledata is not an array or is empty. Actual value:', tableData);
    }
} else {
    console.warn('tableDataInputsContainer is null');
}
/////////////////////////////////////////////////////////////////////////////////
const cancellationContainer = document.getElementById('cancellationContainerr');
cancellationContainer.innerHTML = ''; // Clear previous content

if (Array.isArray(cancellationNotes)) {
    cancellationNotes.forEach((cancellationNotes, index) => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = cancellationNotes;
        inputField.classList.add('w-full', 'p-2', 'mb-3', 'border', 'rounded', 'border-slate-700');
        inputField.readOnly = true;

        // Append each input field to the container
        cancellationContainer.appendChild(inputField);
    });
} else {
    console.warn('cancellationContainer is not an array or is not defined');
}


              allTourIdDiv.style.display = 'none';
          }
      });
  } else {
      console.warn('Selected tour ID not found in the database.');
  }
});





 ///////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////
 
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
document.getElementById("printButton").addEventListener("click", function () {
    printForm();
  });
  
  // Function to print the form
  function printForm() {
 
    // Get values from form elements
    const tourId = document.getElementById("tourId").value;
    const travelDate = document.getElementById("traveldate").value;
    const guestname = document.getElementById("guestName").value;
    const guestnumber = document.getElementById("guestNumber").value;
    const arrivalDetails = document.getElementById("arrival-details").value;
    const departureDetails = document.getElementById("departure-details").value;
    const numberOfPax = document.getElementById("number-of-pax").value;
   
    const heading = document.getElementById("headingg").value;
    const headingdescription = document.getElementById("anytext-description").value;

    const packagename = document.getElementById("packageNamee").value;
    const packagedescription = document.getElementById("descriptionn").value;

    const numofdays = document.getElementById("duration").value;
    const numofnights = document.getElementById("night").value;
  
    const amount = document.getElementById("amount-details").value;

    

    const fieldone = document.getElementById("field-one").value;
    const fieldtwo = document.getElementById("field-two").value;
    const fieldthree = document.getElementById("field-three").value;
    const fieldfour = document.getElementById("field-four").value;
    const fieldfive = document.getElementById("field-five").value;


    
    const notes = document.getElementById("notes").value;
  

    const amountExecutive = document.getElementById("tour-executive").value;
    const tourcontact = document.getElementById("tour-contact").value;
    const tourmail = document.getElementById("tour-mail").value;
  
       
    // Get values from Tour Inclusions
    const personalNature = document.getElementById("personal-nature").value;
    const applicableTaxes = document.getElementById("applicable-taxes").value;
    const transfersSightseeing = document.getElementById("transfers-sightseeing").value;
    const driverAllowances = document.getElementById("driver-allowances").value;
    const govtTaxes = document.getElementById("govt-taxes").value;
  

 













// Get values from Inclusions
const inclusionsValues = Array.from(
  document.querySelectorAll("#inclusionsInputsContainer input")
)
  .map((input) => input.value.trim())
  .filter((value) => value !== "");
////////////////////////////////////////////////////////////////
// Get values from Tour Exclusions
const tourExclusionsValues = Array.from(
  document.querySelectorAll("#tourExclusionsInputsContainer input")
)
  .map((input) => input.value.trim())
  .filter((value) => value !== "");
/////////////////////////////////////////////////////////////////
// Get values from Tour Highlights
const tourHighlightsValues = Array.from(
  document.querySelectorAll("#tourHighlightsInputsContainer input")
)
  .map((input) => input.value.trim())
  
///////////////////////////////////////////////////////////////
// Get values from Cancellation Notes
const cancellationNotesValues = Array.from(
  document.querySelectorAll("#cancellationContainerr input")
)
  .map((input) => input.value.trim())
  .filter((value) => value !== "");

  //////////////////////////////////////////////////////////
// Get values from Notes
const notesValues = Array.from(
  document.querySelectorAll("#notesContainer input")
)
  .map((input) => input.value.trim())
  .filter((value) => value !== "");

  //////////////////////////////////////////////////////////
  const tableDataRows = Array.from(
    document.querySelectorAll("#tableDataInputsContainer table tr")
);
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
 // Get values from formContainers
 
  /////////////////////////////////////////////////////////


    const printWindow = window.open("", "_blank");
  
    ///////////////////////////////////////////////
    /////////////////////////////////////////////
    ///////////////////////////////////////////////
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    ///////////////////////////////////////////
    /////////////////////////////////////////////
   // You can customize the format in which you want to display the values
    // Get values from formContainers
  // Get values from formContainers
  // Get values from formContainers
   // Get values from formContainers
     // Get values from formContainers
     const formContainersDiv = document.getElementById('formContainersDiv');

     // Check if formContainersDiv and its children are present
    //  <img class="w-full h-full object-cover rounded-2xl" src="${fileUrl} "  name="fileUrl" alt="" />

         // Construct the formContainersValues string
         const formContainersValues = Array.from(formContainersDiv.children).map(container => {
             const dateInput = container.querySelector('input[name="date"]');
             const dayNumberInput = container.querySelector('input[name="dayNumber"]');
             const descriptionDetailsInput = container.querySelector('input[name="descriptionDetails"]');
             const headingInput = container.querySelector('input[name="heading"]');
             const inclusionsInput = container.querySelector('input[name="inclusions"]');
             const fileUrlInput = container.querySelector('img[name="fileUrl"]');
 
             // Check if the inputs are found before accessing their values
             const date = dateInput ? dateInput.value : '';
             const dayNumber = dayNumberInput ? dayNumberInput.value : '';
             const descriptionDetails = descriptionDetailsInput ? descriptionDetailsInput.value : '';
             const heading = headingInput ? headingInput.value : '';
             const inclusions = inclusionsInput ? inclusionsInput.value : '';
             const fileUrl = fileUrlInput ? fileUrlInput.src : '';
            
             // Construct the container HTML
             return `
             <div class="flex flex-col gap-5">
           <div>
           

                   <div >
                       <div>
                       <div class="flex flex-col gap-10">
                         <div class="flex flex-col gap-2">
                           <div
                             class="w-full py-2 bg-orange-400 text-black px-2 flex items-center justify-between rounded-lg" >
                             <h1 class="text-xl font-semibold">${dayNumber}</h1>
                             <h1 class="text-lg">${date}</h1>
                           </div>
                         </div>
                         <div class="flex flex-col items-start gap-3">
                         <div class="w-1/3 h-32 bg-black rounded-2xl">
                         <img class="w-full h-full object-cover rounded-2xl" src="${fileUrl}" alt="" />

                           </div>
                           <div class="flex flex-col gap-3 w-full justify-center">
                             <h1 class="font-semibold">${heading}</h1>
                             <h1>${descriptionDetails}</h1>
                            </div>
                         </div>
                         <div class="flex flex-col gap-1">
                           <h1 class="text-xl font-semibold">Inclutions</h1>
                           <h1>
                            ${inclusions}
                           </h1>
                         </div>
                       </div>
                     </div>
                
           </div> 
          </div>
             `;
         }).join(''); // Use join to concatenate the containers
 
 ///////////////////////////////////////////////////
  
    // Write the content to be printed
    printWindow.document.write(`
      
     
 

  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
      .font-manrope {
          font-family: 'Manrope', sans-serif;
      }
       
      
      </style>
    </head>
    <body>
  
   
      <div class="w-full h-auto pb-5">
        <div
          class="w-full bg-blue-500 h-24 flex items-center justify-between pl-5 bg-cover"
          style="background-image: url(/assets/imgs/Rectangle1.png)">
          <div class="flex flex-col text-white">
            <h1 class="font-bold hidden text-xl">Hotel Voucher</h1>
              <h1 hidden class="text-sm font-light">
                confirmation No: <span>value</span>
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
        <div class="mt-5 flex justify-between items-start w-full">
        <div class="flex flex-col justify-center text-sm w-4/6">
          <div class="flex gap-2 items-start">
            <h1>Guest:</h1>
            <h1>${guestname}</h1>
          </div>
          <div class="flex gap-2 items-start">
            <h1>Contact no:</h1>
            <h1>${guestnumber}</h1>
          </div>
          <div class=" flex flex-col gap-1">
  
            <div class=" inline-flex gap-2 justify-start items-start">
              <h1 class=" flex flex-shrink-0">Arrival Details:</h1>
              <h1 class="">${arrivalDetails}</h1>
              
            </div>
            <div class="flex gap-2 items-start">
              <h1 class="flex flex-shrink-0">Departure Details:</h1>
              <h1>${departureDetails}</h1>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center text-sm">
          <div class="flex gap-2 items-start">
            <h1 class=" flex flex-shrink-0">Tour id:</h1>
            <h1>${tourId}</h1>
          </div>
          <div class="flex gap-2 items-start">
            <h1 class=" flex flex-shrink-0">Travel Date:</h1>
            <h1>${formatDate(travelDate)}</h1>
          </div>
          <div class="flex gap-2 items-start">
            <h1 class=" flex flex-shrink-0">Duration:</h1>
            <h1>${numofdays} Days /${numofnights} Nights</h1>
          </div>
          <div class="flex gap-2 items-start">
            <h1 class=" flex flex-shrink-0">No of Pax:</h1>
            <h1>${numberOfPax}</h1>
          </div>
        </div>
      </div>
        <hr class="w-full mt-5 border border-1" />
        <div class="mt-3 w-full px-5 flex flex-col gap-3">
          <div class="flex flex-col gap-3">
            <h1 class="text-3xl font-semibold"> ${packagename}</h1>
            <h1 class="text-sm">
            ${packagedescription}
            </h1>
          </div>
          <div class="flex flex-col gap-3">
            <h1 class="text-2xl">Tour Highlights</h1>
            <div class="">
              <ul class="list-disc px-4">
              ${tourHighlightsValues.map((highlight) => `<li>${highlight}</li>`).join("")}

              </ul>
            </div>
          </div>
  
          <div class="flex flex-col gap-3">
          <h1 class="text-2xl ">${heading}</h1>
          <h1 class="text-sm">
            ${headingdescription}
          </h1>
        </div>
  
  
          <div>
          ${formContainersValues}

            <div
              class="w-full px-5 mt-3 py-2 border border-1 border-black rounded-lg"
            >
              <div class="flex items-center">
                <div class="flex item-center gap-2">
                  <h1>Rate:</h1>
                  <h1>${amount}</h1>
                  
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="w-full py-2 flex items-center justify-center text-black bg-orange-400 mt-2 rounded-lg"
              >
                <h1 class="uppercase font-semibold">accomodation details</h1>
              </div>
              <div class="flex w-full justify-center">
                <table class=" ">
                  <tr class="border border-1 border-black">
                    <th class="uppercase border border-1 border-black px-5">
                      check in
                    </th>
                    <th class="uppercase border border-1 border-black px-5">
                      check out
                    </th>
                    <th class="uppercase border border-1 border-black px-5">
                      destination
                    </th>
                    <th class="uppercase border border-1 border-black px-5">
                      hotel
                    </th>
                    <th class="uppercase border border-1 border-black px-5">
                      no of rooms
                    </th>
                    <th class="uppercase border border-1 border-black px-5">
                      no of ex bed / matter
                    </th>
                    <th class="uppercase border border-1 border-black px-5">
                      meal plan
                    </th>
                  </tr>
                  ${tableDataRows.map((row, index) => index !== 0 ? row.outerHTML : "").join("")}
                
            
                
                </table>
              </div>
            </div>
            <div class="mt-5 px-5 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
            <h1 class="text-xl font-semibold">Tour Inclusions</h1>
            <h1 • ${personalNature}</h1>
              <h1> • ${applicableTaxes}</h1>
              <h1> • ${transfersSightseeing}</h1>
              <h1> • ${driverAllowances}</h1>
              <h1> • ${govtTaxes} </h1>
              ${inclusionsValues.map((value) => `<h1>• ${value}</h1>`).join("\n")}

          </div>

  
              <div class="flex flex-col gap-1">
                <h1 class="text-xl font-semibold">Tour Exclusions</h1>
                <h1> • ${fieldone}</h1>
                <h1> • ${fieldtwo}</h1>
                <h1> • ${fieldthree}</h1>
                <h1> • ${fieldfour}</h1>
                <h1> • ${fieldfive}</h1>
                ${tourExclusionsValues.map((exclusion) => `<h1> • ${exclusion}</h1>`).join("")}
                 </div>
  
              <div class="flex flex-col gap-1">
                <h1 class="text-xl font-semibold">Notes</h1>
                <h1>• ${notes}</h1>
                <h1>${notesValues.map((note) => `<h1>• ${note}</h1>`).join("")} </h1>

                
              </div>
              <div class="flex flex-col gap-1">
                <h1 class="text-xl font-semibold">Cancellation policy</h1>
                ${cancellationNotesValues.map((note) => `<h1>• ${note}</h1>`).join("")}
                </div> 
              <div class="flex flex-col">
              <h1>Tour Executive: ${amountExecutive}</h1>
              <h1>Contact No: ${tourcontact}</h1>
              <h1>Mail Id: ${tourmail}</h1>
            </div>
            <div
              class="w-full px-5 py-2 border border-1 border-black flex items-center rounded-lg"
            >
              <h1 class="text-sm">
                if you have any clarification or any extra requirements, please
                let us know we will update it
              </h1>
            </div>
          </div>
          <div class="mt-3 w-full h-12 bg-blue-500 px-5 flex items-center">
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
      </div>
    </div>
  </body>
  </html>
  
             
     
      `);
  
    printWindow.document.close();
  
    // Print the page
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
  