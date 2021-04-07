import axios from 'axios';
import {
  BACKGROUND_COLOR_DEAFUALT,
  URL_FETCH_USER,
  URL_SEED,
  URL_RESULTS,
  URL_INC
} from '../utils/constants'


export const fetchUsers = (indexData)=>{
    
    
    return new Promise((resolve,reject)=>{
      
      axios.get(`${URL_FETCH_USER}?seed=${URL_SEED}&results=${URL_RESULTS}&&page=${indexData}&inc=${URL_INC}`).then((respone)=>{
        
        const arr = respone.data.results.slice()  
        
        for(let i=0;i<arr.length;i++){
          let obj = {
            gender:arr[i].gender,
            firstName:arr[i].name.first,
            lastName: arr[i].name.last,
            email: arr[i].email,
            picture: arr[i].picture,
            backgroundColor:BACKGROUND_COLOR_DEAFUALT
          }  
           arr[i] = obj
        }
  
        resolve(arr)
      }).catch(err=>{
        console.log("something went wrong")
      })
    });
}

