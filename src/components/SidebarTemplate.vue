<template>
  <div class='container-fluid v-100'>
    <div class='row h-100'>
      <div class='col-auto h-100 p-0'>
        <sidebar :links='links' />
      </div>
      <div class='col'>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'SidebarTemplate',
  components: {
    Sidebar
  },
  props: ['links']
}
</script>