const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const fs = require('fs')

const xmlString = fs.readFileSync('test/test.xml', 'utf8')
const certificadoSAT = fs.readFileSync('test/test.cer', 'binary')

describe('API Tests', function () {
  const apiValues = {
    factura: xmlString,
    certificado: certificadoSAT
  }
  describe('POST Mirror', function () {
    it('should respond with mirror JSON', function (done) {
      request(app)
        .post('/mirror')
        .send({heeey: 'ya'})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200)
          expect(res.body.body).to.deep.equal({heeey: 'ya'})
          done()
        })
    })
  })
  describe('POST Validate', function () {
    it('should respond with 200 OK', function (done) {
      request(app)
        .post('/validate')
        .send(apiValues)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })
    it('should respond with positive validation result', function (done) {
      request(app)
        .post('/validate')
        .send(apiValues)
        .end(function(err, res) {
          expect(res.body).to.deep.include({valid: true})
          done()
        })
    })
    it('should respond with negative validation result', function (done) {
      request(app)
        .post('/validate')
        .send({
          factura: xmlString,
          certificado: 'fakecertificate'
        })
        .end(function(err, res) {
          expect(res.body).to.deep.include({valid: false})
          done()
        })
    })
  })
})
