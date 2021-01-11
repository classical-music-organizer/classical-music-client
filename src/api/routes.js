const routes = {
  composer: {
    list: '/composer',
    retrieve: id => `/composer/${id}`
  },
  work: {
    list: '/work',
    retrieve: id => `/work/${id}`
  }
}

export default routes