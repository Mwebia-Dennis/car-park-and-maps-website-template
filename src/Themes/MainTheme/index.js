
import React from 'react'
import {
  Outlet,
} from 'react-router-dom';
import AppBar from '../../Components/AppBar'

export default function MainTheme() {
    return (
      <div style={{position: 'relative', height: '100%'}}>
        <AppBar />
        <Outlet />
      </div>
    );
  }