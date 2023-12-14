"use client"
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const AccountContent = () => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { isLoading, user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('users')
          .select('id', 'full_name', 'avatar_url')  // Include other fields as needed
          .eq('id', user?.id)
          .single();

        if (error) {
          throw error;
        }

        console.log("User Data:", data); // Log the data to the console

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData(); // Call fetchData function

  }, [isLoading, user, router, supabaseClient]);

  return (
    <div>
      {userData ? (
        <>
          <h1 className="ps-6 text-bold text-2xl">Welcome, {userData.full_name}!</h1>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AccountContent;
