import React from 'react';
import '../styling/Footer.css';
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer id="contact">
            <div className="footer-header">
                <h>Contact Me</h>
            </div> 
            <nav1>
                <a href="mailto:vincent.truong.22@cnu.edu"><MdEmail /></a>
                <a href="https://github.com/vincent-truong04" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/vincent-t2468/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://www.instagram.com/vincent_truong04/" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
            </nav1>
            <p className="footer">Vincent Truong ©{currentYear}</p>
        </footer>

    );

}

export default Footer;