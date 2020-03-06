<template>
  <!-- <v-overlay :value="overlay"> -->
  <v-snackbar v-model="snackbar" top :timeout="timeout" color="snackbarColor">
    <slot name="message"></slot>
    <v-btn
      text
      color="snackbarStatus"
      @click.native="(value = false), (overlay = false)"
      >Close</v-btn
    >
  </v-snackbar>
  <!-- </v-overlay> -->
</template>

<script>
export default {
  name: "ID",
  data() {
    return {
      snackbar: true,

      snackbarStatus: "info",
      snackbarColor: "info",
      overlay: true,
      timeout: 5000
    };
  },
  watch: {
    overlay() {
      setInterval(() => (this.overlay = false), 3000);
    }
  }
};
</script>

<style></style>
