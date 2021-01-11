import routes from './routes'
import { handleError } from './errors'

const work = function(axios, options) {
  this.axios = axios
  this.options = options
}

work.prototype.list = async function(params) {
  const res = await this.axios.get(routes.work.list, {params}).catch(handleError)

  return res.data
}

work.prototype.retrieve = async function(id, params) {
  const res = await this.axios.get(routes.work.retrieve(id), {params}).catch(handleError)

  return res.data
}

export default work