<template>
  <div id="subject" class="">
    <div class="">
      <!-- //* Header -->
      <!-- <SubjectSearch @sentData="sentData" /> -->

      <!-- //* Subject All -->
      <AllSubject />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import SubjectSearch from "@/components/Subject_search.vue";
import AllSubject from "@/components/AllSubject.vue";

export default {
  name: "subject",
  components: {
    // SubjectSearch,
    AllSubject
  },
  data() {
    return {
      subjectName: ""
    };
  },
  methods: {
    sentData(value) {
      this.subjectName = value;
    }
  }
};
</script>

<style scoped>
#subject {
  height: 100%;
  width: 100%;

  background-color: rgb(239, 248, 255);
}
</style>
