"use strict";
angular.module('agency',[]);
angular.module('adminMain',[]);
angular.module('communicationModule', []);
var lifeShareCare = angular.module('lifeShareCare', ['ui.router','agency','communicationModule','ngTable','adminMain'])
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
		
		var checkAdminLogin = function($q, $http){
			var deferred = $q.defer();
			$http.get(baseUrl+'/auth/getAdminSession').then(function(response){
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
					templateUrl: hash.retrieve('agencies_list'),
					controller:  "agencyCtrl",
					resolve : {checklogin :checkAdminLogin}
				},
				"header":{
					templateUrl: hash.retrieve('admin_header'),
				},
				"sidebar":{
					templateUrl: hash.retrieve('admin_sidebar'),
				}
			}
		});
	}]);