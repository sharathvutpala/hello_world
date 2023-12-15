<template>
  <div class="container-fluid">
    <h4>{{ category }}</h4>
    <h6 class="description">{{ description }}</h6>
    <ul class="list-inline">
      <li class="card card-feed" v-for="(feedItem, key) in feedList" :key="key">
        <div class="card-body">
          <h5 class="card-title">{{ feedItem.title }}</h5>
          <p class="card-text">
            {{ replaceContent(feedItem.content) }}
          </p>
          <a :href="feedItem.link" target="_blank" class="card-link">{{
            feedItem.link
          }}</a>
          <a
            :href="replaceLink(feedItem.link) + '.pdf'"
            target="_blank"
            class="card-link"
          >
            <i class="fas fa-file-pdf"></i
          ></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    category: { required: true, type: String },
    description: { required: true, type: String },
    feedList: { required: true, type: Array },
  },
  methods: {
    replaceContent(content) {
      let convertedContent = content.replace("<p>", "").replace("</p>", "");
      return convertedContent.length > 400
        ? convertedContent.substring(0, 400) + "..."
        : convertedContent;
    },
    replaceLink(link) {
      return link.replace("abs", "pdf");
    },
  },
  mounted() {
    window.MathJax.typeset();
  },
};
</script>
