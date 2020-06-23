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
  return db('org')
}

function findBy(filter){
  return db('org').where(filter);
}

function add(org) {
  return db('org')
    .insert(org)
}

function findById(id) {
  return db('org')
    .where({id})
    .first();
}

function remove(id){
  return db('org')
    .where({id})
    .del();
}

function update(org, id){
  return db('org')
    .where({id})
    .update(org);
}