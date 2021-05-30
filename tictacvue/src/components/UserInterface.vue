<template>
    <div>
        <div>
            <div v-if="gamemode === 'normal'">
                <PlayingField
                        v-if="game_joined === true"
                        @player-change="playerChange"
                        @won="won"
                        :players="players"
                        class="field"
                        ref="field"
                        gamemode="0"
                ></PlayingField>
            </div>
            <div v-if="gamemode === 'super'">
                <SuperPlayingField
                        v-if="game_joined === true"
                        @player-change="playerChange"
                        @won="won"
                        :players="players"
                        class="super_field"
                        ref="field"
                ></SuperPlayingField>
            </div>

            <div class="top right">User Profile/Options</div>
            <div class="top center">Timer</div>
            <div class="top left">Player List</div>
            <div class="bottom right">Buttons: Finish move, Surrender</div>
            <div class="bottom left">{{playing}}</div>
            <div class="bottom center">Ads?</div>
        </div>
        <div v-if="winner !== ''" class="over">
            <WinScreen :winner="winner.name"></WinScreen>
        </div>
    </div>
</template>

<script>
    import PlayingField from "@/components/TicTacToe/PlayingField";
    import WinScreen from "@/components/UI/WinScreen";
    import {bus} from "../main";
    import SuperPlayingField from "@/components/Super/SuperPlayingField";

    export default {
        name: "UserInterface",
        components: {SuperPlayingField, WinScreen, PlayingField},
        data: () => {
            return {
                winner: "",
                game_joined: true,
                playing: "",
                players: [
                    {name: "A"},
                    {name: "B"}
                ],
                gamemode: "super"
            }
        },
        methods: {
            won(w) {
                this.winner = w;
            },
            playerChange(p) {
                this.playing = p.name;
            }
        },
        mounted() {
            bus.$on('reset-field', () => {
                this.winner = ""
            })
        }
    }
</script>

<style scoped>
    .bottom {
        position: absolute;
        bottom: 0;
    }

    .top {
        position: absolute;
        top: 0;
    }

    .left {
        position: absolute;
        left: 0;
    }

    .right {
        position: absolute;
        right: 0;
    }

    .center {
        position: absolute;
        width: 100%;
        align-content: center;
        text-align: center;
    }

    .over {
        position: absolute;
        z-index: 15;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.68);
    }

    .field {
        margin-left: 42%;
        margin-top: 250px;
    }

    .super_field {
        margin-left: 10%;
        margin-top: 5vh;
    }


</style>