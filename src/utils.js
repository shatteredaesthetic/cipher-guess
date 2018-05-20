const { Either, pipe } = require('crocks')
const K = require('crocks/combinators/constant')
const { tagged } = require('daggy')
const { Left, Right } = Either

// type Env
const Env = tagged('Env', ['target', 'tolerance'])

// fail :: String -> () -> Either String ()
const fail = pipe(Left, K)

// pass :: String -> () -> Either () String
const pass = pipe(Right, K)

module.exports = {
  Env,
  fail,
  pass
}
