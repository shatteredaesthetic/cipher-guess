const { State } = require('crocks')
const { tagged } = require('daggy')

// type alias low, high, tolerance = Int
// type MetaCfg = { low, high, tolerance }
const MetaCfg = tagged('MetaCfg', ['low', 'high', 'tolerance'])

// type alias target = Int
// type Env = { target, MetaCfg }
const Env = tagged('Env', ['target', 'meta'])

// defaultMeta : MetaCfg
const defaultMeta = MetaCfg(1, 100, 3)

module.exports = {
  Env,
  defaultMeta
}
