<template>
  <div class="container">
    <h3>Thông Tin Liên Hệ</h3>
    <div class="info-contact">
      <p>Địa chỉ: 317/3 QL1A Tân Thạnh, Tân Hương, Châu Thành, Tiền Giang</p>
      <p>Số điện thoại: 0398365404</p>
      <p>Email: nmchauhcmue@gmail.com</p>
    </div>
    <div>
      <label class="contain-search">
        <gmap-autocomplete id="pac-input" class="controls" @place_changed="initMarker"></gmap-autocomplete>
        <v-btn class="btn-search" depressed color="primary" @click="addLocationMarker">Tìm kiếm</v-btn>
      </label>
    </div>
    <br>
    <gmap-map :zoom="12" :center="center" id="map">
      <gmap-marker :key="index" v-for="(m, index) in locationMarkers" position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>
<style>
@import '../css/main.css';
</style>
<script>
export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: { lat: 10.4711794, lng: 106.3573862 },
      mapTypeId: "roadmap",
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
    };
  },
  mounted() {
    this.locateGeoLocation();
  },
  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
        document.getElementById('pac-input').value = "";
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    },
  }
};
</script>