<template>
    <div class="main_container">
        <ChatWindow></ChatWindow>
    </div>
</template>

<script>
    import ChatWindow from "@/components/chatwindow/ChatWindow";
    export default {
        name: "Chat",
        components: {ChatWindow}
    }
</script>

<style scoped>
    .main_container {

    }
</style>
