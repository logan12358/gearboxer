<template>
  <div class="gear-set-input">
    <input
      placeholder="Gear (e.g. 72, 50x3, 62*2)"
      v-model="gearInput"
      v-on:keypress.enter="parsedGearInput && (update(parsedGearInput), gearInput = '')"
    />
    <ul>
      <li v-for="(gear, index) in value">
        <gear
          v-bind:value="gear"
          v-on:increment="update({ teeth: gear.teeth, count: 1 })"
          v-on:decrement="update({ teeth: gear.teeth, count: -1 })"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import Gear from './Gear'
  import { gearSetAdd } from '../lathe'
  
  export default {
    name: 'gear-set-input',
    props: {
      value: {
        type: Array
      }
    },
    data: () => ({
      gearInput: ''
    }),
    computed: {
      parsedGearInput: function () {
        var m = this.gearInput.match(/^\s*(\d+)\s*(?:(?:x|\*)\s*(-?\d+)\s*)?$/i)
        if (m && Number(m[1]) > 0) {
          return { teeth: Number(m[1]), count: Number(m[2]) || 1 }
        }
        return undefined
      }
    },
    methods: {
      update: function (diff) {
        var value = gearSetAdd(this.value, [diff])
        this.$emit('input', value)
      }
    },
    components: {
      Gear
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/colours";

li {
  display: inline-block;
}

</style>
