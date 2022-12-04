import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Block from './components/Block';
import Popup from './components/Popup';

function App() {
  const BLOCKS = [
    {
      id: '1',
      iconSrc: './blocks/h1.png',
      name: 'Heading 1',
      shortcut: 'type / + 1',
    },
  ];
  const [docTitle, setDocTitle] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ left: 0, top: 0 });
  const [filterKeyword, setFilterKeyword] = useState('');
  const [HeadingKeyword, setHeadingKeyword] = useState('');
  return (
    <div className="App">
      <NavBar title={docTitle || 'Untitled'} />
      <div className="editor-cont">
        <Header {...{ setDocTitle }} />
        <Block
          {...{
            setPopupPos,
            setPopupOpen,
            setFilterKeyword,
            setHeadingKeyword,
          }}
        />
      </div>
      <Popup
        {...{
          setPopupOpen,
          popupOpen,
          popupPos,
          filterKeyword,
          HeadingKeyword,
          BLOCKS,
        }}
      />
    </div>
  );
}

export default App;
