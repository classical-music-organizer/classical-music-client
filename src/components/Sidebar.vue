<template>
  <nav id='sidebar'>
    <div v-for='(link, i) in links' v-bind:key='i'>
      <h5 v-if='link.heading' class='sidebar-nav-heading'>{{ link.heading.text }}</h5>
      <ul class='sidebar-nav-items'>
        <li class='sidebar-nav-item' v-for='(subLink, j) in link.links' v-bind:key='j'>
          <router-link :to='subLink.link'>{{ subLink.text }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['links'],
  methods: {
    isCurrentLink(link) {
      return this.$route.path == link
    }
  }
}
</script>

<style scoped>

#sidebar {
  width: 220px;
  height: 100%;

  padding-right: 12px;
  border-right: 1px solid #ddd;
}

.sidebar-nav-heading {
  margin: 0px;
  padding: 20px 16px 4px 16px;

  font-size: 14px;
  font-weight: 600;
  color: #2a2f45;
  text-transform: uppercase;
}

.sidebar-nav-items {
  margin: 0px;
  padding: 0px;
  color: #8792a2;
}

.sidebar-nav-item {
  list-style: none;
}

.sidebar-nav-item a {
  display: block;
  padding: 4px 16px;

  font-size: 14px;
  font-weight: 500;
  color: #697386;
  text-decoration: none;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  transition: color .2s ease;
}

.sidebar-nav-item a:visited {
  color: #8792a2;
}

.sidebar-nav-item .router-link-active {
  color: #556cd6;
  background-color: #f5fbff;
}

.sidebar-nav-item a:hover {
  color: #2a2f45;
}

</style>