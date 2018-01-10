const Webtask = require('webtask-tools')

const bodyParser = require('body-parser')
const express = require('express')

const validador = require('validadorcfdi')
const app = express()

app.use(bodyParser.json({limit: '15mb'}))
app.use(bodyParser.urlencoded({extended: true}))

// POST
app.post('/validate', async (req, res) => {
  const factura = req.body.factura || ''
  const certificado = req.body.certificado || ''
  let result = await validador.validacion.validaFactura(factura, certificado)
  res.status(200).json(result)
})

app.use('/mirror', (req, res) => {
  res.status(200).json({
    body: req.body,
    type: typeof req.body,
    isArray: Array.isArray(req.body),
    params: req.params,
    query: req.query
  })
})

// Expose this express app as a webtask-compatible function
module.exports = Webtask.fromExpress(app)
