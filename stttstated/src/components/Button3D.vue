<template>
        <div @click="click" class="button_base b05_3d_roll">
            <div><slot></slot></div>
            <div><slot></slot></div>
        </div>
</template>

<script>
    export default {
        name: "Button3D",
        methods: {
            click() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 1260px) {
        .back {
            width: 50%;
        }
    }

    @media screen and (max-width: 840px) {
        .back {
            width: 100%;
        }
    }

    .button_base {
        border: 0;
        font-size: 18px;
        position: relative;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -100px;
        width: 200px;
        height: 50px;
        text-align: center;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-user-select: none;
        cursor: default;
    }

    .button_base:hover {
        cursor: pointer;
    }

    .b05_3d_roll {
        perspective: 500px;
        -webkit-perspective: 500px;
        -moz-perspective: 500px;
    }

    .b05_3d_roll div {
        position: absolute;
        text-align: center;
        width: 100%;
        height: 50px;
        padding: 10px;
        border: #000000 solid 1px;
        pointer-events: none;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    .b05_3d_roll div:nth-child(1) {
        color: #000000;
        background-color: #000000;
        transform: rotateX(90deg);
        -webkit-transform: rotateX(90deg);
        -moz-transform: rotateX(90deg);
        transition: all 0.2s ease;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        transform-origin: 50% 50% -25px;
        -webkit-transform-origin: 50% 50% -25px;
        -moz-transform-origin: 50% 50% -25px;
    }

    .b05_3d_roll div:nth-child(2) {
        color: #000000;
        background-color: #ffffff;
        transform: rotateX(0deg);
        -webkit-transform: rotateX(0deg);
        -moz-transform: rotateX(0deg);
        transition: all 0.2s ease;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        transform-origin: 50% 50% -25px;
        -webkit-transform-origin: 50% 50% -25px;
        -moz-transform-origin: 50% 50% -25px;
    }

    .b05_3d_roll:hover div:nth-child(1) {
        color: #ffffff;
        transition: all 0.2s ease;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        transform: rotateX(0deg);
        -webkit-transform: rotateX(0deg);
        -moz-transform: rotateX(0deg);
    }

    .b05_3d_roll:hover div:nth-child(2) {
        background-color: #000000;
        transition: all 0.2s ease;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        transform: rotateX(-90deg);
        -webkit-transform: rotateX(-90deg);
        -moz-transform: rotateX(-90deg);
    }
</style>