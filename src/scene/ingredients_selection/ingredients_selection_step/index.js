import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './style.scss';

class IngredientsSelectionStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected_formulation: this.props.ingredientsInfo.selected_formulation  || {},
			selected_ingredients: this.props.ingredientsInfo.selected_ingredients  || [],
			selected_ingredient: {},
			selected_ingredient_percentage: 0,
		};

		this.onFormulationChange = this.onFormulationChange.bind(this);
		this.onIngredientChange = this.onIngredientChange.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.onIngredientAmountChange = this.onIngredientAmountChange.bind(this);
		this.isAlreadyAdded = this.isAlreadyAdded.bind(this);
		this.getSelectedIngredients = this.getSelectedIngredients.bind(this);
		this.getIngredientInfo = this.getIngredientInfo.bind(this);
		this.onSelectedIngredientPercentageChange = this.onSelectedIngredientPercentageChange.bind(this);
		this.getProperPercentage = this.getProperPercentage.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let temp_state = {};
		if (nextProps.ingredientsInfo.selected_formulation) {
			temp_state.selected_formulation = nextProps.ingredientsInfo.selected_formulation
		}
		if (nextProps.ingredientsInfo.selected_ingredients) {
			temp_state.selected_ingredients = nextProps.ingredientsInfo.selected_ingredients
		}
		this.setState(temp_state)
	}

	componentWillUnmount() {
		this.props.saveIngredients(this.state.selected_ingredients);
	}

	onFormulationChange(formulation) {
		this.props.onFormulationChange(formulation);
	}

	getProperPercentage(ingredient, percentage) {
		if (ingredient.maximum_percentage < percentage) {
			percentage = ingredient.maximum_percentage;
		}
		if (ingredient.minimum_percentage > percentage) {
			percentage = ingredient.minimum_percentage;
		}
		return percentage;
	}
	onIngredientChange(ingredient) {
		this.setState({
			selected_ingredient: ingredient,
			selected_ingredient_percentage: this.getProperPercentage(ingredient, this.state.selected_ingredient_percentage)
		})
	}	

	onIngredientAmountChange(ingredient, percentage) {
		let { selected_ingredients } = this.state;
		selected_ingredients = selected_ingredients.map((_ingredient, key) => {
			if (_ingredient.id == ingredient.id) {
				let _ingredient_info = this.getIngredientInfo(_ingredient.id);
				return {..._ingredient, percentage: this.getProperPercentage(_ingredient_info, percentage)}
			}
			else {
				return _ingredient;
			}
		})
		this.setState({
			selected_ingredients: selected_ingredients
		})
	}

	onSelectedIngredientPercentageChange(percentage) {
		this.setState({selected_ingredient_percentage: this.getProperPercentage(this.state.selected_ingredient, percentage) })		
	}

	getSelectedIngredients() {
		return this.state.selected_ingredients;
	}

	addIngredient() {
		let {selected_ingredients, selected_ingredient, selected_ingredient_percentage} = this.state;
		this.setState({
			selected_ingredients: selected_ingredients.concat({
				id: selected_ingredient.id, 
				percentage: selected_ingredient_percentage
			}),
			selected_ingredient: {},
			selected_ingredient_percentage: 0
		})
	}

	deleteIngredient(ingredient) {
		let {selected_ingredients} = this.state;
		let _selected_ingredients = selected_ingredients.filter( _ingredient => { return _ingredient.id != ingredient.id} )
		this.setState({
			selected_ingredients: _selected_ingredients
		})
	}

	getIngredientInfo(ingredient_id) {
		let {ingredients_array} = this.props.ingredientsInfo;
		let temp = ingredients_array.filter(ingredient => { return ingredient.id == ingredient_id } );
		return temp[0];
	}

	isAlreadyAdded(ingredient_id) {
		let {selected_ingredients} = this.state;
		if (!selected_ingredients) {
			return false;	
		}  
		else {
			let temp = selected_ingredients.filter(ingredient => { return ingredient.id == ingredient_id } );
			return temp.length == 0 ? false : true;			
		}
	}

	render() {
		let { user_profile, selected_formulation, selected_ingredients, selected_ingredient, selected_ingredient_percentage } = this.state;
		let { formulations_array, ingredients_array } = this.props.ingredientsInfo;
		let ingredients_list = selected_ingredients.map((ingredient, key) => {
			let ingredient_info = this.getIngredientInfo(ingredient.id)
			if (!ingredient_info) {
				return '';
			}
			else {
				return (
					<div key={key} className="row ingredient-item">
						<div className="col-sm-8 ingredient-name">
							{ingredient_info.name}
						</div>
						<div className="col-sm-3">
							<input 
								type="number"
								placeholder="percentage"
								value={ingredient.percentage}
								onChange={ e => this.onIngredientAmountChange(ingredient, e.target.value)}
								className="form-control"
								min={ingredient_info.minimum_percentage}
								max={ingredient_info.maximum_percentage}
								step={0.01}
							/>								
						</div>
						<div className="col-sm-1">
						<button 
							className="btn btn-raised green"
							onClick={ e => this.deleteIngredient(ingredient) } >
							<i className="fa fa-remove"></i>
						</button>
						</div>
					</div>
				)
			}
		})
		return (
			<div className="row ingredients-step ingredients-selection-step">
				<div className="col-sm-12 sub-header"> 
					<h3>{this.props.stepTitle}</h3>
				</div>
				<div className="col-sm-12 sub-content">
					<div className="row formulation-selector">
						<div className="col-sm-12">
						    <DropdownButton
						      title={selected_formulation.name || "Formulations"}
						      id="formulation-selector"
						    >
							{
								formulations_array.map((formulation, key) => {
									return (
								    	<MenuItem key={key} eventKey={formulation.id} onSelect={() => this.onFormulationChange(formulation)}>{formulation.name}</MenuItem>
									) 
								})
							}
						    </DropdownButton>			
						</div>					
					</div>
					<div className="row add-ingredient">
						<div className="col-sm-8 ingredient-selector">
						    <DropdownButton
						      title={selected_ingredient.name || "Ingredients"}
						      id="ingredient-selector"
						    >
							{
								ingredients_array.map((ingredient, key) => {
									return (
								    	!this.isAlreadyAdded(ingredient.id) ? <MenuItem key={key} eventKey={ingredient.id} onSelect={() => this.onIngredientChange(ingredient)}>{ingredient.name}</MenuItem> : ''
									) 
								})
							}
						    </DropdownButton>								
 						</div>
 						<div className="col-sm-3">
 							<input 
 								type="number"
 								placeholder="percentage"
 								value={this.state.selected_ingredient_percentage}
 								onChange={ (e) => { this.onSelectedIngredientPercentageChange(e.target.value) }}	 
 								className="form-control" 	
 								step={0.01}	
 								min={this.state.selected_ingredient.minimum_percentage ? this.state.selected_ingredient.minimum_percentage : 0}
 								max={this.state.selected_ingredient.maximum_percentage ? this.state.selected_ingredient.maximum_percentage : 100}						
 							/>								
 						</div>
 						<div className="col-sm-1">
							<button 
								className="btn btn-raised green"
								onClick={ e => this.addIngredient() } 
								disabled={ !selected_ingredient.id || selected_ingredient_percentage == 0 }>
								<i className="fa fa-plus"></i>
							</button>
 						</div>
					</div>
					<div className="row selected-ingredients">
						{ingredients_list}
					</div>
				</div>
            </div>
		);
	}
}

IngredientsSelectionStep.propTypes = {
	ingredientsInfo: PropTypes.object,
}
export default IngredientsSelectionStep;
