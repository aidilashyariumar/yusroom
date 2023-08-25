import { createSlice } from "@reduxjs/toolkit"

const sideBarSlice = createSlice({
    name: 'sideBarSlice',
    initialState: {
        currentIndex: 0
    },
    reducers: {
        changeIndex: (state, { payload }) => {
            state.currentIndex = payload
        }
    }
})

export const { changeIndex } = sideBarSlice.actions
export default sideBarSlice.reducer