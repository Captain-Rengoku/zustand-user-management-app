import { create } from 'zustand';
import { usersData } from '../utils/usersData';
import type { User } from '../types/user';
import { persist } from 'zustand/middleware';

type UsersStore = {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string) => void;
}

const useUsersStore = create<UsersStore>()(
  persist((set, get) => {
    return {
      users: usersData,

      addUser: (user) => {
        set({
          users: [user, ...get().users],
        })
      },

      deleteUser: (id) => {
        set({
          users: get().users.filter(user => user.id !== id)
        })
      },

      updateUser: () => { },
    }
  }, {
    name: "users"
  }
  )
)

export default useUsersStore;