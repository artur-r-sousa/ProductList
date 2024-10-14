<template>
  <div class="container">
    <div v-if="filteredProducts.length === 0" class="alert alert-warning">Nenhum produto encontrado.</div>
    <div class="row">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100" @click="handleProductClick(product)">
          <img :src="product.image" :alt="product.name" class="card-img-top" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">R$ {{ product.price.toFixed(2) }}</p>
            <button class="btn mt-auto align-self-center" 
                    :class="isFavorite(product) ? 'btn-danger' : 'btn-primary'" 
                    @click.stop="toggleFavorite(product)">
              {{ isFavorite(product) ? "Desfavoritar" : "Favoritar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { EventBus } from "@/eventBus";

export default {
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      favorites: [],
      teste: true
    };
  },
  watch: {
    searchQuery: 'filterProducts'
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await this.$axios.get('/products');
        this.products = response.data;
        this.filteredProducts = response.data;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    filterProducts(searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    trackProductClick(product) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "productClick",
          productId: product.id,
          productName: product.name,
        });
      }
    },
    handleProductClick(product) {
      this.trackProductClick(product);
    },
    toggleFavorite(product) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const index = favorites.findIndex(fav => fav.id === product.id);
      
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(product);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      EventBus.emit('favoritesUpdated');
    },
    isFavorite(product) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.some(fav => fav.id === product.id); 
    },
    updateFavorites() {
      this.filteredProducts.forEach(product => {
        product.isFavorite = this.isFavorite(product); 
      });
    }
  },
  mounted() {
    this.fetchProducts();
    EventBus.on('favoritesUpdated', this.updateFavorites);
  },
  beforeUnmount() {
    EventBus.off('favoritesUpdated');
  },
};
</script>

<style scoped>
.product-list {
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
  width: 14rem;
  border: 0px;
  justify-content: center;
  align-items: center;
}

.card-img-top {
  width: 14rem;
  height: 18rem;
}

</style>
