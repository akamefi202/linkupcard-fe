import React from 'react';
import { Row, Col } from 'antd';
import { Typography } from '@material-ui/core';
import Heart from '../Footer/heart.svg';
import './index.css';


function FooterApp() {
	return (
            <div className="container" justify="center">
                <Row className="footer" justify="center">
                    <Col align="center" xs={8} md={4}>
                        <a href="/privacy">Privacy Policy</a>
                    </Col>
                    <Col align="center" xs={8} sm={6} md={4}>
                        <a href="/terms">Terms and Conditions</a>
                    </Col>
                    {/* <Col align="center" xs={8} md={4}>
                        <a href="/cookies">Cookie Policy</a>
                    </Col> */}
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} span={24} className="end">
                        <Typography variant="caption" gutterBottom align="center">
                            Built with love <span> <img src={Heart} alt="heart" className="img-footer"/> </span> from Toronto
                        </Typography>
                    </Col>
                </Row>
            </div>
        );
    };

export default FooterApp;