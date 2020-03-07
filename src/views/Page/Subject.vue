<template>
  <div id="subject">
    <div class="">
      <!-- //* Header -->
      <SubjectSearch />

      <!-- //* Subject All -->
      <AllSubject />
    </div>
  </div>
</template>

<script>
import SubjectSearch from "@/components/Subject_search.vue";
import AllSubject from "@/components/AllSubject.vue";

export default {
  name: "subject",
  components: {
    SubjectSearch,
    AllSubject
  },
  data() {
    return {};
  }
};
</script>

<style></style>
