import React, { Component } from 'react';
import { Button } from 'react-native-material-design';

class CustomButton extends Component {
	render() {
		return <Button {...this.props} />;
	}
}

export default CustomButton;
