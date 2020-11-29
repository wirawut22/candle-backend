import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB4UH9t_QJ7nVypuKbNqbx25ffRSD-pvTA",
    libraries: "places,directions"
  }
});
