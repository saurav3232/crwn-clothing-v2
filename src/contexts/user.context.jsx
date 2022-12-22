import { createContext } from "react";
import { useEffect,useReducer } from "react";
import { onAuthStateChangeListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null
});
export const USER_ACTION_TYPES={
    SET_CURRENT_USER:"SET_CURRENT_USER"
}
const userReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type)
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:payload
            };
        default:
            throw Error(`Unhandled type ${type} in userReducer`);
    }
}
const INITIAL_STATE={
    currentUser:null,
}
export const UserProvider=({children})=>{
    // const [currentUser, setCurrentUser]=useState(null);
    const [{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE);
    // console.log(currentUser);
    const setCurrentUser=(user)=>{
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChangeListener((user)=>{
            // console.log(user);
            if(user)//storing in database
            {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);//setting the current user
            return unsubscribe;
        })
    },[])
    const value={currentUser,setCurrentUser};
    return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    )
}