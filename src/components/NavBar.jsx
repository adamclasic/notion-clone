import React from 'react';

function NavBar({ title }) {
  return (
    <div className="navbar">
      <span className="breadcrumbs">Getting Started / {title}</span>
    </div>
  );
}

export default NavBar;
