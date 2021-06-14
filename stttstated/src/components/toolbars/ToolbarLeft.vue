<template>
  <div style="display: flex">
      <b-table ref="playerTable" hover :items="items" :fields="fields" style="margin: auto"></b-table>
  </div>
</template>

<script>
export default {
  name: "ToolbarLeft",
  data: () => {
    return {
      fields: [
        {
          key: 'name',
          label: 'Player Name'
        },
        {
          key: 'letter',
          label: 'Letter'
        },
        {
          key: 'score',
          label: 'Score'
        }
      ],
      items: [],
      polling: null
    }
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
        this.items = this.$store.getters.playerTable;
        this.$refs.playerTable.refresh();
      });
    }
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  created() {
    this.pollData();
  }
}
</script>

<style scoped>

</style>