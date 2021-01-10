import routes from './routes'
import { handleError } from './errors'

const composer = function(axios, options) {
  this.axios = axios
  this.options = options
}

composer.prototype.list = async function(params) {
  const res = await this.axios.get(routes.composer.list, {params}).catch(handleError)

  return res.data
}

composer.prototype.retrieve = async function(id, params) {
  const res = await this.axios.get(routes.composer.retrieve(id), {params}).catch(handleError)

  return res.data
}

export default composer