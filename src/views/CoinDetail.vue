<template>
  <v-row>
    <v-row align="center" justify="center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <template v-if="!isLoading">
      <v-row align="center" justify="space-around">
        <v-col cols="4" align="center">
          <img :src="asset.icon" :alt="asset.name" class="mr-3" />
          <h1>
            {{ asset.name }}
            <small class="mr-2 orange--text">{{ asset.symbol }}</small>
          </h1>
        </v-col>

        <v-col cols="4" class="pa-0">
          <v-row class="ma-0">
            <v-col cols="6"><b>Ranking</b></v-col>
            <v-col cols="6">
              <span>#{{ asset.ranking }}</span>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col cols="6"><b>Precio actual</b></v-col>
            <v-col cols="6">
              <span>{{ asset.price | dollar }}</span>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col cols="6"><b>Precio más bajo</b></v-col>
            <v-col cols="6">
              <span>{{ min | dollar }}</span>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col cols="6"><b>Precio más alto</b></v-col>
            <v-col cols="6">
              <span>{{ max | dollar }}</span>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col cols="6"><b>Precio Promedio</b></v-col>
            <v-col cols="6">
              <span>{{ avg | dollar }}</span>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col cols="6"><b>Variación 24hs</b></v-col>
            <v-col cols="6">
              <span>{{ asset.variation24hs | percent }}</span>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-btn
            class="white--text"
            color="green"
            elevation="4"
            @click="toggleConverter"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </v-btn>

          <v-row>
            <v-col class="pa-0">
              <v-text-field
                id="convertValue"
                v-model="convertValue"
                type="number"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              ></v-text-field>
            </v-col>
            <v-col class="pt-5">
              <span>
                {{ convertResult }} {{ fromUsd ? asset.symbol : "USD" }}
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </v-row>
</template>

<script>
import api from "@/service/api";
import { assetFormat } from "@/helpers/assets";

export default {
  name: "CoinDetail",
  data() {
    return {
      isLoading: false,
      asset: {},
      fromUsd: true,
      convertValue: null
    };
  },
  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }

      const result = this.fromUsd
        ? this.convertValue / this.asset.price
        : this.convertValue * this.asset.price;

      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    }
  },
  created() {
    this.getCoin();
  },
  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
    getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;

      Promise.all([api.getAsset(id), api.getAssetHistory(id)])
        .then(([asset, history]) => {
          this.asset = assetFormat(asset);
          this.history = history;
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
