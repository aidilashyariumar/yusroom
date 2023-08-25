import { create } from "zustand";
// import { useUserStore } from "./userStore";

const roles = JSON.parse(localStorage.getItem('access_role'))



export const useMenuStore = create( (set,get) => ({
    user: {
        title: 'user data',
        menu: roles.user
    },
    room: {
        title: 'Room',
        menu: roles.room
    },
    approval: {
        title: 'Approval',
        menu: roles.approval
    },
    time: {
        title: 'Time',
        menu: roles.time
    },
    visible: false,
    selectedIndex: 0,
    handleClick: (index) => set({ selectedIndex: index })
}))