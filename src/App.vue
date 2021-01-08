<template>
  <div class='container-fluid min-vh-100 d-flex flex-column'>
    <div class='row'>
      <navbar />
    </div>
    <div class='row flex-grow-1'>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}

</script>

<style>

</style>
