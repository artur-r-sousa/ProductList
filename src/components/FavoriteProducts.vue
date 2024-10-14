<template>
  <div class="container favorite-products">
    <h2 class="my-4">Produtos Favoritos</h2>
    
    <div v-if="favorites.length === 0" class="alert alert-warning">
      Nenhum produto foi favoritado ainda.
    </div>

    <div class="row">
      <div v-for="product in favorites" :key="product.id" class="col-md-4 mb-4">
        <div class="card">
          <img :src="product.image" :alt="product.name" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">R$ {{ product.price.toFixed(2) }}</p>
            <button class="btn btn-danger" @click="removeFromFavorites(product)">
              Desfavoritar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalItems >= 0" class="mt-4">
      <h4>Total de Produtos: {{ totalItems }}</h4>
      <h4>Total de Favoritos: {{ favorites.length }}</h4>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/eventBus";
import axios from 'axios';

export default {
  data() {
    return {
      favorites: [],
      totalItems: 0,
    };
  },
  methods: {
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.getTotalItems(); 
    },
    async getTotalItems() {
      try {
        const response = await axios.get('/report'); 
        this.totalItems = response.data.totalProducts;
      } catch (error) {
        console.error("Erro ao obter o total de produtos:", error);
      }
    },
    removeFromFavorites(product) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const index = favorites.findIndex((fav) => fav.id === product.id);

      if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        this.loadFavorites();
      }
    },
  },
  mounted() {
    this.loadFavorites();

    EventBus.on('favoritesUpdated', this.loadFavorites);
  },
  beforeUnmount() {
    EventBus.off('favoritesUpdated');
  },
};
</script>

<style scoped>
.favorite-products {
  margin-top: 20px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product {
  width: 200px;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
}

.product img {
  width: 100%;
}

.card {
  width: 200px;
  border: 0px;
  justify-content: center;
  align-items: center;
}

.card-img-top {
  width: 14rem;
  height: 18rem;
}
</style>
