import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

class UserProfileStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			first_name: "",
			last_name: "",
			address: "",
			birthday: moment(),
			...props.userProfile
		}
		this.updateUserProfile = this.updateUserProfile.bind(this);
	}

	updateUserProfile(obj) {
		this.setState(obj);
		this.props.saveUserProfile({...this.state, ...obj});
	}

	render() {
		const { userProfile } = this.state;
		return (
			<div className="row ingredients-step user-profile-step">
				<div className="col-sm-12 sub-header"> 
					<h3>{this.props.stepTitle}</h3>
				</div>
				<div className="col-sm-12 sub-content">
					<div className="row">							
						<div className="col-sm-6 form-group">
							<label for="first_name">First Name</label>
							<input 
								type="text"
								placeholder="First Name"
								value={this.state.first_name}
								onChange={e => this.updateUserProfile({ first_name: e.target.value }) }
								className="form-control" />
 						</div>
						<div className="col-sm-6 form-group">
							<label for="last_name">Last Name</label>
							<input 
								type="text"
								placeholder="Last Name"
								value={this.state.last_name}
								onChange={e => this.updateUserProfile({ last_name: e.target.value }) }
								className="form-control" />
						</div>
						<div className="col-sm-6 form-group">
							<label for="address">Address</label>
							<input 
								type="text"
								placeholder="Address"
								value={this.state.address}
								onChange={e => this.updateUserProfile({ address: e.target.value }) }
								className="form-control" />
						</div>
						<div className="col-sm-6 form-group">			
							<label for="birthday">Birthday</label>
							<DatePicker
						        selected={this.state.birthday}
						        onChange={(date) => this.updateUserProfile({ birthday: date })}
						        className="form-control" />						
						</div>		
					</div>				
				</div>
            </div>
		);
	}
}

UserProfileStep.propTypes = {
	userProfile: PropTypes.object,
	saveUserProfile: PropTypes.func
}

export default UserProfileStep;

