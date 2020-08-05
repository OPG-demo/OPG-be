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

function findByOrg(org_id) {
  return db('tactic')
    .where({org_id})
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