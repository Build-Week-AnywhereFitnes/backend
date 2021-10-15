const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')
const { expectCt } = require('helmet')


test('sanity',()=>{
expect(true).toBe(false)
})