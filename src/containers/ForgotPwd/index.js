import React, { useState } from 'react'
import { Typography, Grid, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import { Button } from 'antd';
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Footer from '../../components/Footer';
import linkupIcon from '../../components/Navigation/images/linkup-icon.png';
import './index.css';
  
axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:9000';

const styles = theme => ({
	palette: {
		primary: '#3aa3ae',
	},
	main: {
		marginTop: '10%',
		marginRight: '3%',
		marginLeft: '3%'
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		width: 400,
		marginTop: '30px',
	},
	form: {
		width: '85%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
});

function ForgotPwd(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	return (
		<main className={classes.main}>
			<Grid
				container justify="center" alignItems="center" xs={12}>
				<Paper className={classes.paper}>
					<a href="/">
						<img src={linkupIcon} className='linkup-icon' alt="linkup" />
					</a>
					<Typography component="h1" variant="h5" className="">
						Forgot Password
					</Typography>		
					
					<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input id='email' name='email' autoComplete="on" autoFocus className="formInput" value={email} onChange={e => setEmail(e.target.value)} />
						</FormControl>
						
						{
							error &&
							<div className='errorText'>
							{error}
							</div>
						}

						<div className='buttonWrap'>
							<Button
								type='submit'
								onClick={resetPwd}
								className='submit'>
								Reset Password
							</Button>
						</div>
					</form>
				</Paper>
			</Grid>
			<Footer />
		</main>
	)

	function resetPwd() {
		if (email === '') {
			setError('Input all required fields correctly')
			setTimeout(() => {
				setError('')
			}, 5000)
			return
		}

		axios.post('users/forgotPwd', {
			email: email
		}).then((response) => {
			console.log(response)
			props.history.replace('/reset-password')
		}).catch((error) => {
			console.log(error)
			setError('User not found')
			setTimeout(() => {
				setError('')
			}, 5000)
		})
	}
}

export default withRouter(withStyles(styles)(ForgotPwd))