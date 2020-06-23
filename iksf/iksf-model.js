const db = require('../data/db-config')

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db('iksf')
}

function findBy(filter){
  return db('iksf').where(filter);
}

function add(iksf) {
  return db('iksf')
    .insert(iksf)
}

function findById(id) {
  return db('iksf')
    .where({id})
    .first();
}

function remove(id){
  return db('iksf')
    .where({id})
    .del();
}

function update(iksf, id){
  return db('iksf')
    .where({id})
    .update(iksf);
}