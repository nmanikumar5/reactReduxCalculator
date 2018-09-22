import React, { Component } from 'react';
import { typography } from 'react-native-material-design-styles';
const typographyStyle = StyleSheet.create(typography);
// import { Button } from 'react-native-material-design';

class CustomButton extends Component {
	render() {
		// return <Text {...this.props}>{this.props.children}</Text>;
		return <Text style={typographyStyle.paperFontCaption}>{this.props.children}</Text>;
	}
}

export default CustomButton;
