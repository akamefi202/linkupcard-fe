import React from 'react'
import { Row, Col, Typography, Input, Switch, message } from 'antd'
import "./index.css"
import { CopyOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';


function Share() {

	const { Title } = Typography;

	const success = () => {
		message.success('Your link is now public! Share your latest content with the world!');
	};

	const error = () => {
		message.error('Your link is private to you only. Hurry and edit before to share it with the world!');
	};

	const info = () => {
		message.info('Successfully copied your link to clipboard!');
	};

	message.config({
		top: 75,
		duration: 5,
		maxCount: 3,
		rtl: true,
	});

	return (
		<Row>
			<Col xs={{ span: 24 }}  md={{ span: 12, offset: 6 }} >
				<div className="middle-card">
					<Title level={3}>You're all set!</Title>
					<p className="paragraph">Copy and paste the link below to your favorite social media sites to reach your audiance.</p>
					<p><strong>Make your link public</strong></p>
					<Switch // need to save state to Card collection
						className="switch"
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
						onClick={success} //boolean event: diaply success or error message
					/>
					{/* add dynamic card link: root + username below */}
					{/* add icon click function and display info message from above */}
					<Input addonAfter={<CopyOutlined />} onClick={{info}} disabled defaultValue="http://www.linkup.com" />
				</div>
			</Col>
		</Row>
	)
}

export default Share