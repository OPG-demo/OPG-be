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
  return db('objective')
}

function findBy(filter){
  return db('objective').where(filter);
}

function add(objective) {
  return db('objective')
    .insert(objective)
}

function findById(id) {
  return db('objective')
    .where({id})
    .first();
}

function findByOrg(org_id) {
  return db('objective')
    .where({org_id})
}


function remove(id){
  return db('objective')
    .where({id})
    .del();
}

function update(objective, id){
  return db('objective')
    .where({id})
    .update(objective);
}