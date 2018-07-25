const log = require('../lib/log')
const { IO } = require('crocks')
const rls = require('readline-sync')

// printLine : String -> IO ()
const printLine = str => IO.of(log(str))

// readLine = () -> IO String
const readLine = () => IO.of(rls.prompt())

// getGuess : String -> IO Int
const getGuess = str =>
  printLine(str)
    .chain(readLine)
    .map(s => parseInt(s, 10))

// exit : () -> IO ()
const exit = () =>
  IO(() => {
    process.exit()
  })

module.exports = {
  exit,
  getGuess,
  printLine
}
