import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './form/user/Signup';
import { RouterProvider } from 'react-router-dom';
import { router } from './form/router/Router';

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
