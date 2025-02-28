import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import CheckOut from './routes/checkout/checkout.component';
import { onAuthStateChangeListener,createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
      const unsubscribe=onAuthStateChangeListener((user)=>{
          // console.log(user);
          if(user)//storing in database
          {
              createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user));//setting the current user
          return unsubscribe;
      })
  },[])
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="shop/*" element={<Shop />}/>
        <Route path="auth" element={<Authentication />}/>
        <Route path="checkout" element={<CheckOut />}/>
      </Route>
    </Routes>
  )
};

export default App;