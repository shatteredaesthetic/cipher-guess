const { Either, ReaderT, pipe, pipeK } = require('crocks')
const branch = require('crocks/Pair/branch')
const K = require('crocks/combinators/constant')
const I = require('crocks/combinators/identity')
const runWith = require('crocks/pointfree/runWith')
const ifElse = require('crocks/logic/ifElse')
const { Ord, Success, Failure } = require('./utils')

const M = ReaderT(Either)
const { ask, liftFn } = M
const { Right, Left } = Either

// isTolerant : (Int, Int) -> Int -> Eq
const isTolerant = (low, high) =>
  ifElse(n => n < low, K(Ord.LT), ifElse(n => n > high, K(Ord.GT), K(Ord.EQ)))

// firstTest : Int -> ReaderT Env (Either Failure Int)
const firstTest = liftFn(
  ifElse(
    n => !isNaN(n) && 1 <= n && n <= 100,
    Right,
    pipe(Failure.InValid, Left)
  )
)

// secondTest : Int -> ReaderT Env (Either Failure Int)
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
          LT: K(Left(Failure.TooLow(n))),
          EQ: K(Right(n)),
          GT: K(Left(Failure.TooHigh(n)))
        })
      )
    )

// thirdTest : Int -> ReaderT Env (Either Failure Success)
const thirdTest = n =>
  ask()
    .map(({ target }) =>
      ifElse(
        n => target === n,
        pipe(Success.Equal, Right),
        pipe(Success.InTolerance, Right)
      )
    )
    .ap(M.of(n))
    .chain(liftFn(I))

// runTests : Int -> ReaderT Env (Either Failure Success)
const runTests = pipeK(M.of, firstTest, secondTest, thirdTest)

// logic : Env -> Int -> Either Failure Success
const logic = env => pipe(runTests, runWith(env))

module.exports = {
  logic
}
