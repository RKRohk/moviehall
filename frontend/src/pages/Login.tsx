import { useContext } from "react"
import { StyledFirebaseAuth } from "react-firebaseui"
import { FirebaseContext } from "../context/firebaseContext"
import firebase from "firebase";
import { useHistory } from "react-router";


const Login = () => {

    const history = useHistory()

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                console.log(authResult)
                return false
            }
        }
    };


    const { auth } = useContext(FirebaseContext)
    return <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
}
export default Login