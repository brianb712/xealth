const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');

const { alphabetize } = require('../lib/alphabetize/alphabetize');

exports.plugin = {
  version: '0.0.1',
  name: 'alphabetize',
  async register(server) {
    server.route({
      method: 'POST',
      path: '/xealth/api/alphabetize',
      config: {
        description: 'Find the alphabetic order of symbols from a list of words.',
        tags: ['api'],
      validate: {
        payload: {
          wordList: Joi.array().required()
        }
        },
      },
      handler: (request, h) => {
        try {
          const wordList = request.payload.wordList
          const symbolOrder = alphabetize(wordList);
          return h.response(symbolOrder).code(HttpStatus.CREATED);
        } catch (error) {
          return h.response(error.message).code(HttpStatus.BAD_REQUEST);
        }
      }
    });
  }
};
