<template>
  <v-data-table
    :headers="headers"
    :items="assets"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:[`item.icon`]="{ item }">
      <img width="20" height="20" :src="item.icon" :alt="item.name" />
    </template>
    <template v-slot:[`item.ranking`]="{ item }">
      <b>#{{ item.ranking }}</b>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <router-link
        class="green--text text-decoration"
        :to="{ name: 'coin-detail', params: { id: item.id } }"
      >
        {{ item.name }}
      </router-link>
      <small class="ml-1 orange--text">{{ item.symbol }}</small>
    </template>
    <template v-slot:[`item.price`]="{ item }">
      <span>{{ item.price | dollar }}</span>
    </template>
    <template v-slot:[`item.cap_market`]="{ item }">
      <span>{{ item.cap_market | dollar }}</span>
    </template>
    <template v-slot:[`item.variation24hs`]="{ item }">
      <span
        :class="item.variation24hs.includes('-') ? 'red--text' : 'green--text'"
      >
        {{ item.variation24hs | percent }}
      </span>
    </template>
    <template v-slot:[`item.input`]="{ item }">
      <v-btn
        class="white--text"
        color="green"
        elevation="4"
        @click="goToCoin(item.id)"
      >
        Detalle
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "PxAssetsTable",
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: "", align: "start", value: "icon" },
        { text: "Ranking", value: "ranking" },
        { text: "Nombre", value: "name" },
        { text: "Precio", value: "price" },
        { text: "Cap. de Mercado", value: "cap_market" },
        { text: "Variación 24hs", value: "variation24hs" },
        { text: "", align: "end", value: "input" }
      ]
    };
  },
  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    }
  }
};
</script>
