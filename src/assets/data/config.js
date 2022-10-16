import wallet from './wallet.conf.json'
import contract from './contract.conf.json'
import ERCTokenABI from '@data/ERCToken.abi.json'
import FarmABI from '@data/farm.abi.json'

const ENV_PRODUCTION = 'production'
const ENV_DEVELOPMENT = 'development'

// 环境参数
const env = ENV_PRODUCTION

let config = {
  abi: {
    ERCToken: ERCTokenABI,
    Farm: FarmABI
  }
}

if (env === ENV_DEVELOPMENT) {
  config.wallet = wallet[ENV_DEVELOPMENT]
  config.contract = contract[ENV_DEVELOPMENT]
} else if (env === ENV_PRODUCTION) {
  config.wallet = wallet[ENV_PRODUCTION]
  config.contract = contract[ENV_PRODUCTION]
}

export default config
