import React from 'react'
import './footer.css';
const Footer = () => {

  const year = new Date().getFullYear();
  
  return (
    <div className='footer_main'>
        <div className="footer_copy">
          <p>Made With ❤ By Md Amir &copy; {year}</p>
        </div>

    </div>
  )
}

export default Footer