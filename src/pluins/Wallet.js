class Wallet {
  static ERROR_EVN = '100' // 没有Dapp环境
  static ERROR_ADD_ETHEREUM_CHAIN = '101' // 添加网络节点失败

  /**
   * @param {Object} config 钱包配置
   * @param {Function} enable 授权成功回调
   * @param {Function} connect 连接成功事件回调
   * @param {Function} chainChanged 网络切换事件回调
   * @param {Function} accountsChanged 账号切换事件回调
   * @param {Number} duration 轮询监听自动授权的时间间隔，执行10次
   */
  constructor ({ config, enable, connect, chainChanged, accountsChanged, duration = 500 }) {
    if (window && window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false
    }
    this.config = config
    this._autoEnable = false // 连接时的自动授权
    this.enableHandler = enable || (accounts => { console.log('授权成功', accounts[0]) })
    this._setListener({ connect, chainChanged, accountsChanged, config })
    this._forceEnable({ connect, config, duration })
  }

  /**
   * 设置钱包的自动监听
   * @private
   */
  _setListener ({ connect, chainChanged, accountsChanged, config }) {
    if (window && window.ethereum) {
      window.ethereum.on('connect', data => {
        // 当前浏览器有Dapp环境时出发
        // data包含网络ID
        console.log('connect')
        if (connect && connect instanceof Function) {
          connect.call(this, { wallet: this, data, config })
          this._autoEnable = true
        }
      })
      window.ethereum.on('chainChanged', chainId => {
        // 切换网络时触发
        // data是网络ID
        console.log('chainChanged')
        if (chainChanged && chainChanged instanceof Function) {
          chainChanged.call(this, { wallet: this, chainId, config })
        }
      })
      window.ethereum.on('accountsChanged', accounts => {
        // 切换账户时触发
        // data是数组，有一个或零个账户，当断开所有连接账户时返回空数组
        console.log('accountsChanged')
        if (accountsChanged && accountsChanged instanceof Function) {
          accountsChanged.call(this, accounts)
        }
      })
    }
  }

  /**
   * 强制授权
   * @private
   */
  _forceEnable ({ connect, config, duration }) {
    if (window && window.ethereum) {
      // connect事件不一定触发，则强制执行enable进行授权
      let _times = 0
      const listener = setInterval(() => {
        if (window.ethereum.isConnected()) {
          // 已连接且没有进行自动授权
          if (!this._autoEnable && connect && connect instanceof Function) {
            connect.call(this, { wallet: this, config })
            clearInterval(listener)
          }
        } else if (++_times > 10) {
          // 不再等待连接
          clearInterval(listener)
          throw new Error(Wallet.ERROR_EVN)
        }
      }, duration)
    }
  }

  /**
   * 获取钱包授权
   */
  enable () {
    return new Promise((resolve, reject) => {
      window.ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        // 这里只返回当前选中的账户
        // 判断当前网络节点
        if (Number(window.ethereum.chainId) === Number(this.config.chainId)) {
          this.enableHandler(accounts)
          resolve(accounts)
        } else {
          this.addEthereumChain().catch(e => {
            reject(e)
          })
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 添加/切换BSC网络节点
   */
  addEthereumChain () {
    return new Promise((resolve, reject) => {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.config.chainId }]
      }).then(() => {
        resolve()
      }).catch(switchError => {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [this.config]
        }).then(() => {
          resolve()
        }).catch(addError => {
          console.log(addError)
          reject(Wallet.ERROR_ADD_ETHEREUM_CHAIN)
        })
      })
    })
  }
}
export default Wallet
