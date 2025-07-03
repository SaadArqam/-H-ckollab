import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext'; // ✅ Import AppProvider and useAppContext
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clerkPubKey = "pk_test_ZXhjaXRpbmctYW5lbW9uZS02MC5jbGVyay5hY2NvdW50cy5kZXYk";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppProvider>
          <App />
          <ToastContainer position="top-center" autoClose={3000} />
        </AppProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
