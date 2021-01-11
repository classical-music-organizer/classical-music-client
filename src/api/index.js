import axios from 'axios'
import composer from './composer'
import work from './work'

const Api = function(options) {
  this.axios = axios.create({
    baseURL: 'http://localhost:3000' // TODO: load from config file
  })

  this.composer = new composer(this.axios, options)
  this.work = new work(this.axios, options)
}

export default new Api()