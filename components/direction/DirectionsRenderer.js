import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "directionsRenderer",

  ctr() {
    return window.google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    origin: { type: Object },
    destination: { type: Object },
    travelMode: { type: String }
  },

  afterCreate(directionsRenderer) {
    let directionsService = new window.google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination, this.travelMode],
      () => {
        let { origin, destination, travelMode } = this;
        if (!origin || !destination || !travelMode) return;
        var origins =  { query: "13.7993922,100.546586" };
        var destinations = { query: "13.8061067,100.5716257"};
        //var origins = "13.7993922" + "," + "100.546586"; 
        //var destinations = "13.8061067" + "," + "100.5716257";
        //13.7993922&longtitude=100.546586
        directionsService.route(
          {
            origin,
            destination,
            travelMode
          },
          (response, status) => {
            if (status !== "OK") return;
            directionsRenderer.setDirections(response);
          }
        );
      }
    );
  }
});
