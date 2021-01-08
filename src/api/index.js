import axios from 'axios'
import composer from './composer'

const Api = function(options) {
  this.axios = axios.create({
    baseURL: 'http://localhost:3000' // TODO: load from config file
  })

  this.composer = new composer(this.axios, options)
}

export default new Api()