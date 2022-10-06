import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className='flex justify-end'>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
          <Logo />
        </nav>
      );
    } else {
      return (
        <nav className='flex justify-end'>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer flex-end'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer flex-end'>Register</p>
          <Logo />
        </nav>
      );
    }
}

export default Navigation;