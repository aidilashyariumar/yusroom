import axios from "../helper/axios"

const getAllUsers = async (page = 1, search = '') => {

    try {

        const response = await axios.get(`/admin/user?page=${page}&search=${search}`)
        return response.data

    } catch (e) {
        console.log(e.response.data)
    }

}
const storeUser = async (data) => {

    try {

        const response = await axios.post(`/admin/user`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}
const updateRoom = async (id, data) => {

    try {

        const response = await axios.put(`/admin/user/${id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}
const deleteRoom = async (id) => {
    console.log('id: '+JSON.stringify(id));
    try {
        const response = await axios.delete(`/admin/user/${id}`)
        return response.data

    } catch (e) {
        return e.response
        // console.log("error"+ JSON.stringify(e.response.data))
    }

}
export {getAllUsers,deleteRoom,storeUser,updateRoom}