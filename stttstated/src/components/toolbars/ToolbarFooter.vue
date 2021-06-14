<template>
  <div>
    <b-button @click="setMove" class="btn-right" variant="primary">Next (Enter)</b-button>
    <b-button @click="concede" class="btn-left" variant="danger">Concede</b-button>
  </div>
</template>

<script>
export default {
  name: "ToolbarFooter",
  methods: {
    setMove() {
      this.$store.commit('setMove');
    },
    concede() {
      if (confirm("Are you sure you want to concede?")) {
        this.$store.commit('resetField')
      }
    }
  }
}
</script>

<style scoped>
  .btn-right {
    float: right;
    margin-right: 10%;
    margin-top: 2.5vh;
  }

  .btn-left {
    float: left;
    margin-top: 2.5vh;
    margin-left: 10%;
  }
</style>