import { INGREDIENTS, COMMON } from './types';
import { GET, POST, PUT, DELETE,PATCH } from './http.service';
import { API_URL } from '../env';



export const getAllIngredients = function() {
	return (dispatch) => {
		let BASE_URL = API_URL+'api/v1/ingredients/';
		dispatch({ type: COMMON.SERVER_REQUEST})
	  	return GET(BASE_URL).then((data) => {
	      	dispatch({ type: INGREDIENTS.GET_ALL_INGREDIENTS, payload:{ingredients_array: data.ingredients}})
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	  	}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})
	}	
}

export const getAllFormulations = function() {
	return (dispatch) => {
		let BASE_URL = API_URL+'api/v1/formulations/';
		dispatch({ type: COMMON.SERVER_REQUEST})
	  	return GET(BASE_URL).then((data) => {
	      	dispatch({ type: INGREDIENTS.GET_ALL_FORMULATIONS, payload:{formulations_array: data.formulations}})
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	  	}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})
	}	
}

export const saveUserProfile = function(user_profile) {
	return (dispatch) => {
		dispatch({ type: INGREDIENTS.SAVE_USER_PROFILE, payload:{user_profile: user_profile}})	
	};
}

export const changeFormulation = function(selected_formulation) {
	return (dispatch) => {
		let BASE_URL = API_URL + 'api/v1/formulation_ingredients/' + selected_formulation.id + '/getIngredientsWithFormulationId';
		dispatch({ type: COMMON.SERVER_REQUEST})
	  	return GET(BASE_URL).then((data) => {
	  		let _selected_ingredients = data.formulation_ingredients;
	  		let selected_ingredients = _selected_ingredients.map((ingredient, key) => {
	  			return { id: ingredient.ingredient_id, percentage: ingredient.percentage };
	  		})
	      	dispatch({ type: INGREDIENTS.SELECT_FORMULATION, payload:{selected_formulation: selected_formulation, selected_ingredients: data.formulation_ingredients}})
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	  	}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})		
	}
}

export const printPDF = function(user_profile, selected_ingredients) {
	return (dispatch) => {
		let BASE_URL = API_URL + 'api/v1/print_pdf';
		dispatch({ type: COMMON.SERVER_REQUEST})
	  	return POST(BASE_URL, {user_profile: user_profile, selected_ingredients: selected_ingredients}).then((data) => {
			let pdf_content = 'data:application/octet-stream;base64,' + data.pdf
		    var dlnk = document.getElementById('dwnldLnk');
		    dlnk.href = pdf_content;
		    dlnk.click();			
	  	}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})		
	}	
}
export const saveIngredients = function(selected_ingredients) {
	return (dispatch) => {
		dispatch({type:INGREDIENTS.SAVE_INGREDIENTS, payload: {selected_ingredients: selected_ingredients}});
	}
}

// export const getEmailTemplates = function(){
// 	console.log('action templates')
// 	return (dispatch) => {

// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 	  	return GET(BASE_URL).then((data) => {
// 	  		console.log('action templates result', data)
// 	      	dispatch({ type: INGREDIENTS.GET_ALL, payload:{data: data}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 	  	}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 	  	})
// 	}
// }

// export const createEmailTemplate = function(emailtemplate) {
// 	return (dispatch) => {
// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 		return POST(BASE_URL, emailtemplate).then(res => {
			
// 	      	dispatch({ type: INGREDIENTS.CREATE_EMAILTEMPLATE, payload: {emailtemplate: res}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 		}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 			throw err;
// 	  	})
// 	}
// }

// export const updateEmailTemplate = (emailtemplate, obj) => {
// 	return (dispatch) => {
// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 		return PATCH(BASE_URL+emailtemplate.id+'/', obj).then(res => {
			
// 	      	dispatch({ type: INGREDIENTS.UPDATE_EMAILTEMPLATE, payload: {emailtemplate: res}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 		}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 			throw err;
// 	  	})
// 	}
// }

// export const deleteEmailTemplate = (id) => {

// 	return (dispatch) => {
// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 		return DELETE(BASE_URL+id+'/').then(res => {
			
// 	      	dispatch({ type: INGREDIENTS.DELETE_MEMBER, payload: {id: id}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 		}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 			throw err;
// 	  	})
// 	}
// }

