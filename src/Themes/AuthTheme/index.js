
import React from 'react'
import {
  Outlet,
} from 'react-router-dom';

export default function AuthTheme() {
    return (
      <div style={{position: 'relative', height: '100%'}}>
        <Outlet />
      </div>
    );
  }