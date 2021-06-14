<template>
  <div class="overlay">
    <div class="config">
      <h1>Configure Game</h1>
      <hr style="background-color: rgba(0,0,0,0.5); width: 100%; height: 2px">
      <b-input-group prepend="Player 1" class="mt-3 input">
        <b-form-input v-model="player1.name" placeholder="Player 1 Name"></b-form-input>
        <b-input-group-append>
          <b-form-radio-group
              id="btn-radios-1"
              v-model="player1.letter"
              :options="letters"
              name="radios-btn-default"
              buttons
          ></b-form-radio-group>
        </b-input-group-append>
      </b-input-group>
      <b-input-group prepend="Player 2" class="mt-3 input">
        <b-form-input v-model="player2.name" placeholder="Player 2 Name"></b-form-input>
        <b-input-group-append>
          <b-form-radio-group
              id="btn-radios-2"
              v-model="player2.letter"
              :options="letters"
              name="radios-btn-default"
              buttons
          ></b-form-radio-group>
        </b-input-group-append>
      </b-input-group>


      <b-button @click="start" variant="primary" class="btn">Start</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartOverlay",
  data: () => {
    return {
      player1: {
        name: "",
        letter: "X"
      },
      player2: {
        name: "",
        letter: "O"
      },
      letters: [
          "X",
          "O"
      ]
    }
  },
  methods: {
    start() {
      if (this.player1.name.length < 4) {
        alert("Player 1 Name length must be greater than 3");
      } else if (this.player2.name.length < 4) {
        alert("Player 1 Name length must be greater than 3");
      } else if (this.player1.letter === this.player2.letter) {
        alert("Players have to pick different letters!");
      } else {
        this.$store.commit('startGame', {
          player1: this.player1,
          player2: this.player2
        })
      }
    }
  }
}
</script>

<style scoped>
.overlay {
  width: 100%;
  position: absolute;
  z-index: 1;
  height: 100vh;
  background-color: rgba(21, 21, 21, 0.51);
  overflow: hidden;
}

.input {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}

.btn {
  margin-bottom: 0;
  display: block;
  margin-left: 30%;
  width: 40%;
  margin-top: 10%;
}

.config {
  margin-top: 20vh;
  height: 60vh;
  margin-left: 35%;
  width: 30%;
  background-color: rgba(135, 135, 135, 0.5);
  border: 1px solid black;
  box-shadow: 5px 5px 5px black;
  border-radius: 5px;
  text-align: center;
}
</style>