<script setup lang="ts">
// 必要なコンポーネントをインポート
import RoleAssignmentForm from '@/components/RoleAssignmentForm.vue';
import RoleAssignmentResult from '@/components/RoleAssignmentResult.vue';
</script>

<template>
  <div class="role-assignment">
    <RoleAssignmentForm />
    <RoleAssignmentResult />
  </div>
</template>

<style scoped>
.role-assignment {
  width: 600px;
  margin: auto;
  padding: 16px 0;
}
</style>
