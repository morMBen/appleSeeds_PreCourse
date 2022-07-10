import {get, post} from '../DAL';


export const getAllUsers = () => {
    return get('admin/users')
}

export const getUserTask = (userId) => {
    return get(`admin/user/tasks/${userId}`)
}

export const addGrade = (userId, grade) => {
    return post(`admin/user/tasks/${userId}`,{grade : grade});
}
