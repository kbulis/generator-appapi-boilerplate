var module = require('../module');

module
  .controller('managedController', [ '$scope', 'healthcheck', function ($scope, healthcheck) {
    console.log('. managed-controller')
    
    $scope.status = '...';

    healthcheck.checkHealth().then(function (res) {
        $scope.status = res.message;
      }, function (eX) {
        console.log(eX);
      });
  } ])
  ;
