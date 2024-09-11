import React from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const SignInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results?.user?.uid,
      userName: results?.user?.displayName,
      userPhoto: results?.user?.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expence-tracker");
  };
  return (
    <div className=" max-w-xl flex flex-col items-center m-auto mt-60 gap-5 ">
      <p className="font-bold text-xl">Sign In With Google to Continue</p>
      <button
        onClick={SignInWithGoogle}
        className="flex items-center gap-2 font-bold border border-black px-4 py-2 active:scale-75 duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
      >
        <img className="w-6" src="/google.png" alt="" />
        Sign In With Google
      </button>
    </div>
  );
};

export default Auth;
