# Validador CFDI API

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This repository holds a basic API that makes use of the [validadorcfdi package](https://www.npmjs.com/package/validadorcfdi).

It uses wt cli for deployment.


## Usage


### Deploy
```bash
npm run deploy
```

## API

### `POST /validate`
#### Parameters

- **factura** _(required)_ - Version 3.3 factura as a string
- **certificado** _(required)_ - Binary encoded DER certificate given by SAT (.cer)
