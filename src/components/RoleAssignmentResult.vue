<script setup lang="ts">
import { computed } from 'vue';
import { useRoleStore } from '@/store/roleStore';

/**
 * roleStoreの参照。
 */
const roleStore = useRoleStore();

/**
 * 参加者とその割り当てられた役割のリスト。
 */
const assignments = computed(() => roleStore.assignments);
</script>

<template>
  <div>
    <h2>役割の割り当て結果</h2>
    <ul>
      <li v-for="assignment in assignments" :key="assignment.name">{{ assignment.name }}: {{ assignment.role }}</li>
    </ul>
  </div>
</template>

<style scoped>
/* スタイルを適宜追加 */
</style>
