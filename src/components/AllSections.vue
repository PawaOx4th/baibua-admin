<template>
  <div id="AllSection">
    <v-container fluid>
      <!-- //* Header -->
      <SearchSection @sentData="sentData" />
      <!-- /**********************************************************************************************/ -->

      <!-- //* Options -->
      <v-row dense>
        <v-col
          md="3"
          sm="12"
          class="ma-0"
          v-for="(section, index) in listFilter"
          :key="index"
        >
          <v-container fluid class="ma-0">
            <!--  -->
            <v-card
              class="pa-5"
              :class="
                `subject ${section.Status == 1 ? `open` : `close`} pa-5 ma-0  `
              "
            >
              <!-- //* Name -->
              <v-row row wrap>
                <v-col md="12" xs="12" class="">
                  <div
                    class="d-flex  flex-row justify-space-between   align-center"
                  >
                    <!-- "#179EE0" -->
                    <v-chip
                      :color="`${section.Status == 1 ? `#179EE0` : `#DADBDD`}`"
                      class="white--text pa-3 "
                      medium
                    >
                      {{ section.Subject }}
                    </v-chip>
                    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                    <div class=" d-flex  flex-row">
                      <!-- // Add Button -->
                      <AddStudent class="mr-3" :section="section.Id" />
                      <!-- // Edit Button -->
                      <EditButton :subID="section.Id" />
                    </div>
                    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                  </div>

                  <div class="pt-5">
                    <v-icon
                      :color="`${section.Status == 1 ? `#179EE0` : `#DADBDD`}`"
                      >mdi-folder-account</v-icon
                    >
                    กลุ่ม {{ section.Sec }}
                  </div>

                  <div class="pt-2">
                    <v-icon
                      :color="`${section.Status == 1 ? `#179EE0` : `#DADBDD`}`"
                      >mdi-alarm-multiple</v-icon
                    >
                    {{ section.StudyTime[0] }}
                    {{ section.StudyTime[1] }} -
                    {{ section.StudyTime[2] }}
                  </div>
                </v-col>
              </v-row>
              <div>
                <v-row class="ma-0 pa-0 d-flex ">
                  <!-- <v-col md="12" class="ma-0 pa-0 black ">cc </v-col> -->
                </v-row>
              </div>
            </v-card>

            <!--  -->
          </v-container>
        </v-col>
      </v-row>
      <!-- /**********************************************************************************************/ -->
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

import EditButton from "./EditSubject";
import SearchSection from "@/components/SearchSection.vue";
import AddStudent from "@/components/AddStudent.vue";

export default {
  name: "AllSection",
  components: {
    EditButton,
    SearchSection,
    AddStudent
  },
  props: ["newValue"],
  data() {
    return {
      Section: [],
      sectionID: "",
      SectionUrl:
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/sec"
    };
  },
  watch: {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///? CALL API AUTO
    // async Section() {
    //   let response = await axios.get(this.SectionUrl);
    //   this.data = response.data;
    // }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  async mounted() {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var SectionObj = await axios.get(this.SectionUrl);

    this.Section = SectionObj.data;

    console.log(this.Section);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  computed: {
    listFilter() {
      if (this.sectionID) {
        return this.Section.filter(item => {
          return this.sectionID
            .toLowerCase()
            .split("")
            .every(v => item.Subject.toLowerCase().includes(v));
        });
      } else {
        return this.Section;
      }
    }
  },
  methods: {
    sentData(value) {
      this.sectionID = value;
    }
  }
};
</script>

<style>
.subject.open {
  border-left: 10px solid #238aeb;
  /* color: #4769d9; */
}

.subject.close {
  border-left: 10px solid #e7eaf1;
  color: #a1a1a1;
}
</style>
