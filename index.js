const pipe = require('crocks/helpers/pipe')
const either = require('crocks/pointfree/either')
const runWith = require('crocks/pointfree/runWith')
const { runTests } = require('./src/logic')
const { printLine, getGuess } = require('./src/cli')
const { Env } = require('./src/utils')

// output : Either String String -> IO ()
const output = either(printLine, printLine)

// logic : Env -> Int -> Either String String
const logic = env => pipe(runTests, runWith(env))

// main : Env -> IO ()
const main = env =>
  getGuess(`Guess a number between 1 and 100`)
    .map(logic(env))
    .chain(output)

main(Env(23, 3)).run()
