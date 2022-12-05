import React, { useEffect } from 'react';
import ListItem from './ListItem';

const Popup = ({
  popupOpen,
  popupPos,
  filterKeyword,
  setPopupOpen,
  BLOCKS_TYPES,
  addHeading,
  selectedBlockId,
}) => {
  const handleSelect = (id, type) => {
    console.log('clicked');
    setPopupOpen(false);
    addHeading(id, type);
    document.getElementById(`${id}`).textContent = '';
  };
  const filtredBlockTypes = BLOCKS_TYPES.filter((e) =>
    e.id.includes(filterKeyword)
  );
  useEffect(() => {
    if (!filtredBlockTypes.length) {
      setPopupOpen(false);
    }
  }, [filtredBlockTypes, setPopupOpen, filterKeyword]);

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
          {filtredBlockTypes.map((blockType, index, arr) => (
            <ListItem
              onClick={() => handleSelect(selectedBlockId, blockType)}
              focus={arr.length === 1}
              {...{ blockType }}
              key={blockType.id}
            ></ListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
