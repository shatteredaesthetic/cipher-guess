const log = require('./lib/log')
const { Either, Reader, pipe, pipeK } = require('crocks')
const branch = require('crocks/Pair/branch')
const either = require('crocks/pointfree/either')
const runWith = require('crocks/pointfree/runWith')
const { taggedSum } = require('daggy')
const { Right, Left } = Either

const Ord = taggedSum('Ord', {
  LT: [],
  EQ: [],
  GT: []
})

// isTolerant : (Int, Int) -> Int -> Eq
const isTolerant = (low, high) => n =>
  n < low ? Ord.LT : n > high ? Ord.GT : Ord.EQ

// firstTest : Int -> Either String Int
const firstTest = n =>
  1 <= n && n <= 100 && !isNaN(n)
    ? Right(n)
    : Left('You need to learn to follow instructions')

// secondTest : Env -> Int -> Either String Int
const secondTest = ({ target, tolerance }) => n =>
  branch(target)
    .bimap(x => x - tolerance, x => x + tolerance)
    .merge(isTolerant)
    .call(null, n)
    .cata({
      LT: () => Left('Too Low'),
      EQ: () => Right(n),
      GT: () => Left('Too High')
    })

// thirdTest : Env -> Int -> Either String String
const thirdTest = ({ target }) => n =>
  target === n ? Right('Win') : Right('Close Enough')

// runTests : Env -> Int -> Either String Int
const runTests = env => pipeK(firstTest, secondTest(env), thirdTest(env))

// gameLogic : Either String Int -> Reader (Either String String)
const gameLogic = either => Reader.ask().map(env => either.chain(runTests(env)))

// logic : Env -> Int -> Either String String)
const logic = env => pipe(Either.of, gameLogic, runWith(env))

// output : Either String String -> ()
const output = either(str => log(`Left: ${str}`), str => log(`Right: ${str}`))

// env : Env
const env = {
  target: 23,
  tolerance: 3
}

const result = pipe(logic(env), output)

result('a')
result(101)
result(3)
result(23)
result(25)
result(77)
