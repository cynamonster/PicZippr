import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: 
            'Client-ID 76c83812915b8fe6d833fd2f3b04a6bbe752f8327e4a32d918921b511438409a'
    }
});