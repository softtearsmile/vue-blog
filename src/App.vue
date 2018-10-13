<template>
  <div id="app">
    <hd-Nav></hd-Nav>
    <router-view/>
    <ft-Nav></ft-Nav>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  /*text-align: center;*/
  /*color: #2c3e50;*/
}
</style>
