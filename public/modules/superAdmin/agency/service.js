"use strict"
angular.module("agency")
.factory('agencyService', ['$http', 'communicationService', function($http, communicationService) {
		var service = {};
		service.addAgency = function(postData,callback) {
			communicationService.resultViaPost(webservices.inviteAgency, headerConstants.json,postData, function(err,response) {
				callback(err , response);
			});
		};
        
                 service.getAllInvites = function(postData,callback) {
			communicationService.resultViaGet(webservices.getAllInvites, headerConstants.json,postData, function(err,response) {
				callback(err , response);
			});
		};

		return service;
	}]);