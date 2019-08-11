import * as React from 'react';

import Home from './Home/Home';
import Signin from './Signin/Signin';


interface IState {
	isSignedIn: any
}

class App extends React.Component<{}, IState> {

	constructor(props: any) {
		super(props);
		this.state = {
			isSignedIn: false
		}
		this.LoginSuccessful = this.LoginSuccessful.bind(this);
	}

	public LoginSuccessful() {
		this.setState({ isSignedIn: true });
	}

    public render() {
    	let page = <Signin LoginSuccessful={this.LoginSuccessful} />;
		if (!this.state.isSignedIn) {
			page = <Signin LoginSuccessful={this.LoginSuccessful} />;
	   	} else {
	   		page = <Home />
	   	}
	   	return page;
    }
}

export default App;
