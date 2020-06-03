import React, { useState } from 'react'
import { Typography, Grid, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import { Button } from 'antd';
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import Footer from '../../components/Footer';
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

function SignUp(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [referral_code, setReferralcode] = useState('')
	const [error, setError] = useState('')

	return (
		<main className={classes.main}>
			<Grid
				container justify="center" alignItems="center" xs={12}>
			<Paper className={classes.paper}>
				<a href="/">
					<img src={linkupIcon} className='linkup-icon' alt="linkup" />
				</a>
				<Typography component="h1" variant="h5" className="">
					Sign Up
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input id="username" name="username" autoComplete="off" autoFocus className="formInput" value={username} onChange={e => setUsername(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="firstname">First name</InputLabel>
						<Input id="firstname" name="firstname" autoComplete="off" autoFocus className="formInput" value={firstname} onChange={e => setFirstname(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" fullWidth>
						<InputLabel htmlFor="lastname">Last name</InputLabel>
						<Input id="lastname" name="lastname" autoComplete="off" autoFocus className="formInput" value={lastname} onChange={e => setLastname(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email address</InputLabel>
						<Input id="email" name="email" autoComplete="on" autoFocus className="formInput" value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="on" className="formInput" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" fullWidth>
						<InputLabel htmlFor="referral_code">Referral code</InputLabel>
						<Input name="referral_code" type="referral_code" id="referral_code" autoComplete="off" className="formInput" value={referral_code} onChange={e => setReferralcode(e.target.value)} />
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
							onClick={SignUp}
							className="submit">
							Sign up
						</Button>
					</div>

					<a href={serverUrl + "/users/auth/google"} class="button">
						<div className="buttonWrap">
							<Button
								type="button"
								className="socialSubmit">
								<img alt="google auth" className="social" src={Google} />
								Sign up with Google
							</Button>
						</div>	
					</a>
					<a href={serverUrl + "/users/auth/facebook"} class="button">
						<div className="buttonWrap">
							<Button
								type="button"
								className="socialSubmit">
								<img alt="facebook auth" className="social" src={Facebook} />
								Sign up with Facebook
							</Button>
						</div>	
					</a>
					<a href={serverUrl + "/users/auth/twitter"} class="button">
						<div className="buttonWrap">
							<Button
								type="button"
								className="socialSubmit">
								<img alt="twitter auth" className="social" src={Twitter} />
								Sign up with Twitter
							</Button>
						</div>	
					</a>
				
					<Typography className="or">
						Or
					</Typography>
					
					<Button
						type="submit"
						href="/login"
						className="other">
						Have an account? Sign in
          			</Button>
				</form>
			</Paper>
			</Grid>
			<Footer />
		</main>
	)

	async function SignUp() {
		if (email === "" || password === "" || username === "" || firstname === "") {
			setError("Input all required fields correctly")
			setTimeout(() => {
				setError("")
			}, 5000)
			return
		}

		axios.post("users/signup", {
			email: email,
			password: password,
			firstname: firstname,
			username: username,
			lastname: lastname,
			source: "local",
		}).then((response) => {
			console.log(response)
			props.history.replace('/dashboard')
		}).catch((error) => {
			console.log(error.response)
			setError(error.response.data.error)
			setTimeout(() => {
				setError("")
			}, 5000)
		});
	}

	async function googleLogin() {
		console.log("googleSignUp")
		
		axios.get("users/auth/google"
		).then(response => {
		  	console.log(response);
		}).catch(error => {
		  	console.log(error);
		})
	}

	async function twitterLogin() {
		console.log("twitterSignUp")

		axios.get("users/auth/twitter"
		).then(response => {
		  	console.log(response);
		}).catch(error => {
		  	console.log(error);
		})
	}

	async function fbLogin() {
		console.log("facebookSignUp")

		axios.get("users/auth/facebook"
		).then(response => {
		  	console.log(response);
		}).catch(error => {
		  	console.log(error);
		})
	}
}

export default withRouter(withStyles(styles)(SignUp))