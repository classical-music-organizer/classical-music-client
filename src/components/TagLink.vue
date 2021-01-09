<template>
  <span class='tag'>
    <router-link :to='tagLink'>
      <span v-if='tagName'>{{ tagName }}</span>
      <slot v-else></slot>
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'TagLink',
  props: ['tag', 'link'], // only requires one
  computed: {
    // TODO: this is not an appropriate place to generate tag link
    tagLink() {
      if (!this.tag) return this.link

      const { id, slug } = this.tag 
      return `/tag/${id}/${slug}`
    },
    tagName() {
      if (!this.tag) return

      const { name } = this.tag
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() // capitalize tag name
    }
  }
}
</script>

<style scoped>

.tag {
  margin-right: 8px;
  padding: 6px 14px;
  background-color: #fff176;
  border-radius: 6px;

  font-weight: 500;

  transition: background-color .1s ease;
}

.tag a {
  text-decoration: none;
  color: #212121;
}

.tag:hover {
  background-color: #fdd835;
}

</style>