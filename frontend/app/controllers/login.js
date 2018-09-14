import Ember from 'ember';

export default Ember.Controller.extend({
	auth: Ember.inject.service('auth-manager'),
	actions:{
		login: function(){
			this.get('auth').login();
		},
		logout: function(){
			this.get('auth').logout();
		}
	}
});
