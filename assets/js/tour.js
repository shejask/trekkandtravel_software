// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

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

// Function to fetch existing data from the database
async function getExistingData() {
    try {
        const existingDataRef = ref(database, 'tourHighlights');
        const existingDataSnapshot = await get(existingDataRef);
        return existingDataSnapshot || [];
    } catch (error) {
        console.error('Error fetching existing data:', error);
        return [];
    }
}

// Function to render tour highlights in the dropdown
function renderTourHighlights(highlights, dropdownId, inputFieldId) {
    // Clear previous content
    const tourHighlightsDropdown = document.getElementById(dropdownId);
    tourHighlightsDropdown.innerHTML = '';

    // Render each highlight in the dropdown
    highlights.forEach((highlight) => {
        const highlightItem = document.createElement('div');

        // Check if the necessary properties are defined before accessing them
        if (highlight && highlight.tourHighlight) {
            highlightItem.textContent = highlight.tourHighlight;
            highlightItem.classList.add('cursor-pointer', 'hover:bg-gray-200', 'p-2');
            highlightItem.addEventListener('click', () => {
                // Set the selected highlight in the input field
                const inputField = document.getElementById(inputFieldId);
                if (inputField) {
                    inputField.value = highlight.tourHighlight;
                    // Clear the dropdown after selecting
                    tourHighlightsDropdown.innerHTML = '';
                }
            });

            tourHighlightsDropdown.appendChild(highlightItem);
        }
    });
}

// Function to add a new tour highlight field
function addNewTourHighlightField() {
    const newTourHighlightField = document.createElement('div');
    const timestamp = Date.now();
    newTourHighlightField.classList.add('w-full', 'p-2', 'border', 'border-black', 'rounded', 'mb-4', 'tour-highlights-input');

    const newTourHighlightInput = document.createElement('input');
    newTourHighlightInput.id = `input_${timestamp}`;
    newTourHighlightInput.type = 'text'; // Set the input type to text
    newTourHighlightInput.classList.add('form-input', 'w-full', 'sm:text-sm', 'sm:leading-5', 'focus:outline-none', 'focus:border-indigo-300', 'focus:shadow-outline-indigo', 'transition', 'duration-150', 'ease-in-out');
    newTourHighlightInput.placeholder = 'New Tour Highlight';

    const newTourHighlightDropdown = document.createElement('div');
    const newDropdownId = `newTourHighlightsDropdown_${timestamp}`;
    newTourHighlightDropdown.classList.add('mt-2');
    newTourHighlightDropdown.id = newDropdownId;

    newTourHighlightField.appendChild(newTourHighlightInput);
    newTourHighlightField.appendChild(newTourHighlightDropdown);
    tourHighlightsContainer.appendChild(newTourHighlightField);

    // Add event listener for input changes to update the dropdown
    newTourHighlightInput.addEventListener('input', async () => {
        const searchTerm = newTourHighlightInput.value.trim().toLowerCase();

        // Fetch existing data
        const existingDataSnapshot = await getExistingData();

        // Filter the highlights based on the search term
        const filteredHighlights = [];
        existingDataSnapshot.forEach(childSnapshot => {
            const highlight = childSnapshot.val();
            if (highlight && highlight.tourHighlight && highlight.tourHighlight.toLowerCase().includes(searchTerm)) {
                filteredHighlights.push(highlight);
            }
        });

        // Render the filtered highlights in the dropdown
        renderTourHighlights(filteredHighlights, newDropdownId, `input_${timestamp}`);
    });
}

// Your Firebase configuration and initialization code here

// Get references to the HTML elements
const savedataButton = document.getElementById('savedata');
const tourHighlightInput = document.getElementById('tourHighlight');
const tourHighlightsContainer = document.getElementById('tourHighlightsContainer');
const addTourHighlightButton = document.getElementById('addTourHighlight');

// Add event listener to the "Save" button
savedataButton.addEventListener('click', async () => {
    try {
        // Save data to Firebase Realtime Database
        const tourHighlightValue = tourHighlightInput.value.trim();

        if (tourHighlightValue !== '') {
            // Check if the tourHighlight already exists
            const existingDataSnapshot = await getExistingData();

            let isTourHighlightExists = false;
            existingDataSnapshot.forEach(childSnapshot => {
                const existingHighlight = childSnapshot.val();

                if (existingHighlight && existingHighlight.tourHighlight) {
                    const existingHighlightLowerCase = existingHighlight.tourHighlight.toLowerCase();
                    if (existingHighlightLowerCase === tourHighlightValue.toLowerCase()) {
                        isTourHighlightExists = true;
                    }
                }
            });

            if (!isTourHighlightExists) {
                // If the tourHighlight doesn't exist, save it
                const databaseRef = push(ref(database, 'tourHighlights'));
                set(databaseRef, { tourHighlight: tourHighlightValue });
                tourHighlightInput.value = ''; // Clear the input field after saving

                // Focus on the input field to maintain cursor position
                tourHighlightInput.focus();
            } else {
             }
        } else {
            alert('Please enter a tour highlight before saving.');
        }

        // Check for new tour highlights in dynamically added fields
        const newTourHighlightInputs = document.querySelectorAll('.tour-highlights-input input');
        newTourHighlightInputs.forEach(async (input) => {
            const newTourHighlightValue = input.value.trim();

            if (newTourHighlightValue !== '') {
                // Check if the new tour highlight already exists
                const existingDataSnapshot = await getExistingData();

                let isNewTourHighlightExists = false;
                existingDataSnapshot.forEach(childSnapshot => {
                    const existingHighlight = childSnapshot.val();

                    if (existingHighlight && existingHighlight.tourHighlight) {
                        const existingHighlightLowerCase = existingHighlight.tourHighlight.toLowerCase();
                        if (existingHighlightLowerCase === newTourHighlightValue.toLowerCase()) {
                            isNewTourHighlightExists = true;
                        }
                    }
                });

                if (!isNewTourHighlightExists) {
                    // If the new tour highlight doesn't exist, save it
                    const databaseRef = push(ref(database, 'tourHighlights'));
                    set(databaseRef, { tourHighlight: newTourHighlightValue });
                    
                }
            }
        });
    } catch (error) {
        console.error('Error saving data:', error);
    }
});

// Add event listener for input changes to update the dropdown
tourHighlightInput.addEventListener('input', async () => {
    try {
        const searchTerm = tourHighlightInput.value.trim().toLowerCase();

        // Fetch existing data
        const existingDataSnapshot = await getExistingData();

        // Filter the highlights based on the search term
        const filteredHighlights = [];
        existingDataSnapshot.forEach(childSnapshot => {
            const highlight = childSnapshot.val();
            if (highlight && highlight.tourHighlight && highlight.tourHighlight.toLowerCase().includes(searchTerm)) {
                filteredHighlights.push(highlight);
            }
        });

        // Render the filtered highlights in the dropdown
        renderTourHighlights(filteredHighlights, 'tourhighlightsdropdown', 'tourHighlight');
    } catch (error) {
        console.error('Error updating dropdown:', error);
    }
});

// Add event listener for the "plus" button to add a new tour highlight field
addTourHighlightButton.addEventListener('click', () => {
    addNewTourHighlightField();
});










////////////////////////
//////////////////////////

// Function to print the content
// Function to print the content
function printContent() {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Wait for the content to be ready (adjust the delay as needed)
    setTimeout(() => {
        // HTML content to be printed
        const printContent = `
            <html>
            <head>
                <title>Tour Highlights</title>
                <style>
                    /* Add any additional styles for printing */
                    body {
                        font-family: 'Arial', sans-serif;
                    }
                    .tour-highlight-item {
                        list-style-type: none;
                        margin-bottom: 8px;
                    }
                </style>
            </head>
            <body>
                <h1>Tour Highlights</h1>
                <ul>
                    ${getPrintableContent()} <!-- Add a function to get the printable content -->
                </ul>
            </body>
            </html>
        `;

        // Write the content to the new window
        printWindow.document.open();
        printWindow.document.write(printContent);
        printWindow.document.close();

        // Focus and print the new window
        printWindow.focus();
        printWindow.print();
    }, 500); // Adjust the delay as needed
}


// Function to get printable content (replace this with your content logic)
// Function to get printable content (replace this with your content logic)
function getPrintableContent() {
    // Get the value of the main input field
    const tourHighlightInput = document.getElementById('tourHighlight');
    const mainHighlightText = tourHighlightInput.value.trim();

    // Get the values of dynamically added input fields
    const tourHighlights = document.querySelectorAll('.tour-highlights-input input');
    let printableContent = '';

    // Include the main input value in the printable content
    if (mainHighlightText !== '') {
        printableContent += `<li class="tour-highlight-item">${mainHighlightText}</li>`;
    }

    // Include the values of dynamically added input fields in the printable content
    tourHighlights.forEach((highlight) => {
        const highlightText = highlight.value.trim();
        if (highlightText !== '') {
            printableContent += `<li class="tour-highlight-item">${highlightText}</li>`;
        }
    });

    return printableContent;
}


// Add event listener to the "Print" button
const printButton = document.getElementById('printButton');
printButton.addEventListener('click', () => {
    printContent();
});
