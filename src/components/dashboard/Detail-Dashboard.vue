<template>
  <div id="Detail-Dashboard">
    <v-card>
      <v-subheader>กลุ่มเรียน / อาจารย์ </v-subheader>
      <v-list
        v-for="(item ,index) in Detail"
        :key="index"
      >
        <v-list-item>

          <v-icon
            color="black"
            class="pr-4"
          >{{item.icon}}</v-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle-1 d-flex item d-inline ">

              {{item.title}}

              <v-spacer></v-spacer>

              {{item.count}}

            </v-list-item-title>

          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

  </div>
</template>

<script>
import {
  fectGroupStudy,
  fectGroupStudyInApp,
  fectTeacher,
  fectSubject
} from "../../API/Dashboard";
export default {
  name: "Detail-Dashboard",
  data() {
    return {
      Detail: [
        {
          title: "วิชาที่เปิดสอนในภาค",
          icon: "mdi-iframe",
          count: ""
        },
        {
          title: "กลุ่มเรียนทั้งหมดในระบบ",
          icon: "mdi-ballot",
          count: ""
        },
        {
          title: "กลุ่มเรียนทั้งหมดในแอปพลิเคชัน",
          icon: "mdi-text-box-search",
          count: ""
        },
        {
          title: "จำนวนอาจารย์ในภาควิชา",
          icon: "mdi-ninja",
          count: ""
        }
      ]
    };
  },
  mounted() {
    fectSubject().then(res => {
      this.Detail[0].count = res.data.data;
    }),
      fectGroupStudy().then(res => {
        this.Detail[1].count = res.data.data;
      }),
      fectGroupStudyInApp().then(res => {
        this.Detail[2].count = res.data.data;
      }),
      fectTeacher().then(res => {
        this.Detail[3].count = res.data.data;
      });
  }
};
</script>

<style lang="scss" scoped>
</style>