import {post} from "../DAL";


export const createNewUser = (data)=>{
    return post('users',data);
}
