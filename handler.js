const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

const validador = require('validadorcfdi')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json({limit: '15mb'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

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

app.listen(port, () => {
  console.log('App running')
})
