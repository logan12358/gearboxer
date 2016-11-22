<template>
  <div class="calculator">
    <p v-if="state === 'WAITING'">Not working</p>
    <p v-else>Working...</p>
    {{ error }}
  </div>
</template>

<script>
  var Worker = require('worker!../worker.js')

  const states = {
    UNINITIALIZED: 'UNINITIALIZED',
    PRECOMPUTING: 'PRECOMPUTING',
    LOOKING: 'LOOKING',
    WAITING: 'WAITING'
  }

  export default {
    name: 'calculator',
    props: ['lathe', 'thread'],
    data: function () {
      return {
        worker: new Worker(),
        state: states.UNINITIALIZED,
        error: 'N/A'
      }
    },
    watch: {
      lathe: function (lathe) {
        if (this.state !== states.WAITING) {
          this.worker.terminate()
          this.worker = new Worker()
          this.state = states.WAITING
          this.worker.onmessage = this.handlemessage
        }
        this.state = states.PRECOMPUTING
        this.worker.postMessage({ type: 'PRECOMPUTE', lathe: lathe })
      },
      thread: function (thread) {
        this.worker.postMessage({ type: 'LOOKUP', thread: thread })
        this.state = 'LOOKING'
      }
    },
    methods: {
      handlemessage: function ({ data: message }) {
        console.log('Main received', message)
        if (message.type === 'DONE') {
          this.state = states.WAITING
        } else if (message.type === 'RESULTS') {
          this.$emit('results', message.results)
          this.error = message.error
          this.state = states.WAITING
        }
      }
    }
  }
</script>
