"use strict"
angular.module("agencyReg")
.factory('agencyRegService', ['$http', 'communicationService', function($http, communicationService) {
		var service = {};
		service.registerAgency = function(postData,callback) {
			communicationService.resultViaPost(webservices.registerAgency, headerConstants.json,postData, function(err,response) {
				callback(err , response);
			});
		};
        

		return service;
	}]);