const Block = ({
  setPopupPos,
  setPopupOpen,
  setFilterKeyword,
  setHeadingKeyword,
  type,
  id,
  convHeading,
}) => {
  const handelChange = (e) => {
    if (type && e.keyCode === 13) {
      e.preventDefault(); // Will prevent a new line when block is Header
    }
    const { top, left } = e.target.getBoundingClientRect();
    const text = e.target.innerText;
    if (text[0] === '/') {
      setPopupOpen(true);
      setPopupPos({ top, left });
      setFilterKeyword(text[1] ?? '');
      if (text[1] === '1') {
        setHeadingKeyword(text.split('/1')[1] ?? '');
        if (e.keyCode === 13) {
          e.preventDefault();
          document.getElementById(`${id}`).textContent = text.split('/1')[1];
          convHeading(id, 'Heading 1');
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
      onKeyDown={handelChange}
      id={id}
    ></div>
  );
};

export default Block;
