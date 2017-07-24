var module = require('../module');

module
  .provider('healthcheck', [ function () {
    console.log('. healthcheck-service')

    function Healthcheck($resource, apiRoot) {
      var api = $resource('', {},
        { checkHealth: { method: 'POST', url: apiRoot + '/healthcheck'
        }
        });

      this.checkHealth = function () {
        return api.checkHealth({}, {}).$promise;
      };
    }

    this.$get = ['$resource', 'connect', function ($resource, connect) {
      return new Healthcheck($resource, connect.apiRoot);
    } ];    
  } ])
  ;
