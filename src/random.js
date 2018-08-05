const { State, IO } = require('crocks')

// newSeed : () -> State Int Int
const newSeed = () =>
  State.get()
    .map(s => (1103515244 * s + 12345) & 0x7fffffff)
    .chain(State.put)

// calcValue : () => State Int Float
const calcValue = () => State.get().map(s => (s >>> 16) / 0x7fff)

// clamp : (Int, Int) -> Float -> Int
const clamp = (low, high) => n => Math.floor(n * (high - low)) + low

// randomRIO : (Int, Int, Int) -> IO Int
const randomRIO = (low, high, seed) => {
  const st = newSeed()
    .chain(calcValue)
    .map(clamp(low, high))

  return IO.of(st.evalWith(seed))
}

module.exports = {
  randomRIO
}
