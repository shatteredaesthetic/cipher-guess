const { Either, pipe } = require('crocks')
const bimap = require('crocks/pointfree/bimap')
const { tagged, taggedSum } = require('daggy')
const { Left, Right } = Either

// type Ord = LT | EQ | GT
const Ord = taggedSum('Ord', {
  LT: [],
  EQ: [],
  GT: []
})

// type Env = { target, tolerance }
const Env = tagged('Env', ['target', 'tolerance'])

// type Failure = InValid | TooHigh | TooLow
const Failure = taggedSum('Failure', {
  InValid: ['x'],
  TooHigh: ['x'],
  TooLow: ['x']
})

// type Success = InTolerance | Equal
const Success = taggedSum('Success', {
  InTolerance: ['x'],
  Equal: ['x']
})

// renderFailure : Failure -> String
const renderFailure = fail =>
  fail.cata({
    InValid: x => `${x} is not an integer between 1 and 100. Try again.`,
    TooHigh: x => `${x} was too high. Try again.`,
    TooLow: x => `${x} was too low. Try again.`
  })

// renderSuccess : Success -> String
const renderSuccess = success =>
  success.cata({
    InTolerance: x => `${x} is close enough. Good Job!`,
    Equal: x => `${x} is it, exactly! Winner!`
  })

module.exports = {
  Ord,
  Env,
  Failure,
  Success,
  renderSuccess,
  renderFailure
}
