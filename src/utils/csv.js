
//Do not output in to csv; "id", "created_by", "updated_by", "assigned_user"
const keys = ["image", "username", "first_name", "last_name", "email", "email2", "email3", "fax", "birth_date", "title", "company", "office", "social_profile", "is_deleted", "phone_office", "phone_office2", "phone_office3", "phone_home", "phone_mobile", "phone_mobile2", "phone_mobile3", "account", "source", "website", "current_transcation", "merge_fromgoogle", "aniversary_date", "address", "address2", "zipcode", "state", "city", "address_2", "address2_2", "zipcode_2", "state_2", "city_2", "address_3", "address2_3", "zipcode_3", "state_3", "city_3", "address_4", "address2_4", "zipcode_4", "state_4", "city_4", "address_5", "address2_5", "zipcode_5", "state_5", "city_5", "location", "timezone", "lead_reference", "is_lead", "status", "hot_lead", "facebook", "twitter", "google_plus", "linkedin", "instagram", "tags", "notes"];
import _ from 'lodash';
export function makeCSVCompatiableJSONA(arr, interactions) {

	let ret = arr.map((lead)=>{
        let ret = {};
        
        let notes = interactions.filter(item=>item.lead==lead.id)
        for(let key in lead)
            if(keys.indexOf(key) != -1) {
                ret[key] = lead[key] != null ? lead[key] : '';
            }
        if(notes != 'undefined')
            ret['notes'] = notes.map(note=>note.description).join(';');
        return ret;
    });
    return ret;
}

//arr don't have enough fields
export function makeCSVCompatiableJSONB(arr) {

    let ret = arr.map((lead)=>{
        let ret = {};
        
        keys.map(key=>(ret[key] = lead[key] != null ? lead[key] : ''))
            
        return ret;
    });
    return ret;
}

export function makeBackendCompatiableJSON(arr) {
	let ret = arr.map((lead)=>{
        let ret = {};
        for(let key in lead) {
        	if(lead[key] != '') {
        		ret[key] = lead[key];
        		if (ret[key] == "true") ret[key] = true
        		else if (ret[key] == "false") ret[key] = false
        	}
        }
        if(ret['is_lead'] == '' || !ret['is_lead'] )
            ret['is_lead'] = false;
        if( !ret['notes'] )
            ret['notes'] = "";
        return ret;

    });

    return ret;
}

export function getSample() {
    let obj = {};
    for (let key in keys) 
        obj[keys[key]] = '';
    let arr = [obj];
    return arr;
}
