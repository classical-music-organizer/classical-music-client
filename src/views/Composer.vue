<template>
  <sidebar-template :links='sidebarLinks'>
    <h1>{{ composer.fullName }}</h1>
    <p>{{ composer.info }}</p>
  </sidebar-template>
</template>

<script>
import SidebarTemplate from '@/components/SidebarTemplate'

export default {
  name: 'Composer',
  components: {
    SidebarTemplate
  },
  computed: {
    composer() {
      // TODO: return real composer
      return {fullName: 'Johann Sebastian Bach', info: 'Bach was a great baroque composer.'}
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