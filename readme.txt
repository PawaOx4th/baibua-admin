 <v-flex xs12 sm4 md3 ma-1>
      <v-container id="scroll-target" class="overflow-y-auto">
        <v-row
          v-scroll:#scroll-target="onScroll"
          align="center"
          justify="center"
          style="height: 400px"
        >
          <!-- //**** Card **** -->
          <v-container v-for="(event, index) in eventAll" :key="index">
            <v-card xs12 class="pa-1" color="blue">
              <v-card-title class="white--text" :style="titleCard">
                {{ event.Topic }}
              </v-card-title>

              <v-card-subtitle class="white--text">
                <v-chip
                  :class="`${vChipColor} white--text `"
                  v-on="chipColor(event.Type)"
                >
                  {{ event.Type }}
                </v-chip>
                {{ event.Date[0] }} {{ event.Date[1] }} {{ event.Date[2] }}
              </v-card-subtitle>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>
                  <v-card-text class="white--text">
                    {{ event.Description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-container>
        </v-row>
      </v-container>
    </v-flex>


