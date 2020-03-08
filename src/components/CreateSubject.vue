<template>
  <div id="createsubject">
    <v-card>
      <v-card-title>
        <div>เพิ่มรายวิชา</div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label=" * รหัสวิชา"
                  hint="ระบุเป็นตัวเลขเท่านั้นห้ามมีสัญลักษณ์"
                  type="Number"
                  :rules="RuleId"
                  v-model="Subject.Id"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label=" * ชื่อวิชาเรียน (ภาษาไทย)"
                  hint="ระบุเป็นภาษาไทย"
                  :rules="RuleName"
                  v-model="Subject.NameTH"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label=" * ชื่อวิชาภาษาอังกฤษ"
                  hint="ระบุเป็นภาษาอังกฤษ"
                  :rules="RuleName"
                  v-model="Subject.NameEN"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3" class="pa-5">
                <v-text-field
                  label=" * หน่วยกิต"
                  hint="ระบุเป็นตัวเลขเท่านั้น"
                  type="Number"
                  maxlength="1"
                  v-model="Subject.Credit"
                  :rules="[RuleCredite.countValu, RuleCredite.emtyValue]"
                  counter
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <!-- <v-text-field label="Email*" required></v-text-field> -->
                <v-combobox
                  placeholder=" * ประเภทรายวิชา"
                  v-model="Subject.Type"
                  :items="SubjectType"
                  :rules="RuleType"
                  chips
                  required
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-combobox
                  placeholder=" * สถานะของรายวิชา"
                  v-model="Subject.Status"
                  :items="SubjectStatus"
                  :rules="RuleStatus"
                  chips
                  required
                ></v-combobox>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "createsubject",
  data() {
    return {
      dialog: true,
      SubjectType: ["วิชาภาคบังคับ", "วิชาเลือกเสรี"],
      SubjectStatus: ["สามาลงทะเบียได้", "ไม่เปิดให้ลงทะเบียน"],
      RuleId: [v => !!v || "กรุณาระบุบรหัสวิชา"],
      RuleName: [v => !!v || "กรุณาระบุบชื่อวิชา"],
      RuleType: [v => !!v || "กรุณาระบุบประเภทของวิชา"],
      RuleStatus: [v => !!v || "กรุณาระบุบสถานะของวิชา"],
      RuleCredite: {
        countValue: v => v.length <= 1 || "กรุณาระบุหน่วยกิต",
        emtyValue: v => !!v || "กรุณาระบุหน่วยกิต"
      },
      Subject: {
        Id: "",
        NameTH: "",
        NameEN: "",
        Credit: "",
        Type: "",
        Status: ""
      },

      valid: true,
      lazy: false
    };
  }
};
</script>

<style></style>
