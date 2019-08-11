import * as React from 'react';

interface IState {
	password: any,
	username: any
}

interface IProps {
	LoginSuccessful: any
}

export default class Signin extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);
		this.state = {
			password: '',
			username: ''
		}
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onPress = this.onPress.bind(this);
	}

	public onPress(e: any) {
		/*	Prvent page from refreshing */
		e.preventDefault();

		/*	Verify user's credentials */
		const credentials = { username: this.state.username, password: this.state.password };
		fetch('https://msabrogdevops.azurewebsites.net/login', {
			body: JSON.stringify(credentials),
			headers: { "Content-Type": "application/json" },
			method: "POST"			
		})
		.then(res => {
			if (res.ok) {
				this.props.LoginSuccessful();
			}
		})
	}

	public onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ username: e.target.value });
	}

	public onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ password: e.target.value });
	}

	public render() {
		return (
			<div>
				<p>Log into Brog</p>
				<form onSubmit={this.onPress}>
					<input 
						type="text" 
						placeholder="username" 
						value={this.state.username}
						onChange={ this.onChangeUsername }
					/>
					<input 
						type="password" 
						placeholder="password" 
						value={this.state.password}
						onChange={ this.onChangePassword }
					/> 
					<input type="submit" value="submit" />
				</form>
			</div>
		)
	}

}