import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Navigasi from "../components/Navigasi";

export default function Akun() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return () => {
      // Clean up the subscription when the component is unmounted
      unsubscribe();
    };
  }, []);

  const handleDeleteAccount = () => {
    if (user) {
      // Delete the currently logged-in user's account
      user.delete()
        .then(() => {
          // Account successfully deleted
          console.log("Account successfully deleted");
        })
        .catch((error) => {
          // An error occurred while deleting the account
          console.error("Error deleting account: " + error.message);
        });
    }
  };

  return (
    <div>
      <div className="w-full bg-white h-12 drop-shadow-lg">
        <Navigasi />
        <div className="justify-between flex mt-32">
          {user ? (
            <>
              <h1 className="ml-4">{user.email}</h1>
              <h1 className="text-center">{user.password}</h1>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 border border-gray-400 rounded-lg w-24 h-8 mr-3"
              >
                Delete
              </button>
            </>
          ) : (
            <p>Please log in to view account information.</p>
          )}
        </div>
      </div>
    </div>
  );
}
