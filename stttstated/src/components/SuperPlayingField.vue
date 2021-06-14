<template>
  <div class="containment">
    <div class="grid" :key="$store.getters.gridKey">  <!-- if vuejs detects, that the key changes it will create a new component -->
      <div v-for="i in 3" :key="i" style="height: calc(3*4em + 3px);"> <!-- 3 super rows -->
        <div v-for="j in 3"
             :key="i+' '+j"
             class="grid"
             style="
              display: inline-block;
              border: 2px solid grey;
           "
             :class="{
             'bg-red': $store.getters.finishedBool[i-1][j-1],
             'bg-green': checkActive(i-1, j-1),
             'bg-gray': !checkActive(i-1, j-1)
           }"
        > <!-- 3 super cols -->
          <div v-for="row in 3" :key="row" style="margin: 0;padding: 0; display: block; height: 4em"> <!-- 3 rows -->
            <Box v-for="col in 3"
                 :key="row+' '+col"
                 @click="update([row, col])"
                 :location="[i-1, j-1, row-1, col-1]"
                 style="
                  display: inline-block;
                  border: 1px dashed green;
                 "
            ></Box> <!-- 3 cols -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Box from "@/components/sub_field/Box";
export default {
  name: "SuperPlayingField",
  components: {Box},
  props: {},
  methods: {
    update: (address) => {
      this.store.commit('setMove', {
        position: address
      })
    },
    checkActive(i, j) {
      // console.log("active", this.$store.getters.active);
      // console.log('i, j', i + ", " + j);
      return this.$store.getters.active[0] === i && this.$store.getters.active[1] === j
    }
  }
}
</script>

<style scoped>
  .bg-red {
    background-color: red;
  }

  .bg-green {
    background-color: rgba(255, 136, 43, 0.62);
  }

  .bg-gray {
    background-color: rgba(111, 111, 111, 0.56);
  }

  .containment {
    display: flex;
  }

  .grid {
    margin: auto;
  }
</style>