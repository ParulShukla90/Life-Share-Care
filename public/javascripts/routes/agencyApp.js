"use strict";
angular.module('communicationModule', []);
var lifeShareCare = angular.module('lifeShareCare', ['ui.router','communicationModule','ui.bootstrap'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		getHash()
		function getHash(){
			$.ajax({url :baseUrl+'/auth/directories',type: 'get', async: false,
				success : function(res){
					for(var i = 0; i < res.length; i++){
						hash.insert( res[i].title, res[i].path );
					}
				},error: function(err){
					window.location.href = baseUrl +'/login';
				}
			})
		}
		var checkAgencyLogin = function($q, $http){
			var deferred = $q.defer();
			console.log(1);
			$http.get(baseUrl+'/auth/getAgencySession').then(function(res){
				setTimeout(function() {	deferred.resolve()},0);
				return deferred.promise;
			},function(response){
				window.location.href = baseUrl +'/login';
				setTimeout(function() {	deferred.reject()},0);
			})
		}
		
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: "/",
				views: {
					"": {
						templateUrl: hash.retrieve('agency_dashboard'),
						resolve : {checklogin :checkAgencyLogin}
					},
					"header":{
						templateUrl: hash.retrieve('agency_header'),
					},
					"sidebar":{
						templateUrl: hash.retrieve('agency_sidebar'),
					}
				}
			})
			.state('patients', {
				url: "/patients",
				views: {
					"": {
						templateUrl: hash.retrieve('agency_patient'),
						resolve : {checklogin :checkAgencyLogin}
					},
					"header":{
						templateUrl: hash.retrieve('agency_header'),
					},
					"sidebar":{
						templateUrl: hash.retrieve('agency_sidebar'),
					}
				}
			})	
			;
	}]);