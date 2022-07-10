import {get, post} from './DAL';

export const getUserAnswers = () => {
    return get('users')
}

export const addAnswer = (data)=>{
    return post('answers',data);
}
