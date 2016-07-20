"use strict";
var lifeShareCare = angular.module('lifeShareCare', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: "/",
				views: {
					"": {
						templateUrl: "/modules/superAdmin/agency/views/agency.html",
					},
					"header":{
						templateUrl: "/modules/superAdmin/header/views/header.html",
					},
					"sidebar":{
						templateUrl: "/modules/superAdmin/sidebar/views/sidebar.html",
					}
				}
			})
	}])