<template>
  <div id="tooltip">
    <v-container fluid class="pa-0">
      <v-row class=" mx-9">
        <v-col class="pa-0" md="3">
          <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
            <v-chip color="#179EE0" class="white--text mr-2">วิชาบังคับ</v-chip>
            <v-chip color="#f4511e" class="white--text">วิชาเลือกเสรี</v-chip>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "tooltip"
};
</script>

<style></style>
