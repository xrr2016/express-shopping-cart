<template>
<main id="app">
  <nav class="app-nav-bar">nav</nav>
  <app-side-bar class="app-side-bar" />
  <app-editor class="app-editor" />
  <app-view class="app-view" />
</main>
</template>

<script>
import AppSideBar from './components/AppSideBar'
import AppEditor from './components/AppEditor'
import AppView from './components/AppView'

export default {
  name: 'app',
  components: {
    AppSideBar,
    AppEditor,
    AppView
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

#app {
  display: grid;
  grid-template:
    'nav nav nav' 50px
    'sidebar editor view' 120px 1fr 1fr;
  height: 100vh;

  &-nav-bar {
    width: 100vw;
    grid-area: nav;
  }

  &-side-bar {
    grid-area: sidebar;
  }
  &-editor {
    grid-area: editor;
  }
  &-view {
    grid-area: view;
  }
}
</style>
