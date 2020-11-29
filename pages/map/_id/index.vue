<template>
  <GmapMap id="map" :center="startLocation" :zoom="14">
    <GmapInfoWindow :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
      <div class="iw">
        <img :src="infoIcon" class="iw-img" alt="">
        <div class="iw-content">
          <div class="iw-title">{{infoTitle}} </div>
          <div class="iw-subtitle">{{infoAddress}} </div>
          <nuxt-link class="iw-link" :to="'/place/' + infoId">
            More
          </nuxt-link>
        </div>
      </div>
    </GmapInfoWindow>
    <GmapMarker :position="getPosition(startLocation.lat,startLocation.lng)"></GmapMarker>
  </GmapMap>
</template>

<script>
  
  import credentials from '@/assets/js/credentials.js';
  
  export default {
    mounted(){

    },
    methods: {
      getPosition: function(lat,lng) {
        debugger;
        return { 
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }
      },
 
    },
  
    data() {
      debugger;
      const context = this.$route;
      const latitude = context.query.latitude;
      const longtitude = context.query.longtitude;
      const id = context.params.id;
      return {
        startLocation: {
          lat: parseFloat(latitude),
          lng: parseFloat(longtitude)
        },
        infoPosition: null,
        infoTitle: null,
        infoAddress: null,
        infoId: null,
        infoIcon: null,
        infoOpened: false,
        infoCurrentKey: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      };
    }
  }
</script>

<style>
  body,
  html {
    width: 100%;
    height: 100%;
  }
  
  #map {
    width: 100%;
    height: 100vh;
  }
  
  .iw {
    display: grid;
    width: 300px;
    grid-template-columns: 80px 220px;
  }
  
  .iw-img {
    grid-row: 1/2;
    grid-column: 1/2;
    max-width: 80px;
    max-height: 80px;
  }
  
  .iw-content {
    grid-row: 1/2;
    grid-column: 2/-1;
    padding-left: 10px;
  }
  
  .iw-title {
    font-size: 1.1em;
    font-weight: 500;
  }
  
  .iw-subtitle {
    font-size: 0.95em;
    font-weight: 400;
  }
  
  .iw-link {
    font-size: 0.95em;
    font-weight: 500
  }
</style>

