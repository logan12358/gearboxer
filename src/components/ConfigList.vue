<template>
  <ul class="config-list">
    <li v-for="config in value">
    <config
      v-bind:value="config"
    />
  </ul>
</template>

<script>
  import Config from './Config'

  export default {
    name: 'config-list',
    props: ['value'],
    components: {
      Config
    }
  }
</script>
