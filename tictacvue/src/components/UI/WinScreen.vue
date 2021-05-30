<template>
    <div>
        <div class="center winscreen">
            <h1>Congratulations {{winner}}!</h1>
            <p>You Won!</p>
        </div>

        <div class="button_bar">
            <Button3D @click="resetGame">Restart</Button3D>
        </div>
    </div>
</template>

<script>
    import Button3D from "@/components/UI/Button3D";
    import {bus} from "../../main"

    export default {
        name: "WinScreen",
        components: {
            Button3D
        },
        props: {
            winner: String
        },
        methods: {
            resetGame() {
                bus.$emit('reset-field')
            }
        }
    }
</script>

<style scoped>
    .winscreen {
        color: white;
    }

    .center {
        position: absolute;
        width: 100%;
        top: 0;
        align-content: center;
        text-align: center;
    }

    .button_bar {
        margin-top: 700px;
        width: fit-content;
        margin-left: 49%;
    }


</style>