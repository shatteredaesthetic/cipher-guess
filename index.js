const { IO } = require('crocks')
const either = require('crocks/pointfree/either')
const { logic } = require('./src/logic')
const { exit, getGuess, printLine } = require('./src/cli')
const { renderFailure, renderSuccess } = require('./src/utils')
const { randomRIO } = require('./src/random')
const { Env, defaultMeta } = require('./src/config')

// game : Env => IO ()
const game = env =>
  getGuess(`Guess a number between 1 and 100`)
    .map(logic(env))
    .chain(
      either(
        fail => printLine(renderFailure(fail)).chain(() => game(env)),
        success => printLine(renderSuccess(success)).chain(exit)
      )
    )

// main : MetaCfg -> IO ()
const main = meta => {
  const { low, high } = meta
  const target = randomRIO(low, high, Date.now()).run()
  const env = Env(target, meta)

  return game(env)
}

main(defaultMeta).run()
