import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
      <div className='ma4 mt1' style={{ height: '12vh', width: '12vh' }}>
        <Tilt className="Tilt br4 shadow-2 " options={{ max : 55 }} >
        <div className="Tilt-inner pa1">
            <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
          </div>
        </Tilt>
      </div>
  );
}

export default Logo;