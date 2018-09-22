'use strict';

import React from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import {
	OPERATION_ADD,
	OPERATION_SUBTRACT,
	OPERATION_DIVIDE,
	OPERATION_MULTIPLY,
	CLEAR_RESULT,
} from '../../actions/types';
import { Button } from '../../components';
const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');
var Types = {
	NUMBER: 'NUMBER',
	DECIMAL: 'DECIMAL',
	SIGN: 'SIGN',
};

var inputs = [
	{ value: 1, type: Types.NUMBER },
	{ value: 2, type: Types.NUMBER },
	{ value: 3, type: Types.NUMBER },
	{ value: 4, type: Types.NUMBER },
	{ value: 5, type: Types.NUMBER },
	{ value: 6, type: Types.NUMBER },
	{ value: 7, type: Types.NUMBER },
	{ value: 8, type: Types.NUMBER },
	{ value: 9, type: Types.NUMBER },
	{ value: '+/-', type: Types.SIGN },
	{ value: 0, type: Types.NUMBER },
	{ value: '.', type: Types.DECIMAL },
];
var operations = [
	{ value: '/', color: '#00cc00', altColor: '#4d79ff', operation: OPERATION_DIVIDE },
	{ value: '-', color: '#f8b055', altColor: '#4d79ff', operation: OPERATION_SUBTRACT },
	{ value: '+', color: '#ff5c33', altColor: '#4d79ff', operation: OPERATION_ADD },
	{ value: 'x', color: '#666666', altColor: '#4d79ff', operation: OPERATION_MULTIPLY },
];

class Inputs extends React.Component {
	render() {
		return (
			<View style={this.props.style}>
				<View style={{ flex: 3, flexDirection: 'row' }}>
					<View style={{ width: windowSize.width - 90, backgroundColor: '#bfbfbf' }}>
						{this.renderInputRows()}
					</View>
					<View style={{ width: 90 }}>{this.renderOperationRow()}</View>
				</View>
				<View style={{ flex: 1 }}>{this.renderActionRow()}</View>
			</View>
		);
	}
	renderInputRows() {
		var { inputNumber, inputSigned, inputDecimal } = this.props;
		return inputs
			.reduce(
				(collection, input) => {
					if (collection[collection.length - 1].length === 3) {
						collection.push([]);
					}
					collection[collection.length - 1].push(input);
					return collection;
				},
				[[]]
			)
			.map((group, rowIndex) => {
				var columns = group.map((item, columnIndex) => {
					return (
						<TouchableHighlight
							key={'inputRow_' + rowIndex + '_inputCol_' + columnIndex}
							underlayColor="#ededed"
							style={styles.input}
							onPress={() => {
								if (item.type === Types.NUMBER) {
									inputNumber(item.value);
								} else if (item.type === Types.DECIMAL) {
									inputDecimal();
								} else if (item.type === Types.SIGN) {
									inputSigned();
								}
							}}
						>
							<Text style={styles.inputText}>{item.value}</Text>
						</TouchableHighlight>
					);
				});

				return (
					<View style={[styles.row, styles.inputRow]} key={'inputRow_' + rowIndex}>
						{columns}
					</View>
				);
			});
	}
	renderOperationRow() {
		var { performOperation } = this.props;
		var columns = operations.map((operation, index) => {
			return (
				<TouchableHighlight
					key={'operationRow' + index}
					style={[styles.operationInput, { backgroundColor: operation.color }]}
					underlayColor={operation.altColor}
					onPress={() => performOperation(operation.operation)}
				>
					<Text style={styles.operationInputText}>{operation.value}</Text>
				</TouchableHighlight>
			);
		});
		return <View style={[styles.col, styles.operationCol]}>{columns}</View>;
	}
	renderActionRow() {
		var {
			calculate,
			// undo,
			clearResult,
		} = this.props;
		return (
			<View style={[styles.row, styles.actionRow]}>
				<TouchableHighlight style={[styles.actionButton]} unerlayColor="#bfe4be" onPress={clearResult}>
					<Text style={[styles.actionButtonText]}>C</Text>
				</TouchableHighlight>

				{/* <Button
					raised={true}
					Container
					text="AC"
					style={[styles.actionButton, styles.actionButtonEquals]}
					unerlayColor="#bfe4be"
					onPress={clearResult}
				/>
				<Button
					raised={true}
					text="="
					style={[styles.actionButton, styles.actionButtonEquals]}
					unerlayColor="#bfe4be"
					onPress={calculate}
				/> */}

				<TouchableHighlight style={[styles.actionButton]} unerlayColor="#bfe4be" onPress={calculate}>
					<Text style={[styles.actionButtonText]}>=</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
	},
	col: {
		flexDirection: 'column',
		flex: 1,
	},
	inputRow: {
		borderBottomWidth: 1,
		borderBottomColor: '#ededed',
	},
	input: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: '#ededed',
	},
	text: {
		color: '#000',
		fontSize: 18,
	},
	operationCol: {
		flex: 1,
		alignItems: 'center',
	},

	operationInput: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 90,
	},
	inputText: {
		color: '#ffffff',
		fontSize: 30,
	},
	operationInputText: {
		color: '#ffffff',
		fontSize: 30,
	},
	actionRow: {
		flex: 1,
		justifyContent: 'space-around',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
	},
	actionButton: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10,
	},
	actionButtonText: {
		fontSize: 24,
	},
	actionButtonEquals: {
		marginLeft: 10,
		borderColor: '#bfe4be',
		fontSize: 30,
	},
});

export default Inputs;
