<template>
    <q-item clickable @click="emit('click', movie)" class="col-md-2 col-sm-5 col-xs-9 q-ma-md">
      <q-card class="my-card col bg-dark" style="height: 390px;" flat bordered>
        <q-img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="Movie Poster" class="imageCard full-width" fit="contain" />
        <q-card-section class="bg-primary" style="height: 38%;">
          <p class="col text-body1 movie-description">{{ movie.title || movie.name }}</p>
          <p>⭐ {{ movie.vote_average || "Sin calificaciones" }}</p>
          <p class="text-body5">{{ movie.release_date || movie.first_air_date || "Sin fecha de lanzamiento" }}</p>
        </q-card-section>
      </q-card>
    </q-item>
</template>
  
<script setup>
  defineProps({
    movie: Object
  });
  const emit = defineEmits(["click"]);
</script>
  
<style scoped lang="scss">
  .imageCard {
    height: 62%;
  }
  .my-card {
    border: 2px solid $primary;
    border-radius: 5px;
  }
  .movie-description {
    max-height: 65px; /* Ajusta según el diseño */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Máximo 3 líneas */
    -webkit-box-orient: vertical;
    }
</style>