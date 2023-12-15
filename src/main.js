import { createApp } from "vue";
import App from "./App.vue";
import TopBar from "./components/TopBar.vue";
import Title from "./components/Title.vue";
import UrlCard from "./components/UrlCard.vue";
import SeminarCard from "./components/SeminarCard.vue";
import RSSFeed from "./components/RSSFeed.vue";
import Loading from "./components/Loading.vue";
import Modal from "./components/Modal.vue";
import VueClipboard from "vue3-clipboard";
import "bootstrap";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const app = createApp(App);
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});
app.component("top-bar", TopBar);
app.component("page-title", Title);
app.component("url-card", UrlCard);
app.component("seminar-cards", SeminarCard);
app.component("rss-feed", RSSFeed);
app.component("loading", Loading);
app.component("modal", Modal);
app.mount("#app");
