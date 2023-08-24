document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadButton');

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAwRASxBkclwu2roYuw3CB3Fi92B7ntVUo",
        authDomain: "sae-login-cb56d.firebaseapp.com",
        projectId: "sae-login-cb56d",
        storageBucket: "sae-login-cb56d.appspot.com",
        messagingSenderId: "628867893351",
        appId: "1:628867893351:web:e114cc32bc1c2ef4b6ecc2",
        measurementId: "G-7DHTT7PBVY"  // Optional, only if you're using Firebase Analytics
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize Firestore
    const db = firebase.firestore();

    downloadButton.addEventListener('click', async () => {
        try {
            // Fetch data from Firestore
            const querySnapshot = await db.collection('locations').get();
            const data = [];

            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            // Convert data to JSON
            const jsonData = JSON.stringify(data, null, 2);

            // Trigger download
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'location_data.json';
            a.click();
            URL.revokeObjectURL(url);

            console.log('JSON data downloaded');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
