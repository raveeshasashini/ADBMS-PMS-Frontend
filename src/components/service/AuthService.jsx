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

// import axios from "axios";

// class AuthService {
//     static BASE_URL = 'http://localhost:8080';

//     static async loginAuth(email, password) {
//         try {
//             const response = await axios.post(`${AuthService.BASE_URL}/api/user/login`, { email, password });

//             // Assuming branchId is in response.data.content.branchId
//             const user = response.data.content;
//             if (user && user.branchId) {
//                 localStorage.setItem("branchId", user.branchId);
//             }

//             return user; // Return the user data if needed
//         } catch (err) {
//             console.error("Login failed:", err);
//             throw err;
//         }
//     }
// }

// export default AuthService;
