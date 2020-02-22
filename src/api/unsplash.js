import axios from 'axios';
import '../../config'

export default axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: 
            'Client-ID ' + config.MY_KEY
    }
});