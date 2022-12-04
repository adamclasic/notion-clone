import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Block from './components/Block';
import Popup from './components/Popup';

function App() {
  const BLOCKS_TYPES = [
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
  const [blocks, setBlocks] = useState([{ id: '1', type: null }]);
  function convHeading(id, blockType) {
    setBlocks((blocks) => {
      let newArr = [...blocks];
      let index = blocks.findIndex((object) => {
        return object.id === id;
      });
      newArr[index]['type'] = blockType;
      return newArr;
    });
  }
  return (
    <div className="App">
      <NavBar title={docTitle || 'Untitled'} />
      <div className="editor-cont">
        <Header {...{ setDocTitle }} />
        {blocks.map((block) => {
          const { type, id } = block;
          return (
            <Block
              key={id}
              {...{
                setPopupPos,
                setPopupOpen,
                setFilterKeyword,
                setHeadingKeyword,
                type,
                id,
                convHeading,
              }}
            />
          );
        })}
      </div>
      <Popup
        {...{
          setPopupOpen,
          popupOpen,
          popupPos,
          filterKeyword,
          HeadingKeyword,
          BLOCKS: BLOCKS_TYPES,
          convHeading,
        }}
      />
    </div>
  );
}

export default App;
