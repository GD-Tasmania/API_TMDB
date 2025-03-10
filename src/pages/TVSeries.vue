<template>
    <q-page padding>
      <!-- Buscador -->
      <SearchMulti v-model="search" />
      <!-- Cards -->
      <q-list class="row justify-evenly">
        <ItemCard 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie"
          @click="showDetails(movie)"
        />
      </q-list>
      <!-- Paginación -->
      <div class="row justify-center q-mt-md" v-if="totalPages > 1">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="5"
          direction-links
          color="primary"
          @update:model-value="searchMovies"
          style="background-color: aliceblue;border-radius: 5px;"
        />
      </div>
      <!-- Detalles de la película -->
      <ModalCard 
        :selectedMovie="selectedMovie" 
        :showModal="showModal" 
        @update:showModal="showModal = $event"
      />
    </q-page>
</template>
  
<script setup>
  import { ref, onMounted, watch } from "vue";
  import { api } from "src/boot/axios"; 
  import SearchMulti from "src/components/SearchMulti.vue"; 
  import ItemCard from "src/components/ItemCard.vue";  
  import ModalCard from "src/components/ModalCard.vue";  
  
  const movies = ref([]);
  const search = ref("");
  const showModal = ref(false);
  const selectedMovie = ref({});
  const currentPage = ref(1);
  const totalPages = ref(1); // Total de páginas disponibles
  
  // Función para obtener películas populares con paginación
  const topMovies = async (page = 1) => {
    try {
      const response = await api.get("/tv/popular", { params: { page } });
      movies.value = response.data.results;
      totalPages.value = response.data.total_pages; // Total de páginas disponibles
    } catch (error) {
      console.error("Error al obtener películas", error);
    }
  };
  
  // Función de búsqueda en tiempo real con paginación
  const searchMovies = async (page = 1) => {
    if (search.value.trim() === "") {
      topMovies();
      return;
    }
    try {
      const response = await api.get("/search/tv", {
        params: { query: search.value, page }
      });
      movies.value = response.data.results;
      totalPages.value = response.data.total_pages;
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  };
  
  // Escucha cambios en search y ejecuta la búsqueda en tiempo real
  watch(search, () => {
    currentPage.value = 1; // Reset a la primera página al cambiar la búsqueda
    searchMovies();
  });
  
  // Escucha cambios en la paginación y ejecuta la consulta correcta
  watch(currentPage, (newPage) => {
    search.value.trim() === "" ? topMovies(newPage) : searchMovies(newPage);
  });
  
  // Función para mostrar detalles de la película
  const showDetails = (movie) => {
    selectedMovie.value = movie;
    showModal.value = true;
  };
  
  // Cargar películas populares al inicio
  onMounted(() => topMovies(currentPage.value));
</script>