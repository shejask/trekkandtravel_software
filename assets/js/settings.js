/////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
    import { getDatabase, ref, remove,} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

  
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

    const deleteDataButton = document.getElementById("deleteDataButton");

    deleteDataButton.addEventListener("click", () => {
      // Reference to the root of the database
      const rootRef = ref(database);

      // Remove all data under the root reference
      remove(rootRef)
        .then(() => {
          alert("All data deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          alert("Error deleting data. Please check the console for details.");
        });
    });
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
