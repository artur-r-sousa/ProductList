<template>
  <div class="container">
    <h1 class="my-4">Lista de Produtos</h1>
    <div class="banner">
      <h1 class="text-over-img-title">
        Headphones da Sony. Adorados pelos profissionais.
      </h1>
      <h4 class="text-over-img-subtitle">
        Apoiando a criação de músicas ao redor do mundo.
      </h4>
      <img
        src="https://pro.sony/s3/2021/06/22141821/Headphones_consumer_fullwidthbanner.jpg"
        alt="Banner"
        class="img-fluid rounded mb-4"
      />
    </div>
    <!-- Campo de Busca -->
    <SearchBar @update:searchQuery="updateSearchQuery" />

    <!-- Lista de Produtos -->
    <div class="row">
      <div class="col-12">
        <ProductList :searchQuery="searchQuery" />
      </div>
    </div>

    <div class="banner">
      <img
        src="https://rewardmobile.co.uk/wp-content/uploads/2023/09/Apple-iPhone-15-promo-banner-buy-now-2048x853.jpg"
        alt="Banner"
        class="img-fluid rounded mb-4"
      />
    </div>

    <!-- Produtos Favoritos -->
    <div class="mt-5">
      <FavoriteProducts />
    </div>

    <footer class="bg-dark text-light py-4">
      <div class="container text-center">
        <!-- Texto do footer -->
        <p class="mb-1">
          &copy; 2024 Todos os direitos reservados. Este site foi criado apenas
          com fins de estudo e demonstração.
        </p>

        <!-- Ícones para redes sociais -->
        <div class="d-flex justify-content-center mt-3">
          <a
            href="https://wa.me/5521987197372"
            target="_blank"
            class="text-light mx-3"
            title="WhatsApp"
          >
            <i class="fab fa-whatsapp fa-2x"></i>
          </a>
          <a
            href="https://linkedin.com/in/artur-sousa-5624aa160/"
            target="_blank"
            class="text-light mx-3"
            title="LinkedIn"
          >
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
          <a
            href="https://github.com/artur-r-sousa/"
            target="_blank"
            class="text-light mx-3"
            title="GitHub"
          >
            <i class="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import ProductList from "@/components/ProductList.vue";
import FavoriteProducts from "@/components/FavoriteProducts.vue";

export default {
  components: {
    SearchBar,
    ProductList,
    FavoriteProducts,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.img-fluid {
  width: 100%;
  z-index: 1;
}
.text-over-img-title {
  z-index: 2;
  color: aliceblue;
  position: relative;
  top: 200px;
  left: 7rem;
  font-size: 18px;
}

.text-over-img-subtitle {
  z-index: 2;
  color: aliceblue;
  position: relative;
  top: 200px;
  left: 7rem;
  font-size: 15px;
}

footer {
  background-color: #343a40;
  color: #fff;
}

footer a {
  transition: color 0.3s ease;
}

footer a:hover {
  color: #17a2b8;
}

footer .mt-3 {
  margin-top: 20px;
}
</style>
