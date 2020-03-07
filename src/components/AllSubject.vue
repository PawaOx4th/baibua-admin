<template>
  <div id="allsubject">
    <v-btn color="success" @click="fechSubject">text</v-btn>

    <v-container
      class=" d-flex justify-start align-center flex-wrap pa-5"
      fluid
    >
      <!-- <v-col> -->

      <!-- <v-col md="4" class="red"> -->

      <v-card
        v-for="(subject, index) in data"
        :key="index"
        width="450"
        height="200"
        :class="`subject ${subject.Type == 0 ? `open` : `close`}  pa-5  ma-1`"
      >
        <!-- //* Name -->
        <v-row row wrap>
          <v-col md="12" xs="12">
            <div class=" grey--text text--lighten-1 ma-0">ชื่อวิชา</div>
            {{ subject.NameTH }}
            <div>{{ subject.NameEN }}</div>
          </v-col>
        </v-row>

        <!-- //*  -->
      </v-card>

      <!-- </v-col> -->

      <!-- </v-col> -->
    </v-container>
    <!-- </v-hover> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "allsubject",
  data() {
    return {
      data: []
    };
  },
  created() {
    this.fechSubject();
  },
  methods: {
    async fechSubject() {
      const url =
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/subject";
      await axios.get(url).then(val => {
        console.dir(val);
        this.data = val.data;
        // console.log(this.data);
      });
    }
  }
};
</script>

<style>
.subject.close {
  border-left: 5px solid #f4511e;
}

.subject.open {
  border-left: 5px solid #238aeb;
}
</style>

:class="`pa-3 subject ${subject.Type === 1 ? `close` : `open`} `"
