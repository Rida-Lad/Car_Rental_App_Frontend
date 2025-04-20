import React from 'react';
import CarModel from './components/CarModel';
import Auth from './pages/Auth';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Car Model App</h1>
      </header>
      <main>
        <CarModel />
        <Auth />
      </main>
    </div>
  );
}

export default App;