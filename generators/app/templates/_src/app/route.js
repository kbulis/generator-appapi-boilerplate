var module = require('./module');

module
  .controller('routeController', ['$scope', '$route', '$routeParams', function ($scope, $route, $routeParams) {
    try {
      console.log('. routing ' + $route.current.$$route.originalPath);

      $scope.params = $routeParams;
    }
    finally {
      console.log('. routed');
    }
  } ])
  ;