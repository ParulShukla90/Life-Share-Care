"use strict";
angular.module("agencyReg")
.controller("agencyRegCtrl", ['$scope','agencyRegService', function($scope,agencyRegService) {
  $scope.registerAgency =function(email,token){
    $scope.user.inviteId =token;
    $scope.user.email =email;
    console.log(token);
    agencyRegService.registerAgency($scope.user,function(err,response){
        if(err){
            $scope.errorMsg = err.data.msg;
            setTimeout(function(){$scope.errorMsg = '';},5000)
        }else{
            $scope.msg = "Agency registered successfully.";
            setTimeout(function(){$scope.msg = '';},5000)
        }
     })  
  }
  
}]);