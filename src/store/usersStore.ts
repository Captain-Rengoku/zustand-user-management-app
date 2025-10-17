import { create } from 'zustand';
import { usersData } from '../utils/usersData';
import type { User } from '../types/user';
import { persist } from 'zustand/middleware';

type UsersStore = {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
  getUserByID: (id: string) => User | undefined;
  updateUser: (id: string, updatedUser: User) => void;
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

      getUserByID: (id) => {
        return get().users.find((user) => user.id === id);
      },

      updateUser: (id, updatedUser) => {
        set({
          users: get().users.map(user => {
            if(user.id === id){
              return {
                ...user,
                ...updatedUser
              };
            }
            return user;
          }) 
        })
      },
    }
  }, {
    name: "users"
  }
  )
)

export default useUsersStore;