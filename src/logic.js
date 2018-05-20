const { Either, ReaderT, pipe, pipeK } = require('crocks')
const branch = require('crocks/Pair/branch')
const K = require('crocks/combinators/constant')
const I = require('crocks/combinators/identity')
const ifElse = require('crocks/logic/ifElse')
const { taggedSum } = require('daggy')
const { fail, pass } = require('./utils')

const M = ReaderT(Either)
const { ask, liftFn } = M
const { Right, Left } = Either

// type Ord = LT | EQ | GT
const Ord = taggedSum('Ord', {
  LT: [],
  EQ: [],
  GT: []
})

// isTolerant : (Int, Int) -> Int -> Eq
const isTolerant = (low, high) =>
  ifElse(n => n < low, K(Ord.LT), ifElse(n => n > high, K(Ord.GT), K(Ord.EQ)))

// firstTest : Int -> ReaderT Env (Either String Int)
const firstTest = liftFn(
  ifElse(
    n => !isNaN(n) && 1 <= n && n <= 100,
    Right,
    fail('You need to learn to follow instructions')
  )
)

// secondTest : Int -> ReaderT Env (Either String Int)
const secondTest = n =>
  ask()
    .map(({ tolerance, target }) =>
      branch(target)
        .bimap(x => x - tolerance, x => x + tolerance)
        .merge(isTolerant)
    )
    .ap(M.of(n))
    .chain(
      liftFn(o =>
        o.cata({
          LT: fail('Too Low'),
          EQ: K(Right(n)),
          GT: fail('Too High')
        })
      )
    )

// thirdTest : Int -> ReaderT Env (Either String String)
const thirdTest = n =>
  ask()
    .map(({ target }) =>
      ifElse(n => target === n, pass('Win'), pass('Close Enough'))
    )
    .ap(M.of(n))
    .chain(liftFn(I))

// runTests :: Int -> ReaderT Env (Either String String)
const runTests = pipeK(M.of, firstTest, secondTest, thirdTest)

module.exports = {
  runTests
}
