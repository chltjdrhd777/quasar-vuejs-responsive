<template>
  <q-page class="constrain q-pa-md">
    <section class="row q-col-gutter-lg">
      <article class="col-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img
                  src="https://i.pinimg.com/originals/8e/0f/8e/8e0f8ef968de516dadb9caaa607c2554.jpg"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ post.caption }}</q-item-label>
              <q-item-label caption>
                adroable
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.imgUrl" />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ makeDate(post.date) }}</div>
          </q-card-section>
        </q-card>
      </article>
      <article class="col-4">test profile</article>
    </section>
  </q-page>
</template>

<script>
import { v4 as uuid } from "uuid";
import { date } from "quasar";
const testDataMaker = (caption, location, imgUrl) => {
  return {
    id: uuid(),
    caption,
    date: Date.now(),
    location,
    imgUrl
  };
};
const testUrl =
  "https://i.pinimg.com/originals/8e/0f/8e/8e0f8ef968de516dadb9caaa607c2554.jpg";

export default {
  name: "PageHome",

  //? data part
  data() {
    return {
      posts: [
        testDataMaker("cute1", "cute plannet1", testUrl),
        testDataMaker("cute2", "cute plannet2", testUrl),
        testDataMaker("cute3", "cute plannet3", testUrl)
      ]
    };
  },

  //? methods part
  methods: {
    makeDate: value => {
      return date.formatDate(value, "MMMM D h: mm A");
    }
  }
};
</script>

<style lang="scss">
.card-post {
  & .q-img__content {
    height: 200px;
  }
}
</style>
