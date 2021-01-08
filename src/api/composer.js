import routes from './routes'
import { handleError } from './errors'

const composer = function(axios, options) {
  this.axios = axios
  this.options = options
}

composer.prototype.list = async function() {
  const res = await this.axios.get(routes.composer.list).catch(handleError)

  return res.data
}

composer.prototype.retrieve = async function(id) {
  const res = await this.axios.get(routes.composer.retrieve(id)).catch(handleError)

  return res.data
}

export default composer