import { signInWithGooglePopup ,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    // console.log(response);
    createUserDocumentFromAuth(response.user);
  };
  return (
    <div>
      Sign In page
      <button onClick={logGoogleUser}>Sign in with google popup</button>
    </div>
  );
};
export default SignIn;
