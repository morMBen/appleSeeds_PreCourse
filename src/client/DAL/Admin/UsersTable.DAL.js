import {get} from '../DAL';


export const userTable=()=>{
    return get('users/users');
}
