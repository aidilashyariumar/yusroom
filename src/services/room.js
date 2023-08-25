import axios from "../helper/axios"



const getAllRoom = async (page = 1, search = '') => {

    try {

        const response = await axios.get(`/admin/room?page=${page}&search=${search}`)
        return response.data

    } catch (e) {
        console.log(e.response.data)
    }

}

const storeRoom = async (data) => {

    try {

        const response = await axios.post(`/admin/room`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}
const updateRoom = async (id, data) => {

    try {

        const response = await axios.put(`/admin/room/${id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}
const deleteRoom = async (id) => {
    console.log('id: '+JSON.stringify(id));
    try {
        const response = await axios.delete(`/admin/room/${id}`)
        return response.data

    } catch (e) {
        return e.response
        // console.log("error"+ JSON.stringify(e.response.data))
    }

}
export {getAllRoom,deleteRoom,storeRoom,updateRoom}