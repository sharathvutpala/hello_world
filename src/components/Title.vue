<template>
  <div class="container-fluid" id="title">
    <h2>{{ title }}</h2>
    <h2>{{ subtitle }}</h2>
  </div>
</template>
<script>
export default {
  props: {
    title: { required: false, type: String },
    subtitle: { required: false, type: String },
  },
};
</script>
