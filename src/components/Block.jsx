import { useEffect, useRef } from 'react';
const Block = ({
  setPopupPos,
  setPopupOpen,
  setFilterKeyword,
  setHeadingKeyword,
  setSelectedBlockId,
  type,
  id,
  addHeading,
  cyncContent,
  addNewBlock,
  autoFocus,
}) => {
  const handelKeyDown = (e) => {
    let newBlockId;
    const text = e.target.innerText;
    cyncContent(id, text);
    if (e.keyCode === 13 && !text.startsWith('/1')) {
      e.preventDefault(); // Will prevent a new line when block is Header
      addNewBlock();
    }
  };

  const handelKeyUp = (e) => {
    const text = e.target.innerText;
    const { top, left } = e.target.getBoundingClientRect();
    cyncContent(id, text);
    if (text[0] === '/') {
      setPopupOpen(true);
      setPopupPos({ top, left });
      setSelectedBlockId(e.target.id);
      setFilterKeyword(text[1] ?? '');
      if (text[1] === '1') {
        setHeadingKeyword(text.split('/1')[1] ?? '');
        if (e.keyCode === 13) {
          e.preventDefault();
          document.getElementById(`${id}`).textContent = text
            .split('/1')[1]
            .replace(/(\r\n|\n|\r)/gm, '');
          addHeading(id, 'Heading 1');
          setPopupOpen(false);
          e.target.blur();
          addNewBlock();
        }
      }
    } else {
      setPopupOpen(false);
    }
  };
  const thisBlock = useRef(null);
  useEffect(() => {
    if (autoFocus) {
      thisBlock.current.focus();
    }
  }, [autoFocus]);
  return (
    <div
      ref={thisBlock}
      className={`block`}
      style={
        type && {
          fontFamily: 'sans-serif, Helvetica, Arial',
          fontWeight: 600,
          fontSize: 30,
          lineHeight: 1.3,
        }
      }
      spellCheck="true"
      placeholder={type === 'Heading 1' ? type : "Type '/' for blocks"}
      contentEditable="true"
      onClick={() => setSelectedBlockId(id)}
      onKeyDown={handelKeyDown}
      onKeyUp={handelKeyUp}
      id={id}
    ></div>
  );
};

export default Block;
