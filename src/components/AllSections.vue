<template>
  <div id="AllSection">
    <v-container
      class=" d-flex justify-start align-center flex-wrap  pa-10"
      fluid
    >
      <!-- /**********************************************************************************************/ -->
      <v-row dense>
        <v-col
          md="3"
          sm="12"
          class="ma-0"
          v-for="(section, index) in Section"
          :key="index"
        >
          <v-container fluid class="ma-0">
            <!--  -->
            <v-card
              class="pa-5"
              :class="
                `subject ${section.Type == 0 ? `open` : `close`} pa-5 ma-0  `
              "
            >
              <!-- //* Name -->
              <v-row row wrap>
                <v-col md="12" xs="12" class="">
                  <div
                    class="d-flex  flex-row justify-space-between  align-center"
                  >
                    <v-chip color="#179EE0" class="white--text pa-3" medium>
                      {{ section.Subject }}
                    </v-chip>
                    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                    <!-- // Edit Button -->
                    <EditButton :subID="section.Id" />
                    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                  </div>

                  <div class="pt-5">
                    <v-icon>mdi-folder-account</v-icon>
                    กลุ่ม {{ section.Sec }}
                  </div>

                  <div class="pt-2">
                    <v-icon>mdi-alarm-multiple</v-icon>
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
export default {
  name: "AllSection",
  components: {
    EditButton
  },
  data() {
    return {
      Section: []
    };
  },
  async mounted() {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let SectionUrl =
      "https://us-central1-newagent-47c20.cloudfunctions.net/api/sec";

    var SectionObj = await axios.get(SectionUrl);

    this.Section = SectionObj.data;

    console.log(this.Section);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
};
</script>

<style>
.subject.close {
  border-left: 10px solid #238aeb;
}
</style>
