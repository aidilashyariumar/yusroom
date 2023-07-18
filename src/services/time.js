import axios from "../helper/axios"

const getAllTime = async () => {
    try{
        // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const response = await axios.get('/admin/time')
        return response.data
    } catch(e){
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
export {getAllTime,deleteTime}