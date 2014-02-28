// create the AngularJS app
var app = angular.module("app", ['ngRoute']); // Sets up our app. Adding [] is setting us up for dependency injection, if we left those out it would be a getter, not a setter

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.when('/',            { templateUrl: 'welcome.html',  controller: 'WelcomeCtrl' });
    $routeProvider.when('/team',        { templateUrl: 'team.html',     controller: 'TeamCtrl' });
    $routeProvider.when('/team/:name',  { templateUrl: 'team.html',     controller:'TeamCtrl' });

    $routeProvider.otherwise({ redirectTo: '/' });

}]);

app.controller ("WelcomeCtrl", ['$scope', '$location',
  function ($scope, $location) {
    // the user's name
    $scope.name = "Qbert"

    $scope.viewTeam = function() {
      $location.path('/team/' + $scope.name);
    }
}]);

app.controller("TeamCtrl", ['$scope', '$location', '$routeParams', '$http',
  function ($scope, $location, $routeParams, $http) {

    $scope.name = $routeParams.name;

    $scope.goHome = function() {
      $location.path('/');
    }

    $scope.setSelected = function(member) {
      $scope.selected = member;
    }

    // load data in a not so clean way
    $http.get('/app/data/team.json').success(function(data) {
      $scope.team = data.team;
    });

}]);
