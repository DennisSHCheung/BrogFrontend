import * as React from 'react';

interface IProps {
	post: any
}

export default class Post extends React.Component<IProps, {}> {

	constructor(props: any) {
		super(props);
	}

	public render() {

		return (
			<div className="post-div">
				<div className="title-div">
					<p className="title-text">
						{this.props.post.title}
					</p>
				</div>
				<div className="content-div">
					<p>
						{this.props.post.content}
					</p>
				</div>
			</div>
		)

	}
}