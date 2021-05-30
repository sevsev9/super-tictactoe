<template>
  <div class="cell"
       @click="setContent"
  >
    <span>{{ cell_value }}</span>
  </div>
</template>

<script>
import {bus} from "../../main";

export default {
  name: "Cell",
  props: {
    playing: Number,
    row: Number,
    col: Number,
    disabled: Boolean
  },
  data: function () {
    return {
      cell_value: "",
      clickable: true
    }
  },
  methods: {
    setContent() {
      if (!this.disabled && this.clickable) {
        if (this.cell_value !== "") {
          this.cell_value = "";
        } else {
          if (this.playing === 0) {
            this.cell_value = "o"
          } else {
            this.cell_value = "x"
          }
        }
        this.clickable = false;
        this.$emit("change", {position: [this.row, this.col], data: this.cell_value})
      }

    },
    resetCell() {
      this.clickable = true;
      this.cell_value = "";
    },
    cellUpdate(args) {
      if ((this.row === args.row && this.col === args.col) || (args.row === this.row && args.col === "*") || (args.col === this.col && args.row === "*")) {
        if (args.reset !== undefined) {
          this.resetCell();
        } else if (args.cell_value !== undefined) {
          this.cell_value = args.cell_value;
        } else if (args.clickable !== undefined) {
          this.clickable = args.clickable;
        }
      }
    }
  },
  mounted() {
    bus.$on('reset-field', this.resetCell);
    bus.$on('cell-update', this.cellUpdate);
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

.cell {
  width: 4em;
  height: 4em;
  overflow: hidden;
  display: inline-block;
  border: 0.1em solid grey;
  text-align: center;
}

.cell > span {
  vertical-align: middle;
  font-size: 3.5em;
}


</style>