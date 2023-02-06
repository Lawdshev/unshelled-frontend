import React, { useState} from "react";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"
import { useAuthContext } from "../context";

const SignIn = () => {
  const {isUser,setIsUser} = useAuthContext()
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const id = e.target.elements.id.value;
    const password = e.target.elements.password.value;

    console.log(id,password)

    const credentials = btoa(`${id}:${password}`);

    try {
      const response = await fetch("https://unshelled.onrender.com/signin", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
        },
      });

      if (response.status === 401) {
        setError("Invalid credentials");
        return;
      }

      if (response.status === 404) {
        setError("User not found");
        return;
      }

      const user = await response.json();
      setUser(user);
      Cookies.set('activeUser', JSON.stringify(user), { expires: 7 });
      setIsUser(true)
      setError(null);
      navigate('/')
    } catch (error) {
      console.error(error);
      setError("An error occurred");
    } finally{
      setIsLoading(false)
    }

  };

  if (isLoading) {
    return <div className="mx-auto mt-[10vw] text-[2vw] text-[#D40E1F]">Loading...</div>;
  }

  return (
    <div class="mx-auto flex flex-col justify-center items-center">
      <p>You can login with ****
        seller_id :
        c89cf7c468a48af70aada384e722f9e2
        seller_zip_code_prefix :
        25730
    </p>
    <form onSubmit={handleSubmit} class="bg-[#D40E1F0D] p-6 rounded-lg shadow-xl">
      <div class="mb-4">
        <input type="text" name="id" placeholder="ID" class="block p-2 w-full border border-gray-400 rounded-lg" />
      </div>
      <div class="mb-4">
        <input type="password" name="password" placeholder="Password" class="block p-2 w-full border border-gray-400 rounded-lg" />
      </div>
      <button type="submit" class="block w-full p-2 bg-[white] text-[#D40E1F] hover:bg-[#D40E1F] hover:text-[#ffffff] ">Sign In</button>
      {error && <p class="text-red-500 text-xs mt-2">{error}</p>}
      {user && <p class="text-green-500 text-xs mt-2">Signed in as {user[0].seller_id}</p>}
    </form>
  </div>
  );
};

export default SignIn;
