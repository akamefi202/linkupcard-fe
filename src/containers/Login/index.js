import React, { useState } from 'react'
import { Typography, Grid, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import { Button } from 'antd';
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import Footer from '../../components/Footer';
//import Social from '../../components/Social';
import Facebook from '../../components/Social/images/facebook.svg';
import Twitter from '../../components/Social/images/twitter.svg';
import Google from '../../components/Social/images/google.svg';
import linkupIcon from '../../components/Navigation/images/linkup-icon.png';
import './index.css';

var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:9000';
var serverUrl = "http://localhost:9000"

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

function SignIn(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
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
					Sign In
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email address</InputLabel>
						<Input id="email" name="email" autoComplete="on" autoFocus className="formInput" value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="on" className="formInput" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					
					<a
						type="button" 
						className = "textButton"
						href="/forgot-password">
						Forgot Password?
					</a>
					
					{
						error &&
						<div className="errorText">
						{error}
						</div>
					}

					<div className="buttonWrap">
						<Button
							type="submit"
							onClick={SignIn}
							className="submit">
							Sign in
						</Button>
					</div>

					<a href={serverUrl + "/users/auth/google"} class="button">
						<div className="buttonWrap">
							<Button
								type="button"
								className="socialSubmit">
								<img alt="google auth" className="social" src={Google} />
								Sign in with Google
							</Button>
						</div>	
					</a>
					<a href={serverUrl + "/users/auth/facebook"} class="button">
						<div className="buttonWrap">
							<Button
								type="button"
								className="socialSubmit">
								<img alt="facebook auth" className="social" src={Facebook} />
								Sign in with Facebook
							</Button>
						</div>	
					</a><a href={serverUrl + "/users/auth/twitter"} class="button">
						<div className="buttonWrap">
							<Button
								type="button"
								className="socialSubmit">
								<img alt="twitter auth" className="social" src={Twitter} />
								Sign in with Twitter
							</Button>
						</div>	
					</a>
				
					<Typography className="or">
						Or
					</Typography>
					
					<Button
						type="submit"
						href="/signup"
						className="other">
						Don't have an account? Sign up
          			</Button>
				</form>
			</Paper>
			</Grid>
			<Footer />
		</main>
	)

	async function SignIn() {
		if (email === "" || password === "") {
			setError("Input all required fields correctly")
			setTimeout(() => {
				setError("")
			}, 5000)
			return
		}

		axios.post("users/signin", {
			email: email,
			password: password
		}).then((response) => {
			console.log(response)
			props.history.replace('/dashboard')
		}).catch((error) => {
			console.log(error)
			setError("Incorrect Email or Password")
			setTimeout(() => {
				setError("")
			}, 5000)
		});
	}

	async function googleLogin() {
		console.log("googleSignIn");
		
		axios.get("users/auth/google"
		).then(response => {
		  	console.log(response);
		}).catch(error => {
		  	console.log(error);
		})
	}

	async function twitterLogin() {
		console.log("twitterSignIn");

		axios.get("users/auth/twitter"
		).then(response => {
		  	console.log(response);
		}).catch(error => {
		  	console.log(error);
		})
	}

	async function fbLogin() {
		console.log("facebookSignIn");

		axios.get("users/auth/facebook"
		).then(response => {
		  	console.log(response);
		}).catch(error => {
		  	console.log(error);
		})
	}
}

export default withRouter(withStyles(styles)(SignIn))