# Validador CFDI API

This repository holds a basic API that makes use of the [validadorcfdi package](https://www.npmjs.com/package/validadorcfdi).

## API

### `POST /validate`

#### Parameters

- **factura** _(required)_ - Version 3.3 factura as a string
- **certificado** _(required)_ - Binary encoded DER certificate given by SAT (.cer)
