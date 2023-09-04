import axios from "../helper/axios"



const getAllBooking = async (page = 1, search = '') => {

    try {

        const response = await axios.get(`/admin/bookingRequest?page=${page}&search=${search}`)
        return response.data

    } catch (e) {
        console.log(e.response.data)
    }

}


const updateBooking = async (id, data) => {

    try {

        const response = await axios.patch(`/admin/bookingRequest/approve/${id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

export {getAllBooking,updateBooking}