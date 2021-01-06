<template>
  <q-page class="constrain q-pa-md">
    <section class="row q-col-gutter-lg">
      <article class="col-12 col-sm-8">
        <template v-if="!loadingCheck">
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
              <div class="text-caption text-grey">
                {{ makeDate(post.date) }}
              </div>
            </q-card-section>
          </q-card>
        </template>

        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </template>
      </article>

      <article class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="3rem">
              <img
                src="https://i.pinimg.com/originals/8e/0f/8e/8e0f8ef968de516dadb9caaa607c2554.jpg"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>test cute</q-item-label>
            <q-item-label caption>
              adroable
            </q-item-label>
          </q-item-section>
        </q-item>
      </article>
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
      ],

      testCommingData: [],
      loadingCheck: false
    };
  },

  //? methods part
  methods: {
    makeDate(value) {
      return date.formatDate(value, "MMMM D h: mm A");
    },

    async getPosts() {
      this.loadingCheck = true;
      await this.$axios
        .get(`${process.env.API}/posts`)
        .then(res => {
          this.testCommingData = res.data;
          this.loadingCheck = false;
          console.log(this.testCommingData);
        })
        .catch(err => {
          this.$q.dialog({
            title: "Error",
            message: "Could not find any data"
          });
          this.loadingCheck = false;
        });
    }
  },

  created() {
    this.getPosts();
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
