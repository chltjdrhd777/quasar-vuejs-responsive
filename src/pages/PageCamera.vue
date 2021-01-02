<template>
  <q-page class="constrain-2 q-pa-md">
    <div class="camera-frame q-pa-md">
      <img
        class="full-width "
        src="https://i.pinimg.com/originals/8e/0f/8e/8e0f8ef968de516dadb9caaa607c2554.jpg"
        alt="img"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="eva-camera" />

      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          label="Standard"
          class="col col-sm-6"
          dense
        />
      </div>

      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          label="Standard"
          class="col col-sm-6"
          dense
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="eva-navigation-2-outline"
              size="0.7rem"
            />
          </template>
        </q-input>
      </div>

      <div class="row justify-center q-ma-md">
        <q-btn unelevated rounded color="primary" label="Post your image" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
export default {
  name: "PageCamera",

  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now()
      }
    };
  }
};
</script>

<style lang="scss">
.camera-frame {
  border: 0.1rem solid $grey-10;
  border-radius: 0.5rem;
}
</style>
