// create the AngularJS app
var app = angular.module("app", ['ngRoute']); // Sets up our app. Adding [] is setting us up for dependency injection, if we left those out it would be a getter, not a setter

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.when('/',      { templateUrl: 'welcome.html',  controller: 'WelcomeCtrl' });
    $routeProvider.otherwise({ redirectTo: '/' });

}]);


// Our first controller.
// The ($scope) parameter adds a dependancy on $scope
// app.controller("WelcomeCtrl",
//   function($scope) {

//   }
// );
// BUT... It's not good practice because it can't be minified - so we use this instead

app.controller ("WelcomeCtrl", ['$scope',
  function ($scope) {
    // the user's name
    $scope.name = "Qbert"
  }
]);
