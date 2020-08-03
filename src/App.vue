<template>
  <div id="app" class="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
    import Vue from 'vue';
    import vueHeadful from 'vue-headful';
    import MainLayout from '@/Layouts/Main/Main';
    import EmptyLayout from '@/Layouts/Main/Empty';

    Vue.component('vue-headful', vueHeadful);

export default {
  name: 'App',
  computed: {
      layout() {
          return ((this.$route.meta.layout || 'Empty') + 'Layout');
      },
  },
  components: {
      MainLayout,
      EmptyLayout,
  },
}
</script>
