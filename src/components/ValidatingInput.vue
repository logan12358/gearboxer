<template>
  <input
    class="validating-input"
    v-bind:value="value"
    v-on:input="update($event.target.value)"
    v-bind:class="{ invalid: validate() === undefined }"
  >
</template>

<script>
  export default {
    name: 'validating-input',
    props: ['value', 'validator'],
    methods: {
      update: function (value) {
        this.$emit('input', this.validate(value) || value)
      },
      validate: function (value = this.value) {
        return this.validator(value)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/style/colours";
  
  input.invalid {
    background-color: $red !important;
  }
</style>
