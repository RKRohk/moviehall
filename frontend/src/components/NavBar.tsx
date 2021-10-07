import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebaseContext";

const NavBar = () => {
  const { auth } = useContext(FirebaseContext);

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(!!auth.currentUser);
  }, [auth.currentUser]);

  return (
    <nav className="flex flex-row justify-between">
      <div>Logo Placeholder</div>
      <div>
        {!signedIn && <div> Sign IN </div>}
        {signedIn && <div> Hello {auth.currentUser?.displayName} !</div>}
      </div>
    </nav>
  );
};

export default NavBar;
