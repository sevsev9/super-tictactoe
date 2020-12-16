<template>
    <div style="min-height: 800px; border: 2px solid green">
        <div class="header"><h1>Header</h1></div>
        <div class="channels"><h1>Channels</h1></div>
        <div class="msg-container"><h1>Messages</h1></div>
        <div class="footer"><input-container></input-container></div>
    </div>
</template>

<script>
    import InputContainer from "@/components/chatwindow/subcomponents/InputContainer";
    export default {
        name: "ChatWindow",
        components: {InputContainer}
    }
</script>

<style scoped>
    .header {
        border: 2px solid red;
    }

    .channels {
        float: left;
        display: inline-block;
        border: 2px solid red;
    }

    .msg-container {
        border: 2px solid red;
    }

    .footer {
        border: 2px solid red;
    }
</style>
