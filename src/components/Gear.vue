<template>
  <div class="gear">
    <span class="teeth" v-text="value.teeth" />
    <span class="count" v-text="value.count" />
    <button v-on:click="$emit('increment')">+</button><button v-on:click="$emit('decrement')">-</button>
  </div>
</template>

<script>
  export default {
    name: 'gear',
    props: {
      value: {
        type: Object,
        default: () => ({}),
        required: true,
        validator: (value) => (
          Number.isInteger(value.count) &&
          Number.isInteger(value.teeth)
        )
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/style/colours";

  span {

    &.count {
      &:before {
        content: '\D7';
      }
    }

    &.teeth {
    }
  }

  button {
    height: 2em;
    width: 2em;
    border: none;
    outline: none;
  }
</style>
