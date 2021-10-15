const db = require('../../data/db-config');
const Classes = require('./classes-model');

beforeAll(async()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
});

beforeEach(async()=>{
    await db("Classes").truncate()
});

afterAll(async()=>{
    await db.destroy()
});

describe('Sanity Check', ()=>{

})

describe('Classes',()=>{

});