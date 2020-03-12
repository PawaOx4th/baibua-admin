<template>
  <div id="section">
    <!-- Fetch All  Section  -->
    <AllSection />
  </div>
</template>

<script>
import AllSection from "@/components/AllSections.vue";

export default {
  name: "section",
  components: {
    AllSection
  },
  data() {
    return {
      title: "Section"
    };
  }
};
</script>

<style></style>
