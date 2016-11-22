<template>
  <input
    v-model="rawValue"
    v-bind:class="{ invalid: invalid }"
  >
</template>

<script>
  import { parseThread } from '../threads'

  export default {
    name: 'thread-input',
    props: ['value'],
    data: function () {
      return {
        rawValue: ''
      }
    },
    computed: {
      parsedValue: function () {
        return parseThread(this.rawValue)
      },
      invalid: function () {
        return this.parsedValue === undefined
      }
    },
    watch: {
      parsedValue: function () {
        if (!this.invalid && this.parsedValue !== this.value) {
          this.$emit('input', this.parsedValue)
        }
      }
    }
  }
</script>

<style lang="scss">

input.invalid {
  color: red;
}

</style>
