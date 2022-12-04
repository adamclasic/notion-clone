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
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [blocks, setBlocks] = useState([{ id: '1', type: null, content: '' }]);
  function addHeading(id, blockType) {
    setBlocks((blocks) => {
      let newArr = [...blocks];
      let index = blocks.findIndex((object) => {
        return object.id === id;
      });
      newArr[index]['type'] = blockType;
      return newArr;
    });
  }
  function cyncContent(id, content) {
    setBlocks((blocks) => {
      let newArr = [...blocks];
      let index = blocks.findIndex((object) => {
        return object.id === id;
      });
      newArr[index]['content'] = content;
      return newArr;
    });
  }
  const handleBlankClick = (e) => {
    if (e.target.className.includes('block')) {
      return;
    }
    if (!blocks[blocks.length - 1].content) {
      return;
    }
    if (!blocks[blocks.length - 1].content) {
      return;
    }
    setBlocks((blocks) => {
      return [
        ...blocks,
        { id: Math.random().toString(16).slice(2), type: null, content: '' },
      ];
    });
  };
  return (
    <div className="App">
      <NavBar title={docTitle || 'Untitled'} />
      <div onClick={handleBlankClick} className="editor-cont">
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
                addHeading,
                cyncContent,
                setSelectedBlockId,
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
          BLOCKS_TYPES,
          addHeading,
          selectedBlockId,
        }}
      />
    </div>
  );
}

export default App;
