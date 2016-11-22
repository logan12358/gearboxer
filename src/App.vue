<template>
  <div id="app">
    <h1>Lathe Config</h1>
    <lathe-input
      v-model="lathe"
    />
    <h1>Single Thread Calculation</h1>
    <thread-input
      v-model="thread"
    />
    <calculator
      v-bind:lathe="lathe"
      v-bind:thread="thread"
      v-on:results="results = $event"
    />
    <config-list
      v-model="results"
    />
  </div>
</template>

<script>
  import LatheInput from './components/LatheInput'
  import ThreadInput from './components/ThreadInput'
  import ConfigList from './components/ConfigList'
  import Calculator from './components/Calculator'

  export default {
    name: 'app',
    data: () => ({
      lathe: {
        gears: [],
        leadscrew: undefined
      },
      thread: undefined,
      results: []
    }),
    watch: {
      lathe: {
        handler: function (lathe) {
        },
        deep: true
      },
      thread: function () {
      }
    },
    components: {
      LatheInput,
      ThreadInput,
      ConfigList,
      Calculator
    }
  }
</script>

<style lang="scss">
@import "assets/style/colours";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
  margin-top: 60px;
}
</style>
