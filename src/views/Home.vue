<template>
  <v-row align="center" justify="center">
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      v-if="isLoading"
    ></v-progress-circular>
    <px-assets-table v-else :assets="assets" />
  </v-row>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable.vue";
import api from "@/service/api";
import { tableAssetsFormat } from "@/helpers/assets";

export default {
  name: "Home",
  components: {
    PxAssetsTable
  },
  data() {
    return {
      assets: [],
      isLoading: false
    };
  },
  created() {
    this.isLoading = true;

    api
      .getAssets()
      .then(assets => (this.assets = tableAssetsFormat(assets)))
      .finally(() => (this.isLoading = false));
  }
};
</script>
