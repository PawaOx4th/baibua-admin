<template>
  <div id="EditeLevelStudent">
    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
    <v-dialog v-model="dialog" max-width="800px" transition="dialog-transition">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-pencil</v-icon>
      </template>
      <v-card>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ userNameTH }}
            </v-list-item-title>
            <v-list-item-subtitle> {{ userId }} </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-select
              :items="Lavel"
              item-text="name"
              item-value="value"
              v-model="NewLavel.Level"
              label="บทบาทของนักศึกษา"
            ></v-select>
            <v-btn color="success" x-large @click="editeLevel">ตกลง</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>
    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
  </div>
</template>

<script>
import { EditeUserLevel } from "@/API/User.js";

export default {
  name: "EditeLevelStudent",
  props: {
    userId: {
      type: String
    },
    userNameTH: {
      type: String
    }
  },
  data() {
    return {
      dialog: false,
      NewLavel: {
        Level: null
      },
      Lavel: [
        {
          name: "นักศึกษาทั่วไป",
          value: 0
        },
        {
          name: "หัวหน้าห้อง",
          value: 1
        }
      ]
    };
  },
  methods: {
    editeLevel() {
      // console.log(this.NewLavel);
      EditeUserLevel(this.userId, this.NewLavel)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          // console.log(res.message);
          // console.log("200");
          this.$swal.fire({
            icon: "success",
            titleText: "แก้ไขบทบาทนักศึกษา สำเร็จ",
            text: ""
          });

          this.dialog = false;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          // console.log(err.message);
          // console.log("404");
          this.$swal.fire({
            icon: "error",
            titleText: "เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
