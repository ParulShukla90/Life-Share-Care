"use strict";
angular.module('communicationModule', []);
var lifeShareCare = angular.module('lifeShareCare', ['ui.router','communicationModule'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
						templateUrl: "/modules/agency/dashboard/views/dashboard.html",
						resolve : {checklogin :checkAgencyLogin}
					},
					"header":{
						templateUrl: "/modules/agency/header/views/header.html",
					},
					"sidebar":{
						templateUrl: "/modules/agency/sidebar/views/sidebar.html",
					}
				}
			});
	}]);