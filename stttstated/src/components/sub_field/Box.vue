<template>
  <div class="tic-container" @click="setMove">
    <p>
      {{letter}}
    </p>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    /**
     * An array containing the absolute location path in the specified box.
     * @param location [super_row, super_col, row, col]
     */
    location: Array
  },
  data: () => {
    return {
      letter: ""
    }
  },
  methods: {
    setMove() {
      this.$store.commit('setPosition', this.location)
      this.letter = this.$store.getters.matrix[this.location[0]][this.location[1]][this.location[2]][this.location[3]];
    }
  }
}
</script>

<style scoped>
.tic-container {
  width: 4em;
  height: 4em;
  overflow: hidden;
}

.tic-container > p {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  font-weight: bold;
  padding: 0;
}

.tic-container > p:hover {
  cursor: cell;
}
</style>