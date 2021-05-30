<template>
  <div class="grid">
    <div class="row" :key="row" v-for="row in grid_array.length">
      <cell :disabled="disabled" @change="stateChange" :playing="player" :row="row" :col="col" :key="10+col" v-bind:class="{'focused-border': !disabled}"
            v-for="col in grid_array.length"></cell>
    </div>
  </div>
</template>

<script>
import Cell from "@/components/TicTacToe/Cell";

export default {
  name: "Grid",
  components: {Cell},
  props: {
    grid_array: Array,
    player: Number,
    disabled: Boolean,
    grid_key: Array
  },
  methods: {
    stateChange(cell_info) {
      this.$emit("change", {cell: cell_info, grid_key: this.grid_key})
    }
  }
}
</script>

<style scoped>
div {
  margin: 0;
  -webkit-margin-before: 0;
  -webkit-padding-before: 0;
  -webkit-margin-after: 0;
  -webkit-padding-after: 0;
}

.grid {
  width: 12.6em;
  height: 12.6em;
}

.row {
  width: 12.6em;
  height: 4.1em;
}

.focused-border {
  border: 0.1em solid green;
}
</style>