import Web3 from 'web3'
import Contract from 'web3-eth-contract'
import ABIFactory from '@/server/contract/ABIFactory'
import Type from '@/pluins/Type'

class BaseContract {
  /**
   * abi方法名
   * @type {string}
   */
  static ABI_NAME_APPROVE = 'approve'

  /**
   * 构造函数
   * @param {Array} abi 包含abi信息的Array对象
   * @param {String} walletAddress 钱包地址
   * @param {String} contractAddress 合约地址
   */
  constructor (abi, walletAddress, contractAddress) {
    // 设置rpc节点
    const web3Instanceof = new Web3(Web3.givenProvider)
    Contract.setProvider(web3Instanceof.eth.givenProvider)
    // 创建合约对象
    this.contract = new Contract(abi, contractAddress)
    this.contract.options.jsonInterface = abi
    this.contract.options.address = contractAddress
    this.contract.options.from = walletAddress
    // 创建ABI对象
    this.abi = new ABIFactory(abi)
    this.web3 = web3Instanceof
  }

  /**
   * 获取余额
   */
  getBalanceInfo () {
    return new Promise((resolve, reject) => {
      this.contract.methods.balanceOf(this.contract.options.from).call({
      }).then(res => {
        resolve(Web3.utils.fromWei(res, 'ether'))
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 授权
   * @param {String} address 需要授权的代币地址
   * @param {Number} number 需要授权的代币数量
   */
  approve (address, number) {
    let num = Web3.utils.toWei(number.toString())
    num = Web3.utils.toHex(num)
    return new Promise((resolve, reject) => {
      const abi = this.getABI(BaseContract.ABI_NAME_APPROVE)
      const data = this.signature({
        func: abi,
        params: [
          address,
          Web3.utils.toHex(num)
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
   * 查询授权
   * @param {String} spender 需要被授权的合约地址
   */
  allowance (spender) {
    return new Promise((resolve, reject) => {
      this.contract.methods.allowance(this.contract.options.from, spender).call({
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 根据名称获取abi对象
   * @param name
   * @returns {*|{}}
   */
  getABI (name) {
    return this.abi.getABIByName(name)
  }

  /**
   * 计算旷工费
   * @param {Object} address 用户地址
   * @param {Object} data 数据
   * @param {Object} value 转账金额
   */
  getGas ({ data, value = '0x0', from = this.contract.options.from, to = this.contract.options.address }) {
    return new Promise((resolve, reject) => {
      // 计算旷工费
      console.log('开始计算旷工费gaslimit')
      window.ethereum.request({
        method: 'eth_estimateGas',
        params: [{
          from,
          QUANTITY: 'latest',
          to,
          data
        }]
      }).then(gaslimit => {
        console.log(Web3.utils.hexToNumber(gaslimit))
        resolve(Web3.utils.hexToNumber(gaslimit))
      }).catch(e => {
        resolve(310000)
        console.log('gaslimit计算失败', e)
      })
    })
  }

  /**
   * 发送交易
   * @param {Number} gasLimit 自定义旷工费
   * @param {Object} address 用户地址
   * @param {Object} data 数据
   * @param {Object} value 转账金额
   */
  sendEtherFrom ({ gasLimit, data, value = '0x0', from = this.contract.options.from, to = this.contract.options.address }) {
    return new Promise((resolve, reject) => {
      const parameters = [{
        from,
        to,
        value,
        data: data
      }]
      const payload = {
        method: 'eth_sendTransaction',
        params: parameters,
        from
      }
      if (gasLimit) {
        parameters.gasLimit = gasLimit
        window.ethereum.sendAsync(payload, (error, response) => {
          if (error) {
            reject(error)
          }
          if (response.result) {
            resolve(response.result)
          }
        })
      } else {
        this.getGas({ data, value, from, to }).then(gasLimit => {
          parameters.gasLimit = gasLimit
          window.ethereum.sendAsync(payload, (error, response) => {
            if (error) {
              reject(error)
            }
            if (response.result) {
              resolve(response.result)
            }
          })
          // getGas调用结束
        })
      }
    })
  }

  /**
   * 确认交易是否成功
   * @param {String} hash 交易Hash
   */
  getTransactionReceipt (hash) {
    return new Promise((resolve, reject) => {
      let queryTimes = 0
      const timer = setInterval(() => {
        queryTimes++
        window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [hash]
        }).then(res => {
          console.log('交易确认函数-------', res)
          if (res) {
            console.log('交易确认了-------', Number(res.status) === 1)
            resolve(Number(res.status) === 1)
            clearInterval(timer)
          }
        }).catch(e => {
          console.log(e)
        })
        if (queryTimes > 10) {
          clearInterval(timer)
          queryTimes = 0
          reject(new Error('timeout'))
        }
      }, 4000)
    })
  }

  /**
   * 签名
   * @param {Array} func
   * @param {Array} params
   */
  signature ({ func, params }) {
    let data = ''
    const funcSign = this.web3.eth.abi.encodeFunctionSignature(func)
    data = funcSign
    const newParams = params.map(param => {
      if (Type.isNumber(param)) {
        let temp = Web3.utils.toHex(param.toString()).substring(2)
        temp = Web3.utils.padLeft(temp, 64)
        return temp
      } else if (Type.isBoolean(param)) {
        let temp = Web3.utils.toHex(Web3.utils.toWei(param ? '1' : '0')).substring(2)
        temp = Web3.utils.padLeft(temp, 64)
        return temp
      } else if (Web3.utils.isHex(param)) {
        let temp = param.substring(2)
        temp = Web3.utils.padLeft(temp, 64)
        return temp
      } else {
        return param
      }
    })
    return data + newParams.join('')
  }
}

export default BaseContract
