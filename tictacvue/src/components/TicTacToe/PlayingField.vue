<template>
    <div>
        <Grid
                :grid_array="matrix"
                @change="processChange"
                :player="playing"
                ref="grid"
                class="seas"
        ></Grid>
    </div>
</template>

<script>
    import matrix_logic from '../../functions/matrix_logic';
    import Grid from "@/components/TicTacToe/Grid";
    import {bus} from "../../main";

    export default {
        name: "PlayingField",
        components: {Grid},
        props: {
            players: Array
        },
        data: function () {
            return {
                matrix: [
                    ["","",""],
                    ["","",""],
                    ["","",""]
                ],
                playing: 0
            }
        },
        methods: {
            processChange(cell_value) {

                // eslint-disable-next-line no-console
                console.log("cell_value",cell_value.cell);
              // eslint-disable-next-line no-console
                console.log(this.matrix)

                this.matrix[cell_value.cell.position[0]-1][cell_value.cell.position[1]-1] = cell_value.cell.data;
                if (this.players[this.playing] === this.players[0]) {
                    this.playing = 1;
                } else {
                    this.playing = 0;
                }
                this.$emit('player-update', this.players[this.playing]);

                if (matrix_logic.checkWinner(this.matrix, this.players[this.playing].char) > 0) {
                    this.$emit('won', this.players[this.playing]);
                }

            },
            resetField() {
                this.matrix = [
                    ["","",""],
                    ["","",""],
                    ["","",""]
                ];
            }
        },
        created() {
            this.playing = 0;
            this.players[0].char = 'x';
            this.players[1].char = 'o';
        },
        mounted() {
            bus.$on('reset-field', this.resetField);
            this.playing = 0;
            this.players[0].char = 'x';
            this.players[1].char = 'o';
        }
    }
</script>

<style scoped>
    .seas {
        height: 300px;
        width: 300px;
    }
</style>