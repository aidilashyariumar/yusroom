import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../helper/axios'


export const authentication = createAsyncThunk('userSlice/authentication', async ({username, password }, thunkAPI) => {
    try {
        const response = await axios.post('/login', { username, password })
        localStorage.setItem('access_token', response.data.data.access_token)
        localStorage.setItem('name', response.data.data.name)
        localStorage.setItem('auth', true)
        localStorage.setItem('access_role', response.data.data.access_role)
        return response.data.data.name
    } catch (err) {
        return thunkAPI.rejectWithValue()
    }

})

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        name: '',
        isAuth: false,
        loading: false
    },
    extraReducers: (builder) => {

        builder.addCase(authentication.fulfilled, (state, { payload }) => {
            state.name = payload
            state.isAuth = true
            state.loading = false
        })
        
        builder.addCase(authentication.pending, (state, action) => {
            state.loading = true
        })
        
        builder.addCase(authentication.rejected, (state, action) => {
            state.isAuth = false
            state.loading = false
        })

    }

})

export default userSlice.reducer