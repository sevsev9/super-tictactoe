<template>
  <div class="containing">
    <div class="timer">Playtime: {{ time }}</div>
    <p class="playing">
      Currently Playing: {{ $store.state.playing.name }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Heading",
  data: () => {
    return {
      time: "00:00:00",
      timerInterval: null
    }
  },
  methods: {
    calcTimer() {
      let diff = Date.now() - this.$store.state.startTime;
      this.time = this.pad(Math.trunc(diff / 60000)) + ":" +
          this.pad(Math.trunc((diff / 1000) % 60)) + ":" +
          this.pad(diff % 1000);
    },
    /**
     * Pads a number lower than 0 with a leading 0.
     * @param num The number to be padded.
     * @return {string} The padded number.
     */
    pad(num) {
      return (num < 10) ? "0" + num : "" + num;
    },
    timerControl() {
      if (!this.$store.state.gameDone && this.$store.state.startTime !== 0) {
        this.calcTimer();
      }
    }
  },
  mounted() {
    this.timerInterval = setInterval(this.timerControl, 1)
  }
}
</script>

<style scoped>
.timer {
  float: left;
  margin-top: 1vh;
  margin-left: 10%;
  position: absolute;
}

.containing {
  display: flex;
}

.playing {
  margin: auto;
}

</style>