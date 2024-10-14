<template>
  <div class="search-bar mb-4">
    <input
      type="text"
      class="form-control"
      v-model="query"
      @input="emitSearchEvent"
      placeholder="Buscar produtos"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    emitSearchEvent() {
      this.$emit("update:searchQuery", this.query);

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'search',
          searchQuery: this.query
        });
      }
    },
  },
};
</script>
