const Block = ({
  setPopupPos,
  setPopupOpen,
  setFilterKeyword,
  setHeadingKeyword,
}) => {
  const handelChange = (e) => {
    const { top, left } = e.target.getBoundingClientRect();
    const text = e.target.innerText;
    if (text[0] === '/') {
      setPopupOpen(true);
      setPopupPos({ top, left });
      setFilterKeyword(text[1] ?? '');
      if (text[1] === '1') {
        setHeadingKeyword(text.split('/1')[1] ?? '');
      }
    } else {
      setPopupOpen(false);
    }
  };
  return (
    <div
      className="block"
      spellCheck="true"
      placeholder="Type '/' for blocks"
      contentEditable="true"
      onKeyUp={handelChange}
    ></div>
  );
};

export default Block;
