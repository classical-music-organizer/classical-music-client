<template>
  <span class='tag'>
    <router-link to='/tag/1'>
      <slot></slot>
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'TagLink',
  props: ['link']
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