
import React from 'react'
import AppBar from '../../Components/AppBar'
import {
  Outlet,
} from 'react-router-dom';

export default function MainTheme() {
    return (
      <div style={{position: 'relative', height: '100%'}}>
        <AppBar />
        <Outlet />
      </div>
    );
  }