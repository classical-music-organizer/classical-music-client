<template>
  <sidebar-template :links='sidebarLinks'>
    <div class='work container-fluid' v-if='loaded'>
      <div class='row'>
        <div class='col'>
          <h2 class='work-name'>{{ work.name }}</h2>
          <h5 class='composer-name'>By <router-link :to='composerLink(work.composer)'>{{ work.composer.fullName }}</router-link></h5>

          <div class='tags' v-if='work.tags && work.tags.length > 0'>
            <tag-link
              v-for='tag in work.tags'
              v-bind:key='tag.id'
              :tag='tag'></tag-link>
          </div>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper ultricies risus a consequat. Praesent finibus dolor ac ex cursus, eget gravida dolor luctus. Mauris ultrices lectus ut urna convallis congue. Phasellus eu lorem vulputate, consectetur odio id, fermentum tortor. Donec nisi tellus, blandit ac rhoncus nec, consequat id sem. Suspendisse eros erat, ultricies non ante eu, commodo sollicitudin enim. Duis ante dui, molestie nec iaculis in, volutpat a dolor.

              Aenean ultrices lect</p>
        </div>

        <div class='col col-auto'>
          <ul class='movements-list list-group' v-if='work.movements.length > 0'>
            <li
              class='list-group-item'
              v-for='m in work.movements'
              v-bind:key='m.id'
            >{{ m.name }}</li>
          </ul>
        </div>
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
  name: 'Work',
  components: {
    SidebarTemplate,
    TagLink
  },
  data() {
    return {
      loaded: false,
      work: null,

      // marks slug-correcting route redirects to prevent reloading the same work twice
      slugRedirect: false
    }
  },
  async mounted() {
    const { id } = this.$route.params

    await this.retrieveWork(id)
  },
  async beforeRouteUpdate(to) {
    // TODO: if the user clicked on a sidebar work link, see if we can reuse the work object already loaded in tags until API responds for faster loading experience; might be worth loading into VueX

    if (this.slugRedirect) {
      // work has already been loaded; only the route is changing, so we can unset the flag and return
      this.slugRedirect = false
      return
    }

    if (to.name == 'work' || to.name == 'workSlug') {
      this.retrieveWork(to.params.id)
    }
  },
  methods: {
    // retrieves the work object and sets loaded to true; if slug is incorrect, it redirects to corrected url 
    async retrieveWork(id) {
      this.loaded = false
      this.work = null

      try {
        this.work = await Api.work.retrieve(id, {populateTags: true})

        const { slug } = this.work

        // redirect the url to use the correct work slug
        if (this.$route.params.slug != slug) {
          this.slugRedirect = true // prevent reloading work in beforeRouteUpdate
          this.$router.push({ name: 'workSlug', params: {id, slug}})
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
    sidebarLinks() {
      if (!this.work) return []

      const headingName = tagName => `${tagName} WORKS`

      return this.work.tags.map(tag => {
        return {
          heading: {text: headingName(tag.name), link: this.tagLink(tag)},
          links: tag.works.data.map(w => {
            return {text: w.name, link: this.workLink(w)}
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.work-name {
  margin: 12px 0px 0px 0px;
}

.composer-name {
  margin-bottom: 16px;
}

.tags {
  margin: 12px 0px 18px 0px;
}

.movements-list {
  display: inline-block;
  min-width: 200px;
  margin-top: 12px;
  float: right;
}

</style>