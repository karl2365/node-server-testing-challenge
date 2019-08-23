const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
};

async function insert(hobbit) {
  return db('hobbits').insert(hobbit, 'id');
}



function remove(id) {
  return db('hobbits').where('id', id).del();
}

function getAll() {
  return db('hobbits');
}

