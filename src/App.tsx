import * as React from 'react';

import Header from './Header/Header';

import Register from './Index/Register';
import Description from './Index/Description';

import Home from './Home/Home';
// import Signin from './Signin/Signin';

import './App.css';


interface IState {
	isSignedIn: any,
	username: any,
	userid: any,
	password: any
}

class App extends React.Component<{}, IState> {

	constructor(props: any) {
		super(props);
		this.state = {
			isSignedIn: false,
			username: '',
			userid: '',
			password: ''
		}
		this.loginSuccessful = this.loginSuccessful.bind(this);
	}

	public loginSuccessful(username: any, id: any, password: any) {
		this.setState({ isSignedIn: true, username, userid: id, password });
	}

	// <Signin loginSuccessful={this.loginSuccessful} />

    public render() {
    	const indexPage = (
    		<div className="main">
    			<Header 
    				isSignedIn={this.state.isSignedIn} 
    				loginSuccessful={this.loginSuccessful}
    				username={this.state.username}
    				userid={this.state.userid}
    				password={this.state.password}
    				/>
    			<div className="index-space-between" />    			
				<div className="index-body">
					<div className="inner-body">
		    			<Description />
		    			<Register loginSuccessful={this.loginSuccessful} /> 
		    		</div>   
    			</div>			
    		</div>
    	);

    	const homePage = (
    		<div className="main">
    			<Header 
    				isSignedIn={this.state.isSignedIn} 
    				loginSuccessful={this.loginSuccessful} 
    				username={this.state.username}
    				userid={this.state.userid}
    				password={this.state.password}
    			/>
    			<div className="index-space-between" />
    			<div className="index-body">   
    				<Home id={this.state.userid} username={this.state.username} password={this.state.password} />
    			</div>
    		</div>
    	);

    	let page = indexPage;

		if (!this.state.isSignedIn) {
			page = indexPage;
	   	} else {
	   		page = homePage;
	   	}
	   	return page;
    }
}

export default App;
