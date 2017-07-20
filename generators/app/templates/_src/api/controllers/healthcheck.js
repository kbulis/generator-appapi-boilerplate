module.exports = function (app) {

  function checkHealth (req, res) {
    res.json
      ( { status: 'ok', message: '<%= name %> running a-ok!'
        }
      );
  }
  
  app.route('/healthcheck')
    .post(checkHealth)
    .get(checkHealth)
    ;

};