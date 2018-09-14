import Ember from 'ember';

export default Ember.Service.extend({
	store: Ember.inject.service('store'),
	routing: Ember.inject.service('-routing'),

	//field vars
	username: '',
	password: '',
	remember: false,
	errorMsg: '',

	//stored data
	user: null,
	profile: null,
	isLoggedIn: false,
	login: function(){
		console.log('Logging in:');

		//retrieve field data
		var username = this.get('username');
		var password = this.get('password');
		var remember = this.get('remember');

		var data = {
			'username': username,
			'password': password};
		var auth = this;

		//make api request
		Ember.$.post('/api/session', data, function(response){

			if(response.isauthenticated){
				//success
				auth.set('userid', response.userid);
				auth.set('isLoggedIn', true);

				if(remember){
					//save username and pass to local storage
					localStorage.setItem('remember', true);
					localStorage.setItem('username', auth.get('username'));
					localStorage.setItem('password', auth.get('password'));
				}
				else{
					localStorage.removeItem('remember');
					localStorage.removeItem('username');
					localStorage.removeItem('password');
				}
				auth.set('password', '');


				auth.get('routing').transitionTo('index');

        console.log('Login POST Request to /api/session/ was successful.');


			} else{
				//errors
				console.log('Login POST Request to /api/session/ was unsuccessful.');
				auth.set('errorMsg', response.data.message);
			}
		});

	},
	logout: function(){
		console.log('Logging out');
		var auth = this;
		Ember.$.ajax({url: '/api/session', type: 'DELETE'}).then(
			function(response){
				console.log('Logout DELETE Request to /api/session/ was successful:' + response);
				auth.set('isLoggedIn', false);
				auth.set('errorMsg', '');
				auth.set('username', '');
				auth.set('user', null);
				auth.set('profile', null);

				if(localStorage.remember) {
					auth.set('remember', localStorage.remember);
					auth.set('username', localStorage.username);
					auth.set('password', localStorage.password);
				}

				auth.get('routing').transitionTo('login');

			}
		);
	},
	/**
		called whenever the application loads to initialize any stored session/local variables
	**/
	init: function(){
		this._super();
		var auth = this;

		//handle session and local variable loading
		this.set('remember', localStorage.remember);

		if(auth.get('remember')){
			auth.set('username', localStorage.username);
			auth.set('password', localStorage.password);
		}

		//check to see if the user is logged into the API
		Ember.$.get('/api/session', function(response){
			if(response.isauthenticated){
				//success
				console.log('The user: \''+response.username+'\' is currently logged in.');
				auth.set('username', response.username);
				auth.set('userid', response.userid);
				auth.set('isLoggedIn', true);
			} else{
				//errors
				console.log('The user is not currently logged in.');
			}
		});
	}
});
