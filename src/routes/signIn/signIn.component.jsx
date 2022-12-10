// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import {
//   auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
//   signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {  
//     useEffect(()=>{
//         async function getresult()
//         {
//             const response = await getRedirectResult(auth);
//             console.log(response);
//             if(response)
//             {
//                 const userDocRef=await createUserDocumentFromAuth(response.user);
//             }
//         }
//         getresult();
//   },[])



  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    // console.log(response);
    const userDocRef= createUserDocumentFromAuth(response.user);
  };
  return (
    <div>
      Sign In page
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with google Redirect</button> */}
      <SignUpForm/>
    </div>
  );
};
export default SignIn;
