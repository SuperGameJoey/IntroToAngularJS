// create the AngularJS app
var app = angular.module("app", ['ngRoute', 'ngResource']); // Sets up our app. Adding [] is setting us up for dependency injection, if we left those out it would be a getter, not a setter

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.when('/',            { templateUrl: 'welcome.html',  controller: 'WelcomeCtrl' });
    $routeProvider.when('/team',        { templateUrl: 'team.html',     controller: 'TeamCtrl' });
    $routeProvider.when('/team/:name',  { templateUrl: 'team.html',     controller:'TeamCtrl' });

    $routeProvider.otherwise({ redirectTo: '/' });

}]);


app.factory("TeamService", ['$resource',
  function($resource) {
    return $resource('/app/data/team.json', {}, {
      query: { method:'GET' }
    });
}]);


app.controller ("WelcomeCtrl", ['$scope', '$location',
  function ($scope, $location) {
    // the user's name
    $scope.name = "Qbert"

    $scope.viewTeam = function() {
      $location.path('/team/' + $scope.name);
    }
}]);


app.controller("TeamCtrl", ['$scope', '$location', '$routeParams', 'TeamService',
  function ($scope, $location, $routeParams, TeamService) {

    $scope.name = $routeParams.name;

    $scope.goHome = function() {
      $location.path('/');
    }

    $scope.setSelected = function(member) {
      $scope.selected = member;
    }

    TeamService.query(function(data) {
      $scope.team = data.team;
    });

}]);
