const { IO } = require('crocks')
const either = require('crocks/pointfree/either')
const { logic } = require('./src/logic')
const { exit, getGuess, printLine } = require('./src/cli')
const { Env, renderFailure, renderSuccess } = require('./src/utils')

// main : Env -> IO ()
const main = env =>
  getGuess(`Guess a number between 1 and 100`)
    .map(logic(env))
    .chain(
      either(
        fail => printLine(renderFailure(fail)).chain(() => main(env)),
        success => printLine(renderSuccess(success)).chain(exit)
      )
    )

main(Env(23, 3)).run()
