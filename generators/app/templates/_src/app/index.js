var module = require('./module');

require('./route');
require('./views');

module
  .config([ '$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    try {
      console.log('. configuring ' + module.name);

      $routeProvider
        .when('/welcome', {
          template: require('./views/welcome.html'),
          controller: 'routeController'
        })
        .when('/managed', {
          template: require('./views/managed.html'),
          controller: 'routeController'
        })
        .otherwise({
          redirectTo: '/welcome'
        });
    }
    finally {
      console.log('. configured');
    }
  } ])
  .run([ '$window', '$rootScope', function ($window, $rootScope) {
    try {
      console.log('. initiating ' + module.name);

      $rootScope.current = {
        status: 'loading',
        user: {
          code: 'guest'
        }
      };
    }
    finally {
      console.log
        ( '. initiated'
      );
    }
  } ])
  ;