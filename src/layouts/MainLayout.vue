<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          flat
          round
          icon="eva-camera-outline"
          size="1rem"
          dense
          to="/camera"
          class="large-screen-only q-mr-xs"
        />

        <q-separator vertical spaced class="large-screen-only" />

        <q-toolbar-title class="text-grand-hotel text-bold">
          Clonegram
        </q-toolbar-title>

        <q-btn
          flat
          round
          icon="eva-home-outline"
          size="1rem"
          dense
          to="/"
          class="large-screen-only"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-video-outline" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 60px;
  }

  & .q-toolbar__title {
    font-size: 1.5rem;
    @media (max-width: $breakpoint-xs-max) {
      text-align: center;
    }
  }
}

.q-footer {
  & .q-tab__icon {
    font-size: 30px;
  }
}
</style>
