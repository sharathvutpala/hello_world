<template>
  <div :class="isLoading ? 'modal-custom' : 'modal-custom hidden'">
    <div class="container">
      <div class="body">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: { type: Boolean, required: true },
  },
};
</script>
