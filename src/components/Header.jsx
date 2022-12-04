import React from 'react';

function Header({ setDocTitle }) {
  const handelTitle = (e) => {
    setDocTitle(e.target.innerText);
    document.title = e.target.innerText || 'Untitled';
  };
  return (
    <div
      className="block header"
      placeholder="Untitled"
      contentEditable="true"
      onKeyUp={handelTitle}
      value="asdf"
    ></div>
  );
}

export default Header;
