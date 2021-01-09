<template>
  <sidebar-template :links='sidebarLinks'>
    <div class='composer' v-if='loaded'>
      <img
        class='composer-image'
        :alt='composer.fullName'
        :src='imageSrc'
      />

      <h2 class='composer-name'>{{ composer.fullName }}</h2>

      <div class='tags' v-if='composer.tags && composer.tags.length > 0'>
        <tag-link
          v-for='tag in composer.tags'
          v-bind:key='tag.id'
          :tag='tag'></tag-link>
      </div>

      <!--<p>{{ loaded ? composer.info.content : 'Loading' }}</p>-->

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper ultricies risus a consequat. Praesent finibus dolor ac ex cursus, eget gravida dolor luctus. Mauris ultrices lectus ut urna convallis congue. Phasellus eu lorem vulputate, consectetur odio id, fermentum tortor. Donec nisi tellus, blandit ac rhoncus nec, consequat id sem. Suspendisse eros erat, ultricies non ante eu, commodo sollicitudin enim. Duis ante dui, molestie nec iaculis in, volutpat a dolor.

          Aenean ultrices lect</p>
    </div>

    <p v-else>Loading</p><!-- TODO: loading spinner -->
  </sidebar-template>
</template>

<script>
import Api from '@/api'
import SidebarTemplate from '@/components/SidebarTemplate'
import TagLink from '@/components/TagLink'

export default {
  name: 'Composer',
  components: {
    SidebarTemplate,
    TagLink
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
    imageSrc() {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg'
    },
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

<style scoped>

.composer-name {
  margin-top: 12px;
}

.composer-image {
  margin-top: 12px;
  float: right;
  max-width: 300px; /* TODO: use breakpoints for different screen sizes? */
}

.tags {
  margin: 12px 0px 18px 0px;
}

</style>