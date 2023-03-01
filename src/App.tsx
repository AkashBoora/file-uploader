import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUploader/>
      </header>
    </div>
  );
}

export default App;
