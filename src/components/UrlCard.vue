<template>
  <div class="container-fluid url-card">
    <h4>{{ category }}</h4>
    <h6 class="description">{{ description }}</h6>
    <ul class="list-inline">
      <li
        v-for="(urlItem, key) in urlList"
        :key="key"
        class="card card-url list-inline-item"
        :class="'card-bg' + (key % 4)"
        @click="$emit('click-url', urlItem.url)"
      >
        <img :src="baseUrl + urlItem.image_src" class="avatar card-img-top" />
        <div class="message card-body">
          <h6>{{ urlItem.name }}</h6>
          <p class="card-subtitle mb-2 p-x-small">
            {{
              urlItem.description.length > 50
                ? urlItem.description.substring(0, 40) + "..."
                : urlItem.description
            }}
            <!-- {{ urlItem.description }} -->
          </p>
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
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    urlList: {
      type: Object,
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
  },
  mounted() {
    this.startToolTip();
  },
};
</script>
