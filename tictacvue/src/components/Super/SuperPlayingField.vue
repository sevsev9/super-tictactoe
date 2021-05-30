<template>
  <div>
    <div :key="i" v-for="(row, i) in matrix" style="margin: -3px">
      <div :key="10+j" v-for="(col,j) in matrix[i]" style="display: inline-block">
        <Grid
            :disabled="!focused[i][j]"
            :grid_array="col"
            :player="playing"
            :grid_key="[i,j]"
            @change="processChange"
            class="part"
        >
        </Grid>
      </div>
    </div>
  </div>
</template>

<script>
import matrix_logic from "@/functions/matrix_logic";
import {bus} from "@/main";
import {createUUID} from "@/functions/uuid";
import Grid from "@/components/TicTacToe/Grid";

export default {
  name: "SuperPlayingField",
  components: {Grid},
  props: {
    game_joined: Boolean,
    players: Array
  },
  data: () => {
    return {
      matrix: [
        [[/*matrix 0,0*/], [/*matrix 0,1*/], [/*matrix 0,2*/]],
        [[/*matrix 1,0*/], [/*matrix 1,1*/], [/*matrix 1,2*/]],
        [[/*matrix 2,0*/], [/*matrix 2,1*/], [/*matrix 2,2*/]]
      ],
      focused: [  //-1||-2 --> player 1 or player 2 owns the matrix, 0 -> playable but not focused, 1 playable and focused
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      winners: [
        [[], [], []],
        [[], [], []],
        [[], [], []]
      ],
      full_matrix_count: 0, //if gte 9 --> game done --> check winner
      focused_cords: [0, 0],
      playing: 0,
      createUUID_1: createUUID
    }
  },
  methods: {
    processChange(change_data) {
      // eslint-disable-next-line no-console
      console.log("change_data", change_data)

      if (change_data.grid_key[0] === this.focused_cords[0] && change_data.grid_key[1] === this.focused_cords[1]) {
        let cell_value = change_data.cell;  //cell value (content)
        let position = cell_value.position; //cell position

        //set the player move in the local matrix
        this.matrix[this.focused_cords[0]][this.focused_cords[1]] [position[0] - 1][position[1] - 1] = cell_value.data;

        //disable current matrix
        this.focused[this.focused_cords[0]][this.focused_cords[1]] = 0;

        // eslint-disable-next-line no-console
        console.log("focused", this.focused_cords)

        //get points in playing matrix
        let ret = matrix_logic.checkWinner(this.matrix[this.focused_cords[0]][this.focused_cords[1]], this.players[this.playing].char);
        // eslint-disable-next-line no-console
        console.log("ret", ret)
        if (ret > 0) {
          this.focused[this.focused_cords[0]][this.focused_cords[1]] = 0 - (this.playing + 1);
        }

        //focus the next matrix move
        this.focused_cords[0] = position[0] - 1;
        this.focused_cords[1] = position[1] - 1;

        if (this.matrix[this.focused_cords[0]][this.focused_cords[1]].flat().includes("")) {
          //enable next matrix
          this.focused[this.focused_cords[0]][this.focused_cords[1]] = 1;
        }

        if (this.players[this.playing] === this.players[0]) {
          this.playing = 1;
        } else {
          this.playing = 0;
        }
        this.$emit('field-update', {player: this.players[this.playing], points: this.getPoints()});

      }
    },
    resetField() {
      this.matrix = [
        [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]],
        [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]],
        [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]]
      ];
    },
    getPoints() {
      let p0 = {player: this.players[0], points: this.getPlayerPoints(this.players[0])};
      let p1 = {player: this.players[1], points: this.getPlayerPoints(this.players[1])};
      return [p0, p1];
    },
    getPlayerPoints() {
      return 1;
    }
  },
  created() {
    this.resetField();
    this.playing = 0;
    this.players[0].char = 'x';
    this.players[1].char = 'o';
  },
  mounted() {
    bus.$on('reset-field', this.resetField)
  }
}
</script>

<style scoped>
.part {
  width: 12.6em;
  height: 12.6em;
}
</style>