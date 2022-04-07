<template>
<div id="app">
  <router-view v-slot="{ Component }">
    <keep-alive include="Home,Login">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

#app {
  height: 100%;
}
</style>
