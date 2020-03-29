<template>
  <div id="allsubject">
    <!-- <v-btn color="success" @click="fechSubject">text</v-btn> -->
    <!-- <v-btn color="success" @click="sort('Type')">text</v-btn> -->
    <!-- //* Header -->
    <SubjectSearch @sentData="sentData" />

    <!-- //* Options -->
    <v-row>
      <v-col md="8">
        <!-- //* Tooltip -->
        <Tooltip class="pa-0 pl-5" />
      </v-col>
      <v-col md="4">
        <!-- /////////////////////////////////////////////////////////// -->
        <v-row>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                color="#179EE0"
                rounded
                large
                dark
                class="mx-2"
                @click="sort('Credit')"
              >
                <v-icon medium class="mr-2">mdi-alpha-c-circle</v-icon>
                จำนวนหน่วยกิต
              </v-btn>
            </template>
            <span>จัดเรียงตามหน่วยกิตจากน้อยไปมาก</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                color="#238AEB"
                rounded
                large
                dark
                class="mx-2"
                @click="sort('Type')"
              >
                <v-icon medium class="mr-2">mdi-alpha-t-circle</v-icon>
                ประเภทของวิชา
              </v-btn>
            </template>
            <span>จัดเรียงตามประเภทของรายวิชา</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                color="#4663B2"
                rounded
                large
                dark
                class="mx-2"
                @click="sort('Status')"
              >
                <v-icon medium class="mr-2">mdi-alpha-s-circle</v-icon>
                สถานะของวิชา
              </v-btn>
            </template>
            <span>จัดเรียงตามสถานะของรายวิชา เปิด / ปิด</span>
          </v-tooltip>
        </v-row>

        <!-- /////////////////////////////////////////////////////////// -->
      </v-col>
    </v-row>

    <v-container
      class=" d-flex justify-start align-center flex-wrap  pa-10"
      id="container"
      fluid
    >
      <v-row dense>
        <v-col
          v-for="(subject, index) in listFilter"
          :key="index"
          md="4"
          sm="12"
          class="ma-0"
        >
          <v-container fluid class="ma-0">
            <!--  -->
            <v-card
              :class="
                `subject ${subject.Type == 0 ? `open` : `close`} pa-5 ma-0  `
              "
            >
              <!-- //* Name -->
              <v-row row wrap>
                <v-col md="12" xs="12">
                  <!-- <div class=" grey--text text--lighten-1 ma-0">ชื่อวิชา</div> -->
                  {{ subject.NameEN }}
                  <div>{{ subject.NameTH }}</div>

                  <div class="py-2">
                    <!-- <v-icon>mdi-dots-vertical</v-icon> -->
                    <v-btn
                      small
                      outlined
                      rounded
                      :color="`${subject.Type == 0 ? `#179EE0` : `#f4511e`}`"
                      >{{ subject.Id }}</v-btn
                    >
                    <!-- <v-col md="3" class="ma-0 pa-0"> -->
                    <!-- <v-icon>home</v-icon> -->
                    หน่วยกิต : {{ subject.Credit }}
                    <!-- </v-col> -->
                  </div>
                </v-col>
              </v-row>
              <div>
                <v-row class="ma-0 pa-0 d-flex ">
                  <v-col md="6" class="ma-0 pa-0 ">
                    <v-icon>{{
                      subject.Status == 1
                        ? `mdi-calendar-check`
                        : `mdi-calendar-remove`
                    }}</v-icon>

                    {{
                      subject.Status == 1
                        ? `สามารถลงทะเบียนได้`
                        : `ไม่สามารถลงทะเบียนได้`
                    }}
                  </v-col>
                  <!-- <v-spacer></v-spacer>
                  <v-row>
                    <v-col md="10" class="ma-0 pa-0 blue">
                      <v-chip
                        :color="`${subject.Type == 0 ? `#179EE0` : `#f4511e`}`"
                      >
                        {{
                          subject.Type == 0 ? `วิชาภาคบังคับ` : `วิชาเลือกเสรี`
                        }}
                      </v-chip>
                    </v-col>
                  </v-row> -->
                </v-row>
              </div>
            </v-card>

            <!--  -->
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-hover> -->
  </div>
</template>

<script>
import axios from "axios";

import SubjectSearch from "@/components/Subject_search.vue";
import Tooltip from "@/components/AlertTooltip.vue";

export default {
  name: "allsubject",
  components: {
    SubjectSearch,
    Tooltip
  },
  data() {
    return {
      data: [],
      url: "https://us-central1-newagent-47c20.cloudfunctions.net/api/subject",
      statusIcon: "",
      statusMessage: "",
      close: " ",

      search: "",
      subjectName: ""
    };
  },
  props: ["newValue"],
  created() {
    // this.fechSubject();
  },
  watch: {
    statusIcon() {
      this.statusIcon = "";
    },
    statusMessage() {
      this.statusMessage = "";
    },
    propsData() {}
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///? CALL API AUTO
    // async data() {
    //   let response = await axios.get(this.url);
    //   this.data = response.data;
    // }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  },

  async mounted() {
    let response = await axios.get(this.url);
    this.data = response.data;

    // console.log(response.data[0].Status);
  },
  computed: {
    listFilter() {
      if (this.subjectName) {
        return this.data.filter(item => {
          return this.subjectName
            .toLowerCase()
            .split("")
            .every(v => item.NameTH.toLowerCase().includes(v));
        });
      } else {
        return this.data;
      }
    }
  },
  methods: {
    sort(val) {
      this.data.sort((a, b) => (a[val] < b[val] ? -1 : 1));
    },
    sentData(value) {
      this.subjectName = value;
    }
  }
};
</script>

<style>
.subject.close {
  border-left: 10px solid #f4511e;
}

.subject.open {
  border-left: 10px solid #238aeb;
}

#card :hover {
  border: 10px solid #238aeb;
}

#container {
  height: 100%;
}
</style>

// :class="`pa-3 subject ${subject.Type === 1 ? `close` : `open`} `"
