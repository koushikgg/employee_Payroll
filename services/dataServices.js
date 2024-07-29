import axios from "axios";
export async function postData(data) {
    try {
        return await axios.post('http://localhost:3000/profiles',data)
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

export async function getData() {
    try {
        return await axios.get('http://localhost:3000/profiles')
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}