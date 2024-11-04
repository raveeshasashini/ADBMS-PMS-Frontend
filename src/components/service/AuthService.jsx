import axios from "axios";

class AuthService {
    static BASE_URL = 'http://localhost:8080';

    static async loginAuth(email,password){
        try{
            const response = await axios.post(`${AuthService.BASE_URL}/api/user/login`,{email,password})
            return response.data.content;
        }catch(err){
            throw err;
        }
    }
}

export default AuthService;