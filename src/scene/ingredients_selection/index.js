import React from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import './style.scss';

import UserProfileStep from './user_profile_step';
import IngredientsSelectionStep from './ingredients_selection_step';
import IngredientsSelectionProgressBar from './ingredients_selection_progress_bar';

import * as ingredientsActions from '../../services/actions/ingredients';

const mapDispatchToProps = (dispatch) => {
    return ({
    	saveUserProfile: () => { getCircles(dispatch); }, 
        actions: bindActionCreators({ ...ingredientsActions }, dispatch)    	
    });
}

const mapStateToProps = (state) => {
    return ({ 
        ...state.ingredients
    });
}


const stepTitleList = [
	"User Profile",
	"Select Ingredient",
];

class IngredientsSelection extends React.Component {
	constructor(props) {
		super(props);
		this.props.actions.getAllIngredients();
		this.props.actions.getAllFormulations();
		this.state = {
			currentStep: 1,
			user_profile: {},
			selected_formulation: {},
			selected_ingredients: []
		}
		this.changeCurrentStep = this.changeCurrentStep.bind(this);
		this.saveUserProfile = this.saveUserProfile.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.onFormulationChange = this.onFormulationChange.bind(this);
		this.saveIngredients = this.saveIngredients.bind(this);
		this.finalize = this.finalize.bind(this);
	    this.isFinalizable = this.isFinalizable.bind(this);
	    this.ingredients_selection_step = null;
	    this.setIngredientsSelectionStep = element => {
	      this.ingredients_selection_step = element;
	    };		
	}

	saveUserProfile(user_profile) {
		this.setState({ user_profile: user_profile })
	}

	saveIngredients(selected_ingredients) {
		this.props.actions.saveIngredients(selected_ingredients);
	}

	changeCurrentStep(step) {
		this.setState({ currentStep: step })
	}

	onFormulationChange(formulation) {
		this.props.actions.changeFormulation(formulation);
		this.setState({
			selected_ingredients: this.props.selected_ingredients
		})
	}

	gotoPrevious() {
		this.setState({ currentStep: 1 });
	}

	gotoNext() {
		this.setState({ currentStep: 2 });
	}

	finalize() {
		this.props.actions.printPDF(this.state.user_profile, this.ingredients_selection_step.getSelectedIngredients());
	}

	isFinalizable() {
		if (this.state.user_profile.first_name && this.state.user_profile.last_name && this.ingredients_selection_step.getSelectedIngredients().length > 0) {
			return true;
		} 
		else {
			return false;
		}
	}
	render() {
		let {currentStep} = this.state;
		let steps = [
			{
				component: <UserProfileStep 
					stepTitle="User Profile" 
					userProfile={this.state.user_profile} 
					saveUserProfile={this.saveUserProfile} />, 
				stepTitle: "User Profile"
			},
			{
				component: <IngredientsSelectionStep 
					stepTitle="Select Ingredient" 
					ingredientsInfo={this.props} 
					onFormulationChange = {this.onFormulationChange} 
					saveIngredients={this.saveIngredients} 
					ref={this.setIngredientsSelectionStep} />, 
				stepTitle: "Select Ingredient"
			},
		];		
		return (
			<div className="ingredients-selection container-fluid">
		        <div className="row header">
		            <h2>Ingredients Selection</h2>
		        </div>
		        <div className="row">
		        	<div className="col-sm-6 col-sm-offset-3">		        	
				        <IngredientsSelectionProgressBar
				        	currentStep={currentStep}
				        	changeStep={this.changeCurrentStep}
				        	titleList={stepTitleList} />
				    </div>
		        </div>

				<div className="row step-container">
					{steps[currentStep-1].component}
					<a download="report.pdf" id="dwnldLnk" href="#" style={{"display":"none"}} />
					<div className="row step-panel">					
						<div className="col-sm-12">
		                    <button 
		                        onClick={ e => this.gotoPrevious() }
		                        className="btn btn-default prev-button" 
		                        style={currentStep == 1 ? {"display":"none"} : {"display":"block"}}>
		                        Previous
		                    </button>
		                    <button 
		                        onClick={ e => this.gotoNext() }
		                        className="btn btn-default next-button" 
		                        style={currentStep == 2 ? {"display":"none"} : {"display":"block"}}>
		                        Next
		                    </button>
		                    <button 
		                        onClick={ e => this.finalize() }
		                        className="btn btn-default final-button" 
		                        style={currentStep == 2 ? {"display":"block"} : {"display":"none"}}>
		                        Finalize
		                    </button>
		                </div>
					</div>
				</div>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsSelection);