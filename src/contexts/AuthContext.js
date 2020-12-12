import {ExploreOff} from '@material-ui/icons';
import firebase from '../lib/firebase'
import React, { createContext, useReducer, useEffect} from 'react';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised:false,
  users: null,
  login: () => { },
  logout: () => { },

}

const reducer = (state, action) => {
  switch(action.type){
    case 'AUTH_STATE_CHANGED': {
      const { isAuthenticated, user } = action.payload

      return{
        ...state,
        isAuthenticated,
        isInitialised:true,
        user
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}

export const AuthContext = createContext({
  ...initialAuthState,
  method: 'FirebaseAuth',
  signInWithGoogle:() => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve()
})

const AuthContextProvider = ({children}) => {
  //initially set is logged in to false
  // const [isLogged, setIsLogged] = useState (false);

  const [state, dispatch] = useReducer(reducer, initialAuthState)

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    return firebase.auth().signInWithPopup(provider)
  }

  const signInWithEmailAndPassword = () =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
  const logout = () => {
    //when logout button is pushed
    return firebase.auth().signOut()
  };

  useEffect(() =>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        dispatch({
          type:'AUTH_STATE_CHANGED',
          payload:{
            isAuthenticated:true,
            user:{
              id: user.id,
              avatar:user.photoURL,
              email:user.email,
              name: user.displayName || user.email,
              tier: 'Premium'
            }
          }
        });
      } else {
        dispatch({
          type:'AUTH_STATE_CHANGED',
          payload:{
            isAuthenticated:false,
            user:null
          }
        });
      }
    });

    return unsubscribe;
  },[dispatch]);


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method:'FirebaseAuth',
        signInWithGoogle,
        signInWithEmailAndPassword,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
