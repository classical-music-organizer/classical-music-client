<template>
  <sidebar-template :links='sidebarLinks'>
    <h2>{{ loaded ? composer.fullName : 'Loading' }}</h2>
    <p>{{ loaded ? composer.info.content : 'Loading' }}</p>
  </sidebar-template>
</template>

<script>
import Api from '@/api'
import SidebarTemplate from '@/components/SidebarTemplate'

export default {
  name: 'Composer',
  components: {
    SidebarTemplate
  },
  data() {
    return {
      loaded: false,
      composer: null
    }
  },
  async mounted() {
    const { id } = this.$route.params

    await this.retrieveComposer(id)
  },
  async beforeRouteUpdate(to) {
    // TODO: when redirecting to slugified route, use `verifiedSlug` in route metadata to avoid reloading component

    if (to.name == 'composer' || to.name == 'composerSlug') {
      // TODO: at some point when updating, we need to make sure slug still equals composer's slug?
      this.retrieveComposer(to.params.id)
      
    }
  },
  methods: {
    // retrieves the composer object and sets loaded to true
    async retrieveComposer(id) {
      this.loaded = false
      this.composer = null
 
      try {
        this.composer = await Api.composer.retrieve(id)
      } catch(err) {
        if (err.code == 404) { // TODO: create strongly typed errors (NotFoundError) and use instanceof
          // TODO: render not found
        } else {
          throw err
        }
      } finally {
        this.loaded = true
      }
    }
  },
  computed: {
    sidebarLinks() {
      // TODO: return real tag links
      return [
        {
          heading: {text: 'Baroque Composers', link: '/tag/1'},
          links: [
            {text: 'Johann Sebastian Bach', link: '/composer/1'},
            {text: 'Antonio Vivaldi', link: '/composer/2'},
            {text: 'George Frideric Handel', link: '/composer/3'},
            {text: 'Claudio Monteverdi', link: '/composer/4'},
            {text: 'Georg Philipp Telemann', link: '/composer/5'}
          ]
        },
        {
          heading: {text: 'Accessible Composers', link: '/'},
          links: [
            {text: 'Johann Sebastian Bach', link: '/composer/1'},
            {text: 'Antonio Vivaldi', link: '/composer/2'},
            {text: 'George Frideric Handel', link: '/composer/3'},
            {text: 'Claudio Monteverdi', link: '/composer/4'},
            {text: 'Georg Philipp Telemann', link: '/composer/5'}
          ]
        }
      ]
    }
  }
}
</script>