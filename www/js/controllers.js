angular.module('app.controllers', [])

  .controller('calcCtrl', function($scope) {

    $scope.screen="";

    $scope.zero = function() {$scope.screen+="0";};
    $scope.one = function() {$scope.screen+="1";};
    $scope.two = function() {$scope.screen+="2";};
    $scope.three = function() {$scope.screen+="3";};
    $scope.four = function() {$scope.screen+="4";};
    $scope.five = function() {$scope.screen+="5";};
    $scope.six = function() {$scope.screen+="6";};
    $scope.seven = function() {$scope.screen+="7";};
    $scope.eigth = function() {$scope.screen+="8";};
    $scope.nine = function() {$scope.screen+="9";};

    $scope.plus = function() {$scope.screen+="+";};
    $scope.minus = function() {$scope.screen+="-";};
    $scope.multiply = function() {$scope.screen+="*";};
    $scope.divide = function() {$scope.screen+="/";};
    $scope.clear = function() {$scope.screen="";};

   $scope.equal=function(){$scope.screen=eval($scope.screen);};

  })

  .controller('indexCtrl', function($scope,$state) {
    $state.go('calculator', {}, {location: "replace"});
  })

  .controller('settingsCtrl', function($scope) {

  })

  .controller('supportCtrl', function($scope) {

  })

