<template>
  <div class="lathe-input">
    <h2> Gears </h2>
    <gear-set-input
      v-bind:value="value.gears"
      v-on:input="update({ gears: $event })"
    />
    <h2> Leadscrew </h2>
    <thread-input
      v-bind:value="value.leadscrew"
      v-on:input="update({ leadscrew: $event })"
    />
  </div>
</template>

<script>
  import GearSetInput from './GearSetInput'
  import ThreadInput from './ThreadInput'

  export default {
    name: 'lathe-input',
    props: ['value'],
    methods: {
      update (change) {
        this.$emit('input', Object.assign({}, this.value, change))
      }
    },
    components: {
      GearSetInput,
      ThreadInput
    }
  }
</script>
