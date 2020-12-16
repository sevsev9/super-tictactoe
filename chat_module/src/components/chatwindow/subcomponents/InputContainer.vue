<template>
    <div>
        <button class="emote-button">:)</button>
        <b-input class="message-input" placeholder="Type a nice message :)"></b-input>
        <b-button class="send-button">$3ND</b-button>
    </div>
</template>

<script>
    export default {
        name: "InputContainer"
    }
</script>

<style scoped>
    .emote-button {
        border-radius: 10px;
        display: inline-block;
    }

    .message-input {
        display: inline-block;
        width: 60%;
        margin-left: 5%;
    }

    .send-button {
        display: inline-block;
        margin-left: 5%;
    }
</style>
