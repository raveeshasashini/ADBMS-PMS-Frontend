import axios from "axios";

class BranchManageService {
    static BASE_URL = 'http://localhost:8080';

    static async getAllBranches(){
        try{
            const response = await axios.get(`${BranchManageService.BASE_URL}/api/branchManagement/getAllBranches`);
            return response.data.content;
        }catch(err){
            throw err;
        }
    }
}

export default BranchManageService;