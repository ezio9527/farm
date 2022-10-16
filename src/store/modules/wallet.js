const state = () => ({
  wallet: null, // 钱包对象
  address: '', // 钱包地址
  isDapp: false // dapp运行环境
})

// getters
const getters = {
  getWallet: (state) => {
    return state.wallet
  },
  getAddress: (state) => {
    return state.address
  },
  getIsDapp: (state) => {
    return state.isDapp
  }
}

// mutations
const mutations = {
  setWallet: (state, wallet) => {
    state.wallet = wallet
  },
  setAddress (state, address) {
    state.address = address
  },
  setIsDapp: (state, isDapp) => {
    state.isDapp = isDapp
  }
}

// actions
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
  }
}
