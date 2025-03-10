<template>
    <q-page padding>
      <!-- Buscador -->
      <SearchMulti v-model="search" />
  
      <!-- Lista de Películas -->
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
          @update:model-value="fetchMovies"
          style="background-color: aliceblue; border-radius: 5px;"
        />
      </div>
  
      <!-- Modal de Detalles -->
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
  
  const movies = ref([]); // Lista actual de películas
  const search = ref(""); // Input del usuario
  const showModal = ref(false);
  const selectedMovie = ref({});
  const currentPage = ref(1);
  const totalPages = ref(1);
  
  // ✅ Obtiene películas de estreno o por búsqueda (con paginación)
  const fetchMovies = async () => {
    try {
      const endpoint = search.value.trim() 
        ? "/search/movie" // 🔍 Si hay búsqueda, usamos `/search/movie`
        : "/movie/upcoming"; // 🎬 Si no hay búsqueda, usamos `/movie/upcoming`
  
      const response = await api.get(endpoint, { 
        params: { query: search.value, page: currentPage.value }
      });
  
      movies.value = response.data.results;
      totalPages.value = response.data.total_pages;
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
  };
  
  // 📌 Escucha cambios en búsqueda y reinicia paginación
  watch(search, () => {
    currentPage.value = 1; // Reset a la página 1 al cambiar búsqueda
    fetchMovies();
  });
  
  // 📌 Escucha cambios en paginación
  watch(currentPage, () => {
    fetchMovies();
  });
  
  // ✅ Cargar películas de estreno al inicio
  onMounted(fetchMovies);
  
  // ✅ Mostrar detalles de la película en la modal
  const showDetails = (movie) => {
    selectedMovie.value = movie;
    showModal.value = true;
  };
  </script>