<template>
  <div id="Searchsection">
    <v-container class="">
      <!-- //* Search -->
      <v-row no-gutters>
        <v-col cols="12">
          <v-row justify="space-between">
            <v-col
              md="2"
              class="pa-0 d-flex flex-row justify-start align-center"
            >
              <p class="#2D3440--text display-3 font-weight-black pa-0">
                กลุ่มเรียน
              </p>
            </v-col>

            <v-col md="7">
              <v-card height="80" class="">
                <v-row row wrap justify="center" align="start">
                  <v-col md="8" class="">
                    <v-text-field
                      placeholder="ค้นหากลุ่ม (ระบุรหัสกลุ่ม)"
                      filled
                      rounded
                      v-model.trim="sectionID"
                    ></v-text-field>
                  </v-col>
                  <v-dialog v-model="dialog" width="700">
                    <template v-slot:activator="{ on }">
                      <v-col md="3" class=" pa-0 mt-4">
                        <v-btn
                          block
                          large
                          rounded
                          color="#4663B2"
                          class="white--text"
                          @click="searchSubject"
                          v-on="on"
                          >เพิ่มกลุ่มเรียน</v-btn
                        >
                      </v-col>
                    </template>
                    <!-- //* Card In Dialog -->
                    <CreateSubject />
                    <!--  -->
                  </v-dialog>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import axios from "axios";
import CreateSubject from "./CreateSubject.vue";

export default {
  name: "Searchsection",
  components: {
    CreateSubject
  },
  data() {
    return {
      data: "",
      sectionID: "",
      dialog: ""
    };
  },

  watch: {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///? Filter Input for Search **
    sectionID() {
      this.$emit("sentData", this.sectionID);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  },

  methods: {
    searchSubject() {
      // console.log("searchSubject");
    }
  }
};
</script>

<style></style>
