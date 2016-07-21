"use strict"
angular.module("adminMain")
.factory('adminMainService', ['$http', 'communicationService', function($http, communicationService) {
    var service = {};
    service.checkAdminSession = function(postData,callback) {
        communicationService.resultViaPost(webservices.checkAdminSession, headerConstants.json,postData, function(err,response) {
            callback(err , response);
        });
    };
    return service;
}]);