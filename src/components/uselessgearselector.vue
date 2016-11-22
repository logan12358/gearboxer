<template>
  <div class="gear-selector">
    <gear-set-input ref="gears" v-model="gears" />
    {{ gears.teeth }}, {{ gears.count }}
    <p v-for="g in gears">
      {{ g.teeth }} {{ g.count }}
    </p>
    <button v-on:click="log">asdf</button>
    <p>
      Leadscrew (TPI): <input v-model.number="leadscrew" type="number">
    </p>
    <p>
      Desired (TPI):
      <input v-model="desired"
             v-bind:class="{ invalid: desiredTpi === undefined }">
    </p>
    Results ({{ results.length }}):
    <ul v-for="r in results">
      <li>{{ r }}</li>
    </ul>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import * as types from '../store/mutation-types'
import GearSetInput from './GearSetInput'
import { gearSetAdd, gearSetRemove, ratio } from '../calc'
import bounds from 'binary-search-bounds'
import Fraction from 'fraction.js'
import { parseThread } from '../threads'

var MyWorker = require('worker?inline!../worker.js')

var worker

export default {
  name: 'gear-selector',
  data: function () {
    return {
      gears: [{count: 1, teeth: 40}, {count: 1, teeth: 50}],
      gearInput: 42,
      leadscrew: 4,
      desired: '8 tpi',
      results: ['No result yet']
    }
  },
  /* computed: {
    ...mapGetters([
      'gears'
    ])}, */
  methods: {
    addGear (numTeeth) {
      // this.$store.commit(types.ADD_GEAR, numTeeth)
      gearSetAdd(this.gears, numTeeth)
      this.gearInput = ''
    },
    removeGear (numTeeth) {
      console.log('Removing gear')
      gearSetRemove(this.gears, numTeeth)
    },
    log () {
      console.log(this.$refs.gears.test())
    }
  },
  computed: {
    desiredTpi () {
      return parseThread(this.desired)
    }
  },
  watch: {
    gears: {
      handler: function (gears) {
        if (worker) worker.terminate()
        worker = new MyWorker()
        this.result = ['Working...']
        console.log('Sending message to worker')
        worker.postMessage(gears)
        var component = this
        worker.onmessage = function (e) {
          console.log('Received result!', e)
          component.results = []
          var target = Fraction(component.desiredTpi).div(component.leadscrew)
          var cmp = (a, b) => ratio(a).compare(b)
          if (e.data.length === 0) {
            return
          }
          var high = ratio(e.data[bounds.ge(e.data, target, cmp)] || e.data[e.data.length - 1])
          var low = ratio(e.data[bounds.le(e.data, target, cmp)] || e.data[0])
          if (target.sub(high).abs() < target.sub(low).abs()) low = high
          if (target.sub(low).abs() < target.sub(high).abs()) high = low
          console.log(low.mul(component.leadscrew).round([4]), high.mul(component.leadscrew).round([4]))
          var results = e.data.slice(bounds.ge(e.data, low, cmp), bounds.le(e.data, high, cmp) + 1)
          for (var result of results) {
            var [{upper, lower}, lever, slide] = result
            var comb = [upper[0].teeth, upper[1].teeth, lower[0].teeth, lower[1].teeth, lever.name, slide.name].join(' ')
            component.results.push(ratio(result).mul(component.leadscrew).round([4]) + ': ' + comb)
          }
        }
      },
      deep: true
    }
  },
  components: {
    GearSetInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input.invalid {
    color: red;
  }
</style>
