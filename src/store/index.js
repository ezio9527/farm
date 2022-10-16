import { createStore } from 'vuex'
import wallet from './modules/wallet'
import contract from './modules/contract'
import transaction from './modules/transaction'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    wallet,
    contract,
    transaction
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
