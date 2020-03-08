<template>
  <div id="subject">
    <div class="">
      <!-- //* Header -->
      <SubjectSearch @sentData="sentData" />
      {{ subjectName }}

      <!-- //* Subject All -->
      <AllSubject newValue="" />
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

<style></style>
