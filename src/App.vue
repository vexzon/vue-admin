<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login"></router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import "./styles/normalize.css";
@import "./styles/main.scss";
</style>
