import React from 'react';
import { Typography } from '@material-ui/core';
import './index.css';
import Heart from './heart.svg';


function Footer() {

	return (
		<main className='main'>
                <Typography className="footer">
                    Made with <img alt="heart icon" className="heart" src={Heart}/> by link.up. <a href="/">Create yours today!</a>
                </Typography>
		</main>
	)
}

export default Footer;