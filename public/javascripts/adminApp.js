"use strict";
angular.module('agency',[]);
angular.module('adminMain',[]);
angular.module('communicationModule', []);
var lifeShareCare = angular.module('lifeShareCare', ['ui.router','agency','communicationModule','ngTable','adminMain'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		var checkAdminLogin = function($q, $http){
			var deferred = $q.defer();
			$http.get(baseUrl+'/auth/getAdminSession',function(err,response){
				if(err){
					window.location.href = baseUrl +'/login';
					setTimeout(function() {	deferred.reject()},0);
				}else{
					setTimeout(function() {	deferred.resolve()},0);
				}
				return deferred.promise;
			})
			
		}
		
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: "/",
				views: {
					"": {
						templateUrl: "/modules/superAdmin/agency/views/agency.html",
						controller:  "agencyCtrl",
						resolve : {checklogin :checkAdminLogin}
					},
					"header":{
						templateUrl: "/modules/superAdmin/header/views/header.html",
					},
					"sidebar":{
						templateUrl: "/modules/superAdmin/sidebar/views/sidebar.html",
					}
				}
			});
	}]);