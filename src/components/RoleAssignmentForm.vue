<script setup lang="ts">
import { ref } from 'vue';
import { useRoleStore } from '@/store/roleStore';

/**
 * 最大参加者数と役職数
 * @type {number}
 */
const maxParticipants = 20;

/**
 * 参加者数、参加者名、役職のリアクティブな状態
 * @type {Ref<number>}
 * @type {Ref<string[]>}
 * @type {Ref<string[]>}
 */
const numParticipants = ref(1);
const participantNames = ref<string[]>(Array(maxParticipants).fill(''));
const roles = ref<string[]>(Array(maxParticipants).fill(''));

/**
 * roleStoreの参照。
 */
const roleStore = useRoleStore();

/**
 * 参加者と役職を設定し、役職をランダムに割り当てる。
 */
const assignRoles = () => {
  const names = participantNames.value.slice(0, numParticipants.value).filter((name) => name.trim() !== '');
  const roleList = roles.value.slice(0, numParticipants.value).filter((role) => role.trim() !== '');

  if (names.length !== numParticipants.value || roleList.length !== numParticipants.value) {
    alert('すべての参加者と役職を入力してください。');
    return;
  }

  roleStore.setParticipants(names);
  roleStore.setRoles(roleList);
  roleStore.assignRoles();
};

/**
 * 入力フィールドを初期状態にリセットする。
 */
const resetInputs = () => {
  numParticipants.value = 1;
  participantNames.value = Array(maxParticipants).fill('');
  roles.value = Array(maxParticipants).fill('');
};
</script>

<template>
  <section id="role-assignment-form">
    <div class="section-title">
      <h2>参加名と役職の入力</h2>
    </div>
    <div class="section-content">
      <div class="select-number-of-people">
        <label>参加者の人数を選択してください。</label>
        <select v-model="numParticipants">
          <option v-for="n in maxParticipants" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="list-participant-and-role">
        <ul class="participant-list">
          <li v-for="index in numParticipants" :key="'participant-' + index">
            <label>参加者{{ index }}の名前:</label>
            <input v-model="participantNames[index - 1]" placeholder="名前を入力" />
          </li>
        </ul>
        <ul class="role-list">
          <li v-for="index in numParticipants" :key="'role-' + index">
            <label>役職{{ index }}:</label>
            <input v-model="roles[index - 1]" placeholder="役職を入力" />
          </li>
        </ul>
      </div>
      <div class="decision-buton-wrapper">
        <button class="decision-buton" @click="assignRoles">決定</button>
        <button class="decision-buton" @click="resetInputs">リセット</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#role-assignment-form {
  .section-title {
    display: flex;

    h2 {
      position: relative;
      display: inline-block;
      padding: 0 55px;
      font-size: 32px;
      margin: 0 auto;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        display: inline-block;
        width: 45px;
        height: 2px;
        border-top: solid 1px black;
        border-bottom: solid 1px black;
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }
  }
  .section-content {
    margin: 24px auto 0;
  }
  .select-number-of-people {
    width: 100%;
    padding: 8px;
    border: 1px dashed #555;
    border-radius: 10px;

    select {
      width: 100px;
      padding: 8px;
      font-size: 18px;
      border: 1px solid #555;
      border-radius: 10px;
    }
  }
  .list-participant-and-role {
    margin: 8px auto 0;
    display: flex;
    border: 1px dashed #555;
    border-radius: 10px;
  }
  .participant-list {
    width: 60%;

    label {
      display: inline-block;
      width: 130px;
    }
    input {
      width: 210px;
    }
  }
  .role-list {
    width: 40%;

    label {
      display: inline-block;
      width: 60px;
    }
    input {
      width: 160px;
    }
  }
  .participant-list,
  .role-list {
    padding: 8px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    li + li {
      margin-top: 8px;
    }

    input {
      display: inline-block;
      height: 40px;
      border: 1px solid #555;
      border-radius: 10px;
      padding: 8px;
    }
  }
  .participant-list + .role-list {
    border-left: 1px dashed #555;
  }
  .decision-buton-wrapper {
    margin-top: 24px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    .decision-buton {
      display: block;
      width: 200px;
      height: 50px;
      border: 1px solid #555;
      border-radius: 0;
      background: #fff;

      &:hover {
        color: #fff;
        background: #555;
      }
    }
  }
}
</style>
