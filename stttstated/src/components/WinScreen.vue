<template>
  <div class="winscreen">
    <div class="center">
      <div style="height: 100%; width: 100%"
           v-if="$store.state.player1.score === $store.state.player2.score"
      >
        <h1>It's a tie!</h1>
        <p>You tied with a score of {{$store.getters.winner.score}}!</p>
      </div>

      <div style="height: 100%; width: 100%"
           v-else-if="$store.state.player1.score !== $store.state.player2.score"
      >
        <h1 >Congratulations {{ $store.getters.winner.name }}!</h1>
        <p>You Won with a score of {{$store.getters.winner.score}}!</p>
      </div>
    </div>

    <div class="button_bar">
      <Button3D @click="$store.commit('resetField')">Restart</Button3D>
    </div>
  </div>
</template>

<script>
import Button3D from "@/components/Button3D";

export default {
  name: "WinScreen",
  components: {
    Button3D
  }
}
</script>

<style scoped>
.winscreen {
  color: white;
  background-color: rgba(130, 130, 130, 0.5);
  position: absolute;
  width: 100%;
  height: 100vh;
}

.center {
  position: absolute;
  top: 20vh;
  align-content: center;
  text-align: center;
  background-color: rgba(13, 13, 13, 0.8);
  width: 50%;
  margin-left: 25%;
  border: 2px solid white;
  border-radius: 8px;
}

.button_bar {
  margin-top: 700px;
  width: fit-content;
  margin-left: 49%;
}


</style>