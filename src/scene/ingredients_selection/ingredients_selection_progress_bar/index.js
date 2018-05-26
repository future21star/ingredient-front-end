import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Steps, { Step } from 'rc-steps';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

import './style.scss';

class IngredientsSelectionProgressBar extends React.Component {

	render() {
		const currentStep = this.props.currentStep;
		const Icon = ({ type }) => <i className={`rcicon rcicon-${type}`} />;
		const ImageIcon = ({ url, step, title }) => {
			return (
				<div>
					<div className="avatar-header" onClick={() => {this.props.changeStep(step)}}>
						<img className="rcicon avatar-icon" src={url} />
					</div>
					<span className="step-name"> {title} </span>
				</div>
			);
		}
		return (
			<div className="IngredientsSelectionProgressBar fluid-container">
				<div className="row">
		      		<Steps current={currentStep-1} size="big">
					    <Step 
					    	icon={<ImageIcon 
					    		url="/styles/assets/images/step1.png" 
					    		title={this.props.titleList[0]}
					    		step={1} />} />
					    <Step 
					    	icon={<ImageIcon 
					    		url="/styles/assets/images/step2.png" 
					    		step={2} 
					    		title={this.props.titleList[1]}
					    		/>} />
					 </Steps>
		    	</div>
			</div>
		);
	}

}

IngredientsSelectionProgressBar.propType = {
	currentStep: PropType.number,
	changeStep: PropType.func,
	titleList: PropType.array
}

export default IngredientsSelectionProgressBar;

