const conn = {
  client: 'oracledb',
  connection: {
    host: '192.168.0.200',
    user: 'CONSINCO',
    password: 'CONSINCO',
    database: 'CONSINCO',
  },
};

const knexOra = require('knex')(conn);

module.exports = knexOra;
