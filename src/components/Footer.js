import React from 'react';
import '../styling/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer>
            
            <p className="footer">Vincent Truong ©{currentYear}</p>
        </footer>

    );

}

export default Footer;