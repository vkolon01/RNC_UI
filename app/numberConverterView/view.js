'use strict';

angular.module('myApp.conversion', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/converter', {
        templateUrl: 'numberConverterView/view.html',
        controller: 'converterController'
      });
    }])

    .controller('converterController', ['$scope', '$http',function($scope, $http) {
        $scope.arabic = "";
        $scope.roman = "";
        $scope.error = "";

        $scope.convertToRoman = function(){
            $http({method: 'GET', url: 'http://localhost:5000/roman/' + $scope.arabic})
                .success(function(data){
                    $scope.roman = data.convertedValue;
                    $scope.error = '';
                }).error(function(data,status){
                console.log(data, status);
                $scope.roman = '';
                if(status != 404) $scope.error = data;
                else $scope.error = '';
            });
        };
        $scope.convertToArabic = function(){
            $http({method: 'GET', url: 'http://localhost:5000/arabic/' + $scope.roman})
                .success(function(data){
                    $scope.arabic = data.convertedValue;
                    $scope.error = '';
                }).error(function(data,status){
                $scope.arabic = '';
                if(status != 404) $scope.error = data;
                else $scope.error = '';
            });
        }
    }]);
