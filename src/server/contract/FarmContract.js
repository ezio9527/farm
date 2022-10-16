import BaseContract from '@/server/contract/BaseContract'
import config from '@data/config.js'
import Web3 from 'web3'

class FarmContract extends BaseContract {
  /**
   * abi方法名
   * @type {string}
   */
  static ABI_NAME_PLEDGE = 'pledgeToken'
  static ABI_NAME_REDEEM = 'sendWfec'
  static ABI_NAME_PICKUP = 'sendWfc'
  static ABI_NAME_SET_RATE = 'setRate'

  /**
   * 初始化合约构造器
   * @param {String} walletAddress 钱包地址
   */
  constructor (walletAddress) {
    super(config.abi.Farm, walletAddress, config.contract.Farm.address)
  }

  /**
   * 查找矿池信息
   */
  findPlayerInfo () {
    return new Promise((resolve, reject) => {
      this.contract.methods.findPlayerInfo().call({
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 质押
   * @param {Number} number 质押数量
   */
  pledge ({ number }) {
    const decimals = 'ether'
    let _number = Web3.utils.toWei((number).toString(), decimals)
    _number = Web3.utils.toHex(_number)
    return new Promise((resolve, reject) => {
      const abi = this.getABI(FarmContract.ABI_NAME_PLEDGE)
      const data = this.signature({
        func: abi,
        params: [
          _number
        ]
      })
      this.sendEtherFrom({ data }).then(hash => {
        resolve(hash)
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 解除质押
   * @param {Number} number 质押数量
   * @param {Number} value 手续费
   */
  redeem ({ number, value = 3000000000000000 }) {
    const decimals = 'ether'
    let _number = Web3.utils.toWei((number).toString(), decimals)
    _number = Web3.utils.toHex(_number)
    const _value = Web3.utils.toHex(value)
    return new Promise((resolve, reject) => {
      const abi = this.getABI(FarmContract.ABI_NAME_REDEEM)
      const data = this.signature({
        func: abi,
        params: [
          _number
        ]
      })
      this.sendEtherFrom({ data, value: _value }).then(hash => {
        resolve(hash)
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 提取收益
   */
  pickup () {
    return new Promise((resolve, reject) => {
      const abi = this.getABI(FarmContract.ABI_NAME_PICKUP)
      const data = this.signature({
        func: abi,
        params: [
        ]
      })
      this.sendEtherFrom({ data }).then(hash => {
        resolve(hash)
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 设置年化率
   * @param {Number} rate 年利率
   */
  setRate ({ rate }) {
    return new Promise((resolve, reject) => {
      const _rate = rate * 1000000000
      const minutesRate = Math.trunc(_rate / 52560000)
      const abi = this.getABI(FarmContract.ABI_NAME_SET_RATE)
      const data = this.signature({
        func: abi,
        params: [
          _rate,
          minutesRate
        ]
      })
      this.sendEtherFrom({ data }).then(hash => {
        resolve(hash)
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export default FarmContract
