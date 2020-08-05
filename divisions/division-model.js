const db = require('../data/db-config')

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByOrg,
  remove,
  update
};

function find() {
  return db('division')
}

function findBy(filter){
  return db('division').where(filter);
}

function add(division) {
  return db('division')
    .insert(division)
}

function findById(id) {
  return db('division')
    .where({id})
    .first();
}

function findByOrg(org_id) {
  return db('division')
    .where({org_id})
}

function remove(id){
  return db('division')
    .where({id})
    .del();
}

function update(division, id){
  return db('division')
    .where({id})
    .update(division);
}