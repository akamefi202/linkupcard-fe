import React from 'react';
import { Grid } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from './images/linkup_logo.png';
import './index.css';
import { Button } from 'antd';


function Navigation(props) {


	return (
		<main className='main'>
		<AppBar className='navBar' position="static">
			<Toolbar>
			<Grid>
				<div color="inherit" aria-label="menu">
					<a href="/">
						<img className="logo" src={Logo} alt="linkup logo" />
					</a>
				</div>
			</Grid>
			<Grid className="login-button" item>
				<Button className='login' href="/login">Login</Button>
			</Grid>
			</Toolbar>
		</AppBar>
	</main>
	)
}

export default Navigation;
