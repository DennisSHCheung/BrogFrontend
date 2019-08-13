import * as React from 'react';

import Post from './Post';

interface IState {
	blog: any
}

interface IProps {
	userid: any
}

export default class Blog extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);
		this.state = {
			blog: (<div />)
		}
		this.fetchPosts = this.fetchPosts.bind(this);
	}

	public componentDidMount() {
		this.fetchPosts();
	}

	public fetchPosts() {
		fetch(`https://msabrogdevops.azurewebsites.net/getPosts?id=${this.props.userid}`, {
			method: "GET"
		})
		.then(res => {
			return res.json();
		})
		.then(res => {
			if (res.response === "empty") {
				this.setState({ blog: "empty" });
			} else {
				const posts = res.response.map((user: any, i: any) => {
					return (
						<Post 
							post={res.response[i]}
							key={i}
						/>
					)
				})
				console.log(res.response);
				this.setState({ blog: posts });
			}
		})
	}

	public render() {

		return (
			<div className="post-list-div">
				{this.state.blog}
			</div>
		)
	}
}