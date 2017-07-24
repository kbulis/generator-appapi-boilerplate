var module = require('./module');

require('./services');
require('./route');
require('./views');

module
  .provider('connect', ['$httpProvider', function ($httpProvider) {
    var doTrace = false;
    var apiRoot = '';

    this.setApiRoot = function (newApiRoot) {
      apiRoot = (newApiRoot || '').replace(/^\s+|\/*\s*$/g, '');
    };

    this.setDoTrace = function (newDoTrace) {
      doTrace = newDoTrace || false;
    };

    function Connect() {
      this.apiRoot = apiRoot;
      this.doTrace = doTrace;
    };    

    this.$get = [ function () {
      return new Connect();
    } ];    
  } ])
  .config(['$httpProvider', '$routeProvider', 'connectProvider', function ($httpProvider, $routeProvider, connectProvider) {
    try {
      console.log('. configuring ' + module.name);

      // handle any configuration here...
      
      connectProvider.setApiRoot("http://localhost:8087/");
      connectProvider.setDoTrace(true);

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
  .run(['$window', '$rootScope', function ($window, $rootScope) {
    try {
      console.log('. initiating ' + module.name);

      // add initialization logic here...
      
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