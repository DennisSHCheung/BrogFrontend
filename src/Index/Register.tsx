import * as React from 'react';
import './Register.css';

interface IState {
	form: any
}

interface IProps {
	loginSuccessful: any
}

export default class Register extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);
		this.state = {
			form: {
				email: {
					value: ''
				},
				password: {
					value: ''
				},
				username: {
					value: ''
				}
			}
		}
		this.onPress = this.onPress.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}

	public changeHandler(e: any) {
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

		e.preventDefault();

		const credentials = { 
			email: this.state.form.email.value, 
			password: this.state.form.password.value ,
			username: this.state.form.username.value			
		};
		fetch('https://msabrogdevops.azurewebsites.net/register', {
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
				const { id, username, password } = res.response[0];
				this.props.loginSuccessful(username, id, password);
			}
		})
	}

	public render() {
		return (
			<div className="register-div">
				<div className="title-div">
					<p style={{paddingLeft: "18.5%"}}>Register{"\n"}
					Your stories will be shared around the world!
					</p>
				</div>
				<form onSubmit={this.onPress} className="register-form">
					<div className="email-div">
						<input
							type="text"
							className="email"
							placeholder="  email"
							name="email"
							value={this.state.form.email.value}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inner-div">
						<div className="name-and-pw-div">
							<input
								type="text"
								className="name-and-pw"
								placeholder="  username"
								value={this.state.form.username.value}
								name="username"
								onChange={this.changeHandler}
							/>
						</div>
						<div className="name-and-pw-div">
							<input
								type="password"
								className="name-and-pw pw"
								placeholder="  password"
								name="password"
								value={this.state.form.password.value}
								onChange={this.changeHandler}
							/>
						</div>
					</div>
					<div className="submission">
						<input
							type="submit"
							value="Register now!"
							className="button2"
						/>
					</div>
				</form>
			</div>
		)
	}

}