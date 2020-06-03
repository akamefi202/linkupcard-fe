import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import FooterApp from '../../components/FooterApp';
import linkup_hero from './images/hero_linkup.png';
import setup from './images/setup.svg';
import links from './images/links.svg';
import brand from './images/brand.svg';
import dots from './images/dots.svg';
import { Parallax } from 'react-scroll-parallax';
import 'antd/dist/antd.css';
import { Button, Row, Col, Card, Modal, Input } from 'antd';
import { Typography } from '@material-ui/core';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:9000';

const textArray = ['artists', 'influencers', 'musicians', 'models', 'creators', 'producers', 'freelancers', 'bloggers'];

class HomePage extends Component {
	constructor() {
		super();
		this.state = { textIdx: 0 };
	  }
	
	  componentDidMount() {
		this.timeout = setInterval(() => {
		  let currentIdx = this.state.textIdx;
		  this.setState({ textIdx: currentIdx + 1 });
		}, 1750);
	  }
	
	  componentDidUnmount() {
		clearInterval(this.timeout);
	  }

		state = {
			waitlistShow: false,
			loading: false,
			name: '',
			email: '',
			role: ''
		};

		handleChange = (event) => {
			const target = event.target;
			const name  = target.name;
			const value = target.value;

			this.setState({
				[name]: value
			});
		};

		submit = (event) => {
			this.setState({ loading: true });
			setTimeout(() => {
				this.setState({ loading: false, visible: false });
			}, 500);

			event.preventDefault();

			const payload = {
				name: this.state.name,
				email: this.state.email,
				role: this.state.role
			};

			axios ({
				url: '/waitlist',
				method: 'POST',
				data: payload
			})
				.then(() => {
					alert('Registration successul!')
				})
				.catch(() => {
					alert('Oops! Looks like there was something wrong. Try emailing us at linkup@linkup.com')
				})
		};


		waitlist(waitlistShow) {
			this.setState({ waitlistShow });
		};


		render() {

			const { loading } = this.state;
			let textThatChanges = textArray[this.state.textIdx % textArray.length];
	  
		return (
			<div className="main">
				<Navigation />
				<Modal
					title="Join the Waitlist"
					centered
					visible={this.state.waitlistShow}
					onOk={() => this.waitlist(false)}
					onCancel={() => this.waitlist(false)}
					footer={null}
					width={280}
				>
				<form onSubmit={this.submit}>
					<p className="labels">Name</p>
					<Input required placeholder="Drake" value={this.state.name} name="name" onChange={this.handleChange} className="modalInput" />
					{/* add email validation here */}
					<p className="labels">Email</p>
					<Input required placeholder="drake@drake.com" value={this.state.email} name="email" onChange={this.handleChange} className="modalInput" />
					<p className="labels">What do you call yourself?</p>
					<Input placeholder="Artist" value={this.state.role} name="role" onChange={this.handleChange} className="modalInput" />
					<Button key="submit" type="primary" className="buttonSubmit" loading={loading} onClick={this.submit}>
						Submit
					</Button>
				</form>
					
				</Modal>
				<div className="container">
					<Row>
						<Col xs={24} sm={24} md={12} span={12}>
							<Typography component="h2" variant="h2" className="headline" gutterBottom>
								Share anything with one link.
							</Typography>
							<Typography variant="h5" className="subtitle" gutterBottom>
								The most powerful sharing platform for <span className="highlighter">{textThatChanges}</span>
							</Typography>
							<Parallax y={['10px', '50px']} tagOuter="figure">
								<Button className='signUp' onClick={() => this.waitlist(true)}>
									JOIN THE WAITLIST
								</Button>
								<Typography variant="body1" className="under-txt" gutterBottom>
									Have an account? <span className="underline"><a href="/login">Login</a></span>
								</Typography>
							</Parallax>
							
						</Col>
						<Col xs={24} sm={24} md={8} span={8} className="imgContainer">
							
								<div>
								<img src={linkup_hero} className="img" alt="linkup"/>
								</div>
								
						</Col>
					</Row>
					<Row gutter={[48, 0]} className="margin-top">
						<Col xs={24} sm={24} md={8} span={8} className="sm-top">
							<img src={setup} alt="easy set up" className="img-features"/>
							<Typography component="h6" variant="h6" className="text-center" gutterBottom>
							Easy set up
							</Typography>
							<Typography variant="subtitle1" className="text-center-sm" gutterBottom>
							Sign up and get started in minutes. Customize <em>anything</em> in your card 
							</Typography>
						</Col>
						<Col xs={24} sm={24} md={8} span={8} className="sm-top">
							<img src={links} alt="add multiple links" className="img-features" />
							<Typography component="h6" variant="h6" className="text-center" gutterBottom>
							Add multiple links
							</Typography>
							<Typography variant="subtitle1" className="text-center-sm" gutterBottom>
							Link Up is the centre to your latest project, music, article, video, tour, store, and social.
							</Typography>
						</Col>
						<Col xs={24} sm={24} md={8} span={8} className="sm-top">
							<img src={brand} alt="personalize your brand" className="img-features" />
							<Typography component="h6" variant="h6" className="text-center" gutterBottom>
							Share your brand 
							</Typography>
							<Typography variant="subtitle1" className="text-center-sm" gutterBottom>
							 One link is all you'll ever need to help your audiance discover all your latest content.
							</Typography>
						</Col>
					</Row>
					<Row className="margin-top">
						<Col xs={24} sm={24} md={24} span={24} className="sm-top">
						<Parallax y={['90px', '-70px']} tagOuter="figure">
							<Card bordered={false} className="card">
								<div className="dots">
									<Parallax y={['-40px', '20px']} tagOuter="figure">
										<img src={dots} alt="dots"/>
									</Parallax>
								</div>
								<Row justify="space-around" align="middle">
									<Col xs={24} sm={24} md={12} span={18} className="">
										<Typography variant="h5" className="sub" gutterBottom>
											Create your link up account today.
										</Typography>
										<Typography component="subtitle1" variant="subtitle1" className="" gutterBottom>
											Add your links in one place and seemlessly share it with your audiance.
										</Typography>
									</Col>
									<Col xs={24} sm={24} md={8} span={8} className="button-container">
										<Button className='get-started' onClick={() => this.waitlist(true)}>
											JOIN THE WAITLIST
										</Button>
									</Col>
								</Row>
							</Card>
							</Parallax>
						</Col>
					</Row>
				</div>
				<FooterApp />
			</div>
		);
	}
};

  
export default HomePage;
