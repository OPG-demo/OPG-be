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
  return db('tactic')
}

function findBy(filter){
  return db('tactic').where(filter);
}

function add(tactic) {
  return db('tactic')
    .insert(tactic)
}

function findById(id) {
  return db('tactic')
    .where({id})
    .first();
}

function remove(id){
  return db('tactic')
    .where({id})
    .del();
}

function update(tactic, id){
  return db('tactic')
    .where({id})
    .update(tactic);
}