var module = require('../module');

module
  .controller('managedController', [ '$scope', function ($scope) {
    console.log('. managed-controller')
  } ])
  ;