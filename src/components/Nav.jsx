import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook, FaWrench } from 'react-icons/fa';

const activeStyle = {
  color: '#1688C9',
};

export default function Nav() {
  return (
    <nav>
      <NavLink
        exact
        to="/library"
        activeStyle={activeStyle}
      >
        <FaBook />
      </NavLink>
      <NavLink
        to="/settings"
        activeStyle={activeStyle}
      >
        <FaWrench />
      </NavLink>
    </nav>
  );
}
