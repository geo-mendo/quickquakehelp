import { AppRouter } from "./router/AppRouter"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjHh_xaHrBfjijWigYwZWWZ89jeS2HzUo",
  authDomain: "quickquakehelp.firebaseapp.com",
  projectId: "quickquakehelp",
  storageBucket: "quickquakehelp.appspot.com",
  messagingSenderId: "975277661741",
  appId: "1:975277661741:web:c76fb373b793830a9de2a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function App() {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center sm:py-2 md:py-8 overflow-scroll">
      <AppRouter/>
    </div>
  )
}

export default App
