import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: { username: '********', password: '********' },
    connection: { address: '**************', port: '***' },
    accountStatus: '可用',
    embyStatus: '可用',
  }),
});
