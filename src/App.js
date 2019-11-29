import React from 'react';
import './scss/index.scss';

import UploadFile from './components/UploadFile.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UploadFile></UploadFile>
      </header>
    </div>
  );
}

export default App;
