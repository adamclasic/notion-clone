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
}) => {
  const handelKeyDown = (e) => {
    const text = e.target.innerText;
    cyncContent(id, text);
    const isCommandKeys = text[0] === '/' && text[1] === '1';
    if ((isCommandKeys || type) && e.keyCode === 13) {
      e.preventDefault(); // Will prevent a new line when block is Header
    }
  };

  const handelKeyUp = (e) => {
    const text = e.target.innerText;

    const { top, left } = e.target.getBoundingClientRect();
    console.log(text);
    console.log('text--------');
    cyncContent(id, text);
    if (text[0] === '/') {
      setPopupOpen(true);
      setPopupPos({ top, left });
      setFilterKeyword(text[1] ?? '');
      if (text[1] === '1') {
        setHeadingKeyword(text.split('/1')[1] ?? '');
        if (e.keyCode === 13) {
          e.preventDefault();
          document.getElementById(`${id}`).textContent = text.split('/1')[1];
          addHeading(id, 'Heading 1');
          setPopupOpen(false);
          e.target.blur();
        }
      }
    } else {
      setPopupOpen(false);
    }
  };
  return (
    <div
      className={`block ${type === 'Heading 1' && 'block-heading1'}`}
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
