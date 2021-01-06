<template>
  <q-page class="constrain-2 q-pa-md">
    <div class="camera-frame q-pa-md">
      <img
        v-show="!isImageCaptured"
        src="https://i.pinimg.com/originals/8e/0f/8e/8e0f8ef968de516dadb9caaa607c2554.jpg"
        alt="img"
        class="full-width"
        ref="image"
      />

      <canvas
        ref="canvas"
        class="full-width"
        height="240"
        v-show="isImageCaptured"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="eva-camera" @click="captureImage" />

      <q-file
        outlined
        accept="image/*"
        v-model="imageUpload"
        @input="imageFallBack"
        class="q-mt-md"
        label="choose your image"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-2-outline" />
        </template>
      </q-file>

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
          :loading="loadingState"
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="eva-navigation-2-outline"
              size="0.7rem"
              @click="getLocation"
              v-if="!loadingState && locationSupported"
            />
          </template>
        </q-input>
      </div>

      <div class="row justify-center q-ma-md">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Post your image"
          @click="addPost"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
import { watch } from "fs";
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
      },

      imageUpload: [],
      isImageCaptured: false,
      loadingState: false
    };
  },
  computed: {
    locationSupported() {
      if ("geolocation" in navigator) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    initCamera: () => {
      console.log(
        "mounted() is working like useEffect(). when the component is mounted, it works",
        "and must not use arrow function in methods object. it is because of the route definition of (this)"
      );
    },
    captureImage() {
      let image = this.$refs.image;
      let canvas = this.$refs.canvas;

      canvas.width = image.getBoundingClientRect().width;
      canvas.height = image.getBoundingClientRect().height;

      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      this.isImageCaptured = true;
    },

    imageFallBack(file) {
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");

      let reader = new FileReader();
      reader.onload = event => {
        let img = new Image();
        img.src = event.target.result;
        console.log(event);
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.isImageCaptured = true;
        };
      };
      reader.readAsDataURL(file);
    },
    getLocation() {
      this.loadingState = true;
      navigator.geolocation.getCurrentPosition(
        position => {
          this.getCityCountry(position);
        },
        error => {
          this.locationError();
        }
      );
    },

    async getCityCountry(position) {
      let geoURL = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
      await this.$axios.get(geoURL).then(result => {
        this.locationSuccess(result);
      });
    },

    locationSuccess(result) {
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`;
      }
      this.loadingState = false;
    },

    locationError() {
      this.$q.dialog({
        title: "Error",
        message: "Could not find your location"
      });
      this.loadingState = false;
    },

    addPost() {
      let formData = new FormData();
      formData.append("id", this.post.id);
      formData.append("caption", this.post.caption);
      formData.append("location", this.post.location);
      formData.append("date", this.post.date);
      formData.append("file", this.post.photo, this.post.id + ".png");

      this.$axios
        .post(`${process.env.API}/createPost`, formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    this.initCamera();
  }
};
</script>

<style lang="scss">
.camera-frame {
  border: 0.1rem solid $grey-10;
  border-radius: 0.5rem;
}
</style>
