<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to='/' class='navbar-brand'>Classical Music</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to='/'
              class='nav-link'
              :class='{active: isCurrentRoute("home")}'
            >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              to='/about'
              class='nav-link'
              :class='{active: isCurrentRoute("about")}'
            >About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    isCurrentRoute(name) {
      return this.$route.name == name
    }
  }
}
</script>