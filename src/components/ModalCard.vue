<template>
    <q-dialog v-model="showModalProxy">
      <q-card class="q-pa-md q-dialog-styled bg-dark">
        <q-card-section class="row items-center">
          <q-avatar rounded size="60px">
            <q-img v-if="selectedMovie.poster_path" :src="'https://image.tmdb.org/t/p/w500' + selectedMovie.poster_path" />
          </q-avatar>
          <div class="q-ml-md">
            <div class="text-h6 text-primary">{{ selectedMovie.title || "Sin título" }}</div>
            <div class="text-caption text-grey">Fecha de lanzamiento: {{ selectedMovie.release_date || "No disponible" }}</div>
          </div>
        </q-card-section>
  
        <q-card-section>
          <q-img 
            v-if="selectedMovie.poster_path"
            :src="'https://image.tmdb.org/t/p/w500' + selectedMovie.poster_path"
            class="rounded-borders shadow-2"
          />
        </q-card-section>
  
        <q-card-section class="row justify-center" style="width: 100%;">
          <p class="text-justify text-body1 text-white q-mt-md">{{ selectedMovie.overview || "Sin descripción disponible" }}</p>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="negative" glossy @click="emit('update:showModal', false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  const props = defineProps({
    selectedMovie: Object,
    showModal: Boolean
  });
  
  const emit = defineEmits(["update:showModal"]);
  
  // Proxy para permitir modificar el showModal desde el componente padre
  const showModalProxy = computed({
    get: () => props.showModal,
    set: (value) => emit("update:showModal", value),
  });
  </script>
  
  <style scoped>
  .q-dialog-styled {
    max-width: 600px;
  }
  </style>