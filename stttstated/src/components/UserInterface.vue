<template>
  <div class="uigrid">
    <StartOverlay v-if="$store.getters.startOverlay"></StartOverlay>
    <WinScreen v-if="$store.getters.gameDone"></WinScreen>
    <Heading class="heading"></Heading>
    <ToolbarLeft class="tbleft"></ToolbarLeft>
    <ToolbarRight class="tbright"></ToolbarRight>
    <SuperPlayingField class="spfield"></SuperPlayingField>
    <ToolbarFooter class="tbfooter"></ToolbarFooter>
  </div>
</template>

<script>
import Heading from "@/components/toolbars/Heading";
import ToolbarLeft from "@/components/toolbars/ToolbarLeft";
import ToolbarRight from "@/components/toolbars/ToolbarRight";
import ToolbarFooter from "@/components/toolbars/ToolbarFooter";
import SuperPlayingField from "@/components/SuperPlayingField";
import StartOverlay from "@/components/StartOverlay";
import WinScreen from "@/components/WinScreen";

export default {
  name: "UserInterface",
  components: {WinScreen, StartOverlay, SuperPlayingField, ToolbarFooter, ToolbarRight, ToolbarLeft, Heading}
}
</script>

<style scoped>
.uigrid {
  width: 100%;
  height: 100vh;
}



.heading {
  height: 5vh;
}

.tbleft {
  float: left;
  width: 20%;
  height: 85vh;
  display: inline-block;
}

.tbright {
  display: inline-block;
  float: right;
  height: 85vh;
  width: 10%;
}

.tbfooter {
  height: 10vh;
}

.spfield {
  height: 85vh;
}
</style>