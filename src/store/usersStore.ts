import { create } from 'zustand';
import { usersData } from '../utils/usersData';
import type { User } from '../types/user';

type UsersStore = {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

const useUsersStore = create<UsersStore>((set, get) => {
  return {
    users: usersData,
    addUser: (user) => {
      set({
        users: [user, ...get().users],
      })
    },
    updateUser: () => { },
    deleteUser: () => { },
  }
})

export default useUsersStore;