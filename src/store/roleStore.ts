import { defineStore } from 'pinia';

/**
 * 参加者、役割、およびその割り当てを管理するストア。
 */
export const useRoleStore = defineStore('roleStore', {
  state: () => ({
    participants: [] as string[],
    roles: [] as string[],
    assignments: [] as { name: string; role: string }[],
  }),
  actions: {
    /**
     * 参加者のリストを設定する。
     * @param {string[]} names - 参加者の名前の配列。
     */
    setParticipants(names: string[]) {
      this.participants = names;
      console.log(this.participants);
    },
    /**
     * 役割のリストを設定する。
     * @param {string[]} roles - 役割の配列。
     */
    setRoles(roles: string[]) {
      this.roles = roles;
      console.log(this.roles);
    },
    /**
     * 参加者に役割をランダムに割り当てる。
     * 各参加者と役割をペアにした割り当ての配列を作成する。
     */
    assignRoles() {
      const shuffledRoles = [...this.roles].sort(() => Math.random() - 0.5);
      console.log(shuffledRoles);
      this.assignments = this.participants.map((name, index) => ({
        name,
        role: shuffledRoles[index] || '役割なし',
      }));
      console.log(this.assignments);
    },
  },
});
