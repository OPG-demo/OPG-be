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
  return db('swot')
}

function findBy(filter){
  return db('swot').where(filter);
}

function add(swot) {
  return db('swot')
    .insert(swot)
}

function findById(id) {
  return db('swot')
    .where({id})
    .first();
}

function findByOrg(org_id) {
  return db('swot')
    .where({org_id})
}

function remove(id){
  return db('swot')
    .where({id})
    .del();
}

function update(swot, id){
  return db('swot')
    .where({id})
    .update(swot);
}