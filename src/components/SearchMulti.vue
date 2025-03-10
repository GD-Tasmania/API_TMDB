<template>
    <div class="row justify-center sticky-search">
      <q-input
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        label="Buscar película..."
        outlined
        dense
        class="col-11 bg-white text-primary"
        style="border-radius: 10px;"
      />
    </div>
</template>
    
<script setup>
  defineProps({ modelValue: String });
  const emit = defineEmits(["update:modelValue"]);
</script>
  
<style scoped>
  .sticky-search {
    position: sticky;
    top: 87px;
    z-index: 1000;
    padding: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
</style>