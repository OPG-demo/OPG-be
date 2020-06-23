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
  return db('corecomp')
}

function findBy(filter){
  return db('corecomp').where(filter);
}

function add(corecomp) {
  return db('corecomp')
    .insert(corecomp)
}

function findById(id) {
  return db('corecomp')
    .where({id})
    .first();
}

function remove(id){
  return db('corecomp')
    .where({id})
    .del();
}

function update(corecomp, id){
  return db('corecomp')
    .where({id})
    .update(corecomp);
}