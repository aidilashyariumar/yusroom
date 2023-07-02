import axios from "../helper/axios"

const getAllUsers = async () => {
    try{
        // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const response = await axios.get('/admin/user')
        return response.data
    } catch(e){
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
export {getAllUsers,deleteRoom}