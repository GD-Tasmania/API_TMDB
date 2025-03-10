<template>
  <q-page padding>
    <!-- Cards -->
    <q-list class="row justify-evenly">
      <ItemCard 
        v-for="movie in movies" 
        :key="movie.id" 
        :movie="movie"
        @click="showDetails(movie)"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios"; 
import ItemCard from "src/components/ItemCard.vue";

const movies = ref([]);

// Función para obtener películas populares
const topMovies = async () => {
  try {
    const response = await api.get("/movie/popular");
    movies.value = response.data.results;
  } catch (error) {
    console.error("Error al obtener películas", error);
  }
};

// Cargar películas populares al inicio
onMounted(() => topMovies());
</script>