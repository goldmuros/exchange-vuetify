<template>
  <v-app>
    <v-main>
      <px-header />
      <v-container fluid>
        <router-view class="mt-10"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PxHeader from "@/components/PxHeader";

export default {
  name: "app",
  components: {
    PxHeader
  }
};
</script>
