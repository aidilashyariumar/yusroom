
import axios from 'axios'

export default axios.create({
    baseURL: 'https://yusroom.be.sman17gowa.com/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
})
