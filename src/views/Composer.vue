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
      
      <h3 class='compositions-heading'>Compositions</h3>

      <div class="list-group">
        <router-link
          :to='workLink(work)'
          class='list-group-item list-group-item-action'
          v-for='work in composer.works.data'
          v-bind:key='work.id'
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ work.name }}</h5>
          </div>

          <!-- TODO: use shortened info from composer object -->
          <p class="mb-1">The sonatas and partitas for solo violin (BWV 1001–1006) are a set of six works composed by Johann Sebastian Bach....</p>
        </router-link>
      </div>
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
      composer: null,

      // marks slug-correcting route redirects to prevent reloading the same composer twice
      slugRedirect: false
    }
  },
  async mounted() {
    const { id } = this.$route.params

    await this.retrieveComposer(id)
  },
  async beforeRouteUpdate(to) {
    // TODO: if the user clicked on a sidebar composer link, see if we can reuse the composer object already loaded in tags until API responds for faster loading experience; might be worth loading into VueX

    if (this.slugRedirect) {
      // composer has already been loaded; only the route is changing, so we can unset the flag and return
      this.slugRedirect = false
      return
    }

    if (to.name == 'composer' || to.name == 'composerSlug') {
      this.retrieveComposer(to.params.id)
    }
  },
  methods: {
    // retrieves the composer object and sets loaded to true; if slug is incorrect, it redirects to corrected url 
    async retrieveComposer(id) {
      this.loaded = false
      this.composer = null

      try {
        this.composer = await Api.composer.retrieve(id, {populateTags: true})

        const { id, slug } = this.composer

        // redirect the url to use the correct composer slug
        if (this.$route.params.slug != slug) {
          this.slugRedirect = true // prevent reloading composer in beforeRouteUpdate
          this.$router.push({ name: 'composerSlug', params: {id, slug}})
        }
      } catch(err) {
        if (err.code == 404) { // TODO: create strongly typed errors (NotFoundError) and use instanceof
          // TODO: render not found
        } else {
          throw err
        }
      } finally {
        this.loaded = true
      }
    },

    workLink(work) {
      const { id, slug } = work

      return `/work/${id}/${slug}`
    },

    composerLink(composer) {
      const { id, slug } = composer

      return `/composer/${id}/${slug}`
    },

    tagLink(tag) {
      const { id, slug } = tag

      return `/tag/${id}/${slug}`
    }
  },
  computed: {
    imageSrc() {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg'
    },
    sidebarLinks() {
      if (!this.composer) return []

      const headingName = tagName => `${tagName} COMPOSERS`

      return this.composer.tags.map(tag => {
        return {
          heading: {text: headingName(tag.name), link: this.tagLink(tag)},
          links: tag.composers.data.map(c => {
            return {text: c.fullName, link: this.composerLink(c)}
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.composer-name {
  margin-top: 12px;
}

.composer-image {
  margin: 12px 0px 0px 12px;
  float: right;
  max-width: 300px; /* TODO: use breakpoints for different screen sizes? */
}

.tags {
  margin: 12px 0px 18px 0px;
}

</style>