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
  BLOCKS_TYPES,
}) => {
  const handelKeyDown = (e) => {
    const text = e.target.innerText;
    cyncContent(id, text);
    if (e.keyCode === 13 && !text.startsWith('/1')) {
      e.preventDefault(); // Will prevent a new line when block is Header
      addNewBlock();
    }
  };
  function trimContent(content, foundType) {
    return content.split(foundType.shortcut)[1].replace(/(\r\n|\n|\r)/gm, '');
  }
  const handelKeyUp = (e) => {
    const text = e.target.innerText;
    const { top, left } = e.target.getBoundingClientRect();
    cyncContent(id, text);
    if (text[0] === '/') {
      setPopupOpen(true);
      setPopupPos({ top, left });
      setSelectedBlockId(e.target.id);
      setFilterKeyword(text[1] ?? '');
      const typedSC = text.split('/')[1];
      const foundType = BLOCKS_TYPES.find((b) =>
        typedSC.startsWith(b.shortcut)
      );
      if (foundType) {
        setHeadingKeyword('/' + typedSC ?? '');
        if (e.keyCode === 13) {
          // checks is key pressed is Enter
          e.preventDefault();
          document.getElementById(`${id}`).textContent = trimContent(
            text,
            foundType
          );
          addHeading(id, foundType);
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
      style={type && type.styling}
      spellCheck="true"
      placeholder={type ? type.name : "Type '/' for blocks"}
      contentEditable="true"
      onClick={() => setSelectedBlockId(id)}
      onKeyDown={handelKeyDown}
      onKeyUp={handelKeyUp}
      id={id}
    ></div>
  );
};

export default Block;
