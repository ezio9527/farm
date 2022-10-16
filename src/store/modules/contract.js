// 合约
import FarmContract from '@/server/contract/FarmContract'
import ERCContract from '@/server/contract/ERCContract'
import config from '@data/config.js'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

const state = () => ({
  farms: [],
  farmContract: null,
  ercContract: null,
  balance: 0 // erc代币余额
})

// getters
const getters = {
  getFarms (state) {
    return state.farms
  },
  getFarmContract (state) {
    return state.farmContract
  },
  getErcContract (state) {
    return state.ercContract
  },
  getBalance (state) {
    return state.balance
  }
}

// mutations
const mutations = {
  setFarms (state, farms) {
    state.farms = farms
  },
  setFarmContract (state, contract) {
    state.farmContract = contract
  },
  setErcContract (state, contract) {
    state.ercContract = contract
  },
  setBalance (state, balance) {
    state.balance = balance
  }
}

const actions = {
  initialize ({ commit, state }, account) {
    // 创建农场矿池合约
    const farmContract = new FarmContract(account)
    commit('setFarmContract', farmContract)
    // 创建代币合约
    const ercContract = new ERCContract(account, config.contract.Token.address)
    commit('setErcContract', ercContract)
    // 查询矿池
    const qryFarms = () => {
      farmContract.findPlayerInfo().then(data => {
        const decimals = 'ether'
        const yearRate = Web3.utils.fromWei(data._YEAR_RATE, 'gwei')
        let income = Web3.utils.fromWei(data._incomeNum, decimals)
        let pledgeAmount = Web3.utils.fromWei(data['5'], decimals)
        let total = Web3.utils.fromWei(data._wfcNum, 'ether')
        total = new BigNumber(total).toFixed(8, 1)
        total = new BigNumber(total).toString(10)
        income = new BigNumber(income).toFixed(8, 1)
        income = new BigNumber(income).toString(10)
        pledgeAmount = new BigNumber(pledgeAmount).toFixed(8, 1)
        pledgeAmount = new BigNumber(pledgeAmount).toString(10)
        commit('setFarms', [{ yearRate, total, income, pledgeAmount }])
        console.log(data)
      })
    }
    // 查询代币余额
    const qryBalance = () => {
      ercContract.getBalanceInfo().then(balance => {
        let _balance = new BigNumber(balance).toFixed(8, 1)
        _balance = new BigNumber(_balance).toString(10)
        commit('setBalance', _balance)
      })
    }
    qryFarms()
    qryBalance()
    setInterval(() => {
      qryFarms()
      qryBalance()
    }, 5000)
  }
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
