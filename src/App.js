import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
function App() {
  const [docTitle, setDocTitle] = useState('');
  return (
    <div className="App">
      <NavBar title={docTitle || 'Untitled'} />
      <div className="editor-cont">
        <Header {...{ setDocTitle }} />
        <Block />
      </div>
    </div>
  );
}

export default App;

const Block = () => {
  return (
    <div
      className="block"
      spellCheck="true"
      placeholder="Type '/' for blocks"
      contentEditable="true"
    ></div>
  );
};
