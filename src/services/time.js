import axios from "../helper/axios"

const getAllTime = async (page = 1, search = '') => {

    try {

        const response = await axios.get(`/admin/time?page=${page}&search=${search}`)
        return response.data

    } catch (e) {
        console.log(e.response.data)
    }

}

const createTime= async (data) => {

    try {

        const response = await axios.post(`/admin/time`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}
const updateTime = async (id, data) => {

    try {

        const response = await axios.put(`/admin/time/${id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const deleteTime = async (id) => {
    console.log('id: '+JSON.stringify(id));
    try {
        const response = await axios.delete(`/admin/time/${id}`)
        return response.data

    } catch (e) {
        return e.response
        // console.log("error"+ JSON.stringify(e.response.data))
    }

}
export {getAllTime,deleteTime,createTime,updateTime}