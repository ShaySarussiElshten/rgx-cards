import React,{useEffect,useState} from 'react';
import MainNavigation from '../components/shared/Navigation/MainNavigation';
import Button from '@material-ui/core/Button';
import {fetchUsers} from '../Services/userService'
import ClipLoader from "react-spinners/ClipLoader";
import UsersList from '../components/user/UsersList'
import RegexParser from 'regex-parser'
import {
  BACKGROUND_COLOR_DEAFUALT, 
  BACKGROUND_COLOR_MATCH_RGX
  } from '../utils/constants'


const SearchRgxPage = () => {
  
  const [usersList,setUsers] = useState([])
  const [indexData,setIndexData] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  

  const loadMoreUsers = async()=>{
    setIsLoading(true)
    const moreDataUser = await fetchUsers(indexData + 1)
    setIndexData((prevState)=>(prevState+1))
    const currentUsersList = [...usersList]
    const newDataUser = currentUsersList.concat(moreDataUser)
    setUsers(newDataUser)
    setIsLoading(false)
  }

  
  
  const handleSearch =(eventObject)=>{
    const currentUsersList = [...usersList]
  
    let regexExpression;
    
    if(eventObject.target.value === ''){
        const defaultUsersList = changeBackgroundToDefualtColor(currentUsersList)
        setUsers(defaultUsersList)
        return
    }else{
      try{
        regexExpression = RegexParser(eventObject.target.value.toLowerCase())
      }catch(e){
        console.log("invalid regex")
        return
      }   
    }
       
    const usersListFilterByRgx = filterResultByRgx(currentUsersList,regexExpression)
  
    const usersFinalList = changeBackgroundByMatch(usersListFilterByRgx,currentUsersList)
    setUsers(usersFinalList)
    
  }


  const filterResultByRgx =(currentUsersList,regexExpression)=>{
    const listmatchedByName = currentUsersList.filter(({firstName}) => firstName.toLowerCase().match(regexExpression));
    const listmatchedByLastName = currentUsersList.filter(({lastName}) => lastName.toLowerCase().match(regexExpression));
    
    //union listmatchedByName and listmatchedByLastName
    const listRgxMatch = listmatchedByName.concat(listmatchedByLastName)
    
    //Exclude elements that repeat twice 
    const uniqeListRgxMatch = listRgxMatch.filter((item, pos) => listRgxMatch.indexOf(item) === pos)

    return uniqeListRgxMatch
  }

 
  /*
    thia method is responsible to change (cards) background to defult background color
  */
  const changeBackgroundToDefualtColor=(currentUsersList)=>{
    currentUsersList.forEach(element => {
        element.backgroundColor = BACKGROUND_COLOR_DEAFUALT
    });
    return currentUsersList;
  }
  
  
  /*
    thia method is responsible to change (cards) background color by matching 
    between usersListFilterByRgx to currentUsersList
  */
  const changeBackgroundByMatch=(usersListFilterByRgx,currentUsersList)=>{
   
    if(usersListFilterByRgx.length === 0){
        return changeBackgroundToDefualtColor(currentUsersList)
    }
  
  
    for(let i=0;i<currentUsersList.length;i++){
      let userObj = currentUsersList[i]
      for(let j=0;j<usersListFilterByRgx.length;j++){
        let userObjMatchedRgx = usersListFilterByRgx[j]
  
        //this is the definition to match between 2 elements
        if(userObj.firstName === userObjMatchedRgx.firstName &&
            userObj.lastName === userObjMatchedRgx.lastName &&
            userObj.email === userObjMatchedRgx.email
          ){
            currentUsersList[i].backgroundColor = BACKGROUND_COLOR_MATCH_RGX
            break
          }else{
            currentUsersList[i].backgroundColor = BACKGROUND_COLOR_DEAFUALT
          }
      }
     }
  
     return currentUsersList
  }
  

  
  useEffect(()=>{
    const fetch =async()=>{
       const userIndexStart = 1
       const userData = await fetchUsers(userIndexStart)
       setUsers(userData)
    }
    
     fetch()
  },[])

  return (
      <>
        <MainNavigation users={usersList} handleSearch={handleSearch}/>
        
          <main>
            {usersList.length === 0? 
              <ClipLoader color={true} loading={"#ffffff"} size={200} css={`display: block;margin: 0 auto;`} /> : 
              <UsersList items={usersList} />}
            
            {isLoading === true && <ClipLoader color={true} loading={"#ffffff"} size={200} css={`display: block;margin: 0 auto;`} />}
            
              {usersList.length !== 0 && <div className="load-button">
                <Button variant="contained" onClick={loadMoreUsers}>Load More</Button>
              </div>}
            
          </main>
        
      </>      
  );
};

export default SearchRgxPage;