import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig =
{
    apiKey: "AIzaSyDveb9yfoo7cnWhjRx24WwoAtRku54VbYI",

    authDomain: "neonshop-89c30.firebaseapp.com",

    projectId: "neonshop-89c30",

    storageBucket: "neonshop-89c30.firebasestorage.app",

    messagingSenderId: "466773493723",

    appId: "1:466773493723:web:41a419c790f9314e28c9fe"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };