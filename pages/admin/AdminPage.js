import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // Verify token to check if user is an admin
    fetch("/api/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setIsAdmin(true);
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  return (
    <div>
      {isAdmin ? (
        <h1>Welcome to Admin Page</h1>
      ) : (
        <h1>Unauthorized Access</h1>
      )}
    </div>
  );
};

export default AdminPage;
