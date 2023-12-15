<template>
  <div class="wrapper" v-if="!isLoading">
    <top-bar
      v-if="currentLink"
      :current-link="currentLink"
      :links="links"
      @change-link="changeLink"
    ></top-bar>
    <div class="container">
      <page-title :title="link.title" :subtitle="link.subtitle"></page-title>
      <transition name="fade">
        <div v-if="currentPageCard && currentContent == 'cards'">
          <url-card
            v-for="(urlDocument, key) in urlList"
            :key="key"
            :category="urlDocument.category"
            :description="urlDocument.description"
            :url-list="urlDocument.urls"
            :base-url="baseUrl"
            @click-url="openUrl"
          ></url-card>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="currentPageCard && currentContent == 'news' && !feedIsLoading"
        >
          <rss-feed
            :category="currentFeed.category"
            :description="currentFeed.description"
            :feed-list="currentFeed.feeds"
          ></rss-feed>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="currentPageCard && currentContent == 'seminarCards'">
          <seminar-cards
            :seminars="seminars"
            :base-url="baseUrl"
            @click-url="openUrl"
          ></seminar-cards>
        </div>
      </transition>
      <loading
        v-if="currentPageCard && currentContent == 'news' && feedIsLoading"
      >
      </loading>
    </div>
  </div>
  <modal :is-loading="isLoading"></modal>
</template>

<script>
import Parser from "rss-parser";
export default {
  data() {
    return {
      urlList: [],
      publicList: [],
      urlCardContent: {},
      urlFeedContent: {},
      currentLink: "",
      links: "",
      link: "",
      currentPageCard: true,
      sharedDocumentsList: "",
      privateList: "",
      currentFeed: "",
      currentContent: "cards",
      feedIsLoading: false,
      isLoading: true,
      seminars: "",

      baseUrl: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
    changeLink(group) {
      this.currentPageCard = false;
      this.currentLink = group;
      this.link = this.links.find((l) => l.group == group);
      if (!group.startsWith("news_")) {
        if (group == "public" || group == "private" || group == "shared") {
          this.currentContent = "cards";

          this.urlList = this.urlCardContent[group];
        }
        if (group == "seminar") {
          this.currentContent = "seminarCards";
        }
      } else {
        this.currentContent = "news";
        this.currentFeed = this.urlFeedContent[group];
      }
      setTimeout(() => (this.currentPageCard = true), 500);
    },

    fillRSS(group) {
      this.feedIsLoading = true;
      fetch(this.baseUrl + "api/proxy/" + this.urlFeedContent[group].url)
        .then((response) => {
          if (response.ok) {
            return response.arrayBuffer();
          }
        })
        .then((data) => {
          const decoder = new TextDecoder("latin1");
          const text = decoder.decode(data);
          let parser = new Parser();
          parser.parseString(text).then((newFeed) => {
            this.urlFeedContent[group].feeds = newFeed.items.slice(
              0,
              this.urlFeedContent[group].size
            );
            this.feedIsLoading = false;
          });
        });
    },
    getLinks() {
      fetch(this.baseUrl + "api/get-links/")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.links = data;
          this.getSeminars();
        })
        .then(() => {
          this.links.forEach((link) => {
            if (!link.group.startsWith("news_")) {
              fetch(this.baseUrl + "api/get-urls/" + link.group)
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  }
                })
                .then((dataCard) => {
                  this.urlCardContent[link.group] = dataCard;
                  this.changeLink(this.links[0].group);
                  this.isLoading = false;
                });
            } else {
              fetch(this.baseUrl + "api/get-feeds/" + link.group)
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  }
                })
                .then((dataFeed) => {
                  this.urlFeedContent[link.group] = dataFeed;
                  this.fillRSS(link.group);
                })
                .then(() => {});
            }
          });
        });
    },
    getSeminars() {
      fetch(this.baseUrl + "api/get-seminars/")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.seminars = data;
        });
    },
  },
  mounted() {
    this.getLinks();
  },
};
</script>

<style lang="scss">
@import "./assets/styles/custom.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
