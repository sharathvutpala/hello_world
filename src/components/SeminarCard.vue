<template>
  <div class="container-fluid url-card">
    <ul class="list-inline">
      <li
        v-for="(seminar, index) in seminars"
        :key="index"
        class="card card-seminar list-inline-item"
        :class="'card-bg' + ((index % 3) + 1)"
      >
        <img
          :src="baseUrl + 'images/zoom_93927_cIXdvR0.png'"
          class="avatar"
          @click="$emit('click-url', seminar.zoom_url)"
        />
        <div class="message-seminar card-body">
          <div @click="$emit('click-url', seminar.zoom_url)">
            <p class="card-subtitle mb-2 p-x-small">
              {{ seminar.seminar_type }}
            </p>
            <p class="card-subtitle mb-2 p-x-small">
              {{ seminar.date }}
            </p>
            <h5>{{ seminar.topic }}</h5>
            <h6 class="font-italic">{{ seminar.speaker }}</h6>
            <h6>{{ seminar.company_institute }}</h6>
          </div>
          <button
            class="btn btn-light"
            v-clipboard:copy="seminar.zoom_password"
            @click="onCopy(index)"
          >
            <i class="far fa-clipboard"></i>
            Copy Zoom Password
          </button>
          <span :id="'custom-tooltip' + index" class="custom-tooltip"
            >copied!</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const $ = require("jquery");
export default {
  emits: ["click-url"],

  props: {
    seminars: {
      type: Array,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    startToolTip() {
      $('[data-toggle="tooltip"]').tooltip();
    },
    onCopy(index) {
      document.getElementById("custom-tooltip" + index).style.display =
        "inline";
      setTimeout(() => {
        document.getElementById("custom-tooltip" + index).style.display =
          "none";
      }, 1000);
    },
  },
  mounted() {
    this.startToolTip();
  },
};
</script>
