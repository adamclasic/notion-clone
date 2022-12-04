import React, { useEffect } from 'react';
const ListItem = ({ focus, block, onClick }) => {
  const { name, shortcut, iconSrc } = block;
  return (
    <div
      {...{ onClick }}
      className="list-item"
      style={{ backgroundColor: focus ? '#f3f4f6' : 'unset' }}
    >
      <div className="icon-cont">
        <div
          style={{
            backgroundImage: `url(${iconSrc})`,
          }}
        ></div>
      </div>

      <div>
        <div className="block-title">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '6px', fontWeight: 600 }}>{name}</span>
          </div>
        </div>

        <div className="block-title-secondary">Shortcut: {shortcut}</div>
      </div>
    </div>
  );
};

const Popup = ({
  popupOpen,
  popupPos,
  filterKeyword,
  setPopupOpen,
  BLOCKS,
  addHeading,
}) => {
  const handleSelect = (id) => {
    console.log('clicked');
    setPopupOpen(false);
    addHeading(id, 'Heading 1');
    document.getElementById(`${id}`).textContent = '';
  };
  const filtredBlocks = BLOCKS.filter((e) => e.id.includes(filterKeyword));
  useEffect(() => {
    if (!filtredBlocks.length) {
      setPopupOpen(false);
    }
  }, [filtredBlocks, setPopupOpen, filterKeyword]);

  useEffect(() => {
    const closeEvent = (e) => {
      const popupCont = document.querySelector('.popup-cont');
      if (!popupCont.contains(e.target)) {
        setPopupOpen(false);
      }
    };
    document.addEventListener('click', closeEvent);

    return () => {
      document.removeEventListener('click', closeEvent);
    };
  }, [setPopupOpen]);

  let { left, top } = popupPos;
  top += 32;
  return (
    <div
      style={{
        position: 'fixed',
        left,
        top,
        display: popupOpen ? 'block' : 'none',
      }}
      className="popup-cont"
    >
      <div className="popup">
        <div>
          <div className="popup-head">
            <div style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>
              Add blocks
            </div>
            <div>Keep typing then hit enter when done.</div>
            {filterKeyword && (
              <div style={{ color: '#555', fontWeight: 'bold' }}>
                Filetring keyword{' '}
                <span
                  style={{
                    color: 'white',
                    backgroundColor: '#3565a9',
                    borderRadius: 3,
                    padding: '0 3px',
                  }}
                >
                  {filterKeyword}
                </span>
              </div>
            )}
          </div>
          {filtredBlocks.map((block) => (
            <ListItem
              onClick={() => handleSelect(block.id)}
              focus
              {...{ block }}
              key={block.id}
            ></ListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
