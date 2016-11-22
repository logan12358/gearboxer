<template>
  <div class="config">
    <p>Upper gears</p>
    <ul><li v-for="teeth in uppers">{{ teeth }}</li></ul>
    <p>Lower gears</p>
    <ul><li v-for="teeth in lowers">{{ teeth }}</li></ul>
    <p>Levers and Slide</p>
    <p>{{ lever }} {{ slide }}</p>
  </div>
</template>

<script>
  import { gearSetTeeth } from '../lathe'

  export default {
    name: 'config',
    props: ['value'],
    computed: {
      uppers: function () {
        return [...gearSetTeeth(this.value.gears.upper)]
      },
      lowers: function () {
        return [...gearSetTeeth(this.value.gears.lower)]
      },
      lever: function () {
        return this.value.lever.name
      },
      slide: function () {
        return this.value.slide.name
      }
    }
  }
</script>
