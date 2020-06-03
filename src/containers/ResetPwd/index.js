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

function ResetPwd(props) {
	const { classes } = props

	const [pin, setPin] = useState('')
	const [newPwd, setNewPwd] = useState('')
	const [confirmPwd, setConfirmPwd] = useState('')
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
						Reset Password
					</Typography>

					<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="pin">PIN</InputLabel>
							<Input id="pin" name="pin" className="formInput" value={pin} onChange={e => setPin(e.target.value)} />
						</FormControl>

						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">New Password</InputLabel>
							<Input name="password" type="password" id="password" autoComplete="on" className="formInput" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Confirm Password</InputLabel>
							<Input name="password" type="password" id="password" autoComplete="on" className="formInput" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} />
						</FormControl>
						
						{
							error &&
							<div className="errorText">
							{error}
							</div>
						}
						<div className="buttonWrap">
							<Button
								type="submit"
								onClick={updatePwd}
								className="submit">
								Update Password
							</Button>
						</div>
					</form>
				</Paper>
			</Grid>
			<Footer />
		</main>
	)

	function updatePwd() {
		if (pin === "" || newPwd === "" || confirmPwd === "" || newPwd !== confirmPwd) {
			setError("Input all required fields correctly")
			setTimeout(() => {
				setError("")
			}, 5000)
			return
		}

		axios.post("users/resetPwd", {
			pin: pin,
			password: newPwd
		}).then((response) => {
			console.log(response)
			props.history.replace('/login')
		}).catch((error) => {
			console.log(error)
			setError("Incorrect PIN")
			setTimeout(() => {
				setError("")
			}, 5000)
		})
	}
}

export default withRouter(withStyles(styles)(ResetPwd))