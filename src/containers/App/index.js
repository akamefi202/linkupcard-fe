
import React from 'react'
import './styles.css'
import HomePage from '../HomePage/index'
import Login from '../Login/index'
import ForgotPwd from '../ForgotPwd/index'
import ResetPwd from '../ResetPwd/index'
import Register from '../Register/index'
import Dashboard from '../Dashboard/index'
import Privacy from '../Privacy/index'
import Terms from '../Terms/index'
import Cookies from '../Cookies/index'
import Share from '../Dashboard/Share/index'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const theme = createMuiTheme()

export default function App() {


	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/forgot-password" component={ForgotPwd} />
					<Route exact path="/reset-password" component={ResetPwd} />
					<Route exact path="/signup" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/privacy" component={Privacy} />
					<Route exact path="/terms" component={Terms} />
					<Route exact path="/cookies" component={Cookies} />
					<Route exact path="/dashboard/share" component={Share} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	)
}