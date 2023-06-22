<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
onMounted(() => {
  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`;

    axios.get(geocodingUrl)
      .then(response => {
        const results = response.data.results;
        if (results.length > 0) {
          const postalCode = results[0].address_components.find((component: { types: string | string[]; }) =>
            component.types.includes('postal_code')
          )?.short_name;
          axios.get(`http://localhost:8080/ingredients/fetch/${postalCode}`);
        }
      })
  }

  function error() {
    console.log("Unable to retrieve location.")
  }
  const location = navigator.geolocation.getCurrentPosition(success, error);
});


</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";
</style>