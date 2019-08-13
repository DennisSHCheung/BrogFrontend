import * as React from 'react';

import house from '../Assets/house.png';
import './Header.css';

interface IProps {
	isSignedIn: any,
	loginSuccessful: any,
	userid: any,
	username: any,
	password: any
}

interface IState {
	form: any,
	register: any
}

export default class Header extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);
		this.state = {
			form: {
				password: {
					value: ''
				},
				username: {
					value: ''
				}
			},
			register: false,
		}
		this.onPress = this.onPress.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}

	public changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			form: {
				...this.state.form,
				[name]: {
					...this.state.form[name],
					value
				}
			}
		});
	}

	public onPress(e: any) {
		/*	Prvent page from refreshing */
		e.preventDefault();

		/*	Verify user's credentials */
		const credentials = { username: this.state.form.username.value, password: this.state.form.password.value };
		fetch('https://msabrogdevops.azurewebsites.net/login', {
			body: JSON.stringify(credentials),
			headers: { "Content-Type": "application/json" },
			method: "POST"			
		})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				return false;
			}
		})
		.then(res => {
			if (res !== false) {
				console.log(res.response[0].id);
				const { id, username, password } = res.response[0];
				console.log(username);
				this.props.loginSuccessful(username, id, password);
			}
		})
		
	}

	public render() {

		const signinHeader = (
			<div className="form-div">
				<form className="form" onSubmit={this.onPress}>
					<div className="input-div">
						<label htmlFor="username">Username</label>
						<input 
							type="text"
							id="username"
							className="login" 
							placeholder="  username" 
							name="username"
							value={this.state.form.username.value}
							onChange={ this.changeHandler }
							required={true}
						/>
					</div>
					<div className="input-div">
						<label htmlFor="password">Password</label>
						<input 
							type="password" 
							id="password"
							className="login"
							placeholder="  password" 
							name="password"
							value={this.state.form.password.value}
							onChange={ this.changeHandler }
							required={true}
						/> 
					</div>
					<div>
						<input type="submit" className="button" value="Sign in" />
					</div>
				</form>
			</div>
		);

		const homeHeader = (
			<div>
				<p>{this.props.username}</p>
			</div>
		);

		/*	Select the correct header display */
		let rightHeader = signinHeader;
		if (this.props.isSignedIn) {
			rightHeader	= homeHeader;
		}


		return (
			<div className="header">
				<div className="inner-header">
					<div className="image">
						<img src={house} alt="Home Logo" width="25" height="25" />;
					</div>
					{rightHeader}	
				</div>
			</div>
		)
	}
}