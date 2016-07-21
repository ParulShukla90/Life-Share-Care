"use strict";
angular.module("agency")
lifeShareCare.controller("agencyCtrl", ['$scope','$timeout','agencyService','NgTableParams','$window', function($scope,$timeout,agencyService,NgTableParams,$window) {
    $scope.agency = {};
    $scope.date = new Date();
    /*
     *function to add agency
    */
    $scope.saveAgency = function(){
        if($scope.agency.email_id){
            agencyService.addAgency($scope.agency, function(err,response){
                if(err){
                    if(err.status ==401){
                        $window.location.href = baseUrl+"/login";
                    }else{
                        $scope.msg = "Something went wrong.";
                        $timeout(function(){
                            $scope.msg = "";    
                        },2000)
                    }
                }else{
                    $scope.pageMsg = "Invite has been sent to" + $scope.agency.email_id+". Please note that the registeration link will expire after 24 hours.";
                    $scope.agency = {};
                    $('#agencyModal').modal('hide')
                    $timeout(function(){
                        $scope.pageMsg = "";    
                    },5000)
                    $scope.agencies = response.data.data;
                    $scope.initTable();
                }
            })
        }else{
            $scope.addMsg = "Please enter valid values to the fields.";
            $timeout(function(){
                $scope.addMsg = null;
            },2000)
        }
    };
    
    /*
     *    get all invitaions sent by admin
    */
    $scope.getAllInvites= function(){
        agencyService.getAllInvites(function(err,response){
            if(err){
                if(err.status ==401){
                    $window.location.href = baseUrl+"/login";
                }else{
                    $scope.pageMsg = "Error while loading data!!";
                    $timeout(function(){
                        $scope.pageMsg = "";    
                    },5000)
                }
            }else{
                $scope.agencies = response.data.data;
                $scope.initTable();
            }
        })
    }
    
    
    $scope.initTable= function(){
        $scope.tableParams = new NgTableParams({
            count: 10
        }, {
            total: $scope.agencies.length,
            counts: [],
            data: $scope.agencies
        });
    }
}]);