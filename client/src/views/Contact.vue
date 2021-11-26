<template>
    <div id="app">
        <AddGoogleMap />
    </div>
</template>
<script>
import AddGoogleMap from "../components/AddGoogleMap.vue";
export default {
    name: 'Contact',
    components: {
        AddGoogleMap
    }
}
</script>
<style>
@import '../css/main.css';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    margin-top: 50px;
}
</style>