import * as React from 'react';

import './Home.css';
import Blog from './Blog';

interface IProps {
	id: any,
	password: any,
	username: any
} 

export default class Home extends React.Component<IProps, {}> {

	constructor(props: any) {
		super(props);
		// this.getPosts = this.getPosts.bind(this);
	}

	// public getPosts() {
	// 	fetch(`https://msabrogdevops.azurewebsites.net/getPosts?id=${this.props.id}`, {
	// 		headers: { "Content-Type": "application/json" },
	// 		method: "GET"
	// 	})
	// 	.then(res => {
			
	// 	})
	// }

	public render() {
		return (
			<div className="home-body">
				<Blog userid={this.props.id}  />
			</div>
		)

	}
}