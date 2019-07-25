const HttpStatus = require('http-status-codes');

exports.plugin = {
  version: '0.0.1',
  name: 'notFound',
  async register(server) {
    server.route({
      method: '*',
      path: '/{p*}',
      config: {
        description: 'Catch invalid endpoints and return Not Found.',
        tags: ['api']
      },
      handler: (request, h) => {
        return h.response('Endpoint not found').code(HttpStatus.NOT_FOUND);
      }
    });
  }
};
