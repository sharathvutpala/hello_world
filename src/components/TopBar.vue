<template>
  <nav class="navbar navbar-nav navbar-primary top-gradient">
    <div class="container-fluid">
      <div class="nav-header">
        <div class="row">
          <div class="col-md-7">
            <img
              src="~@/assets/images/crc_logo.png"
              class="img img-responsive"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container-fluid" style="margin-top:10px">
    <ul class="nav nav-tabs">
      <li
        class="nav-item"
        v-for="(link, key) in links"
        :key="key"
        @click="$emit('changeLink', link.group)"
      >
        <a
          class="nav-link"
          :class="link.group == currentLink ? 'active' : ''"
          href="#!"
          >{{ link.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: ["changeLink"],
  props: {
    currentLink: { required: true, type: String },
    links: { required: true, type: Array },
  },
  data() {
    return {};
  },
};
</script>
