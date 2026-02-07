"use client"
import api from "@/config/api";
import { TOKEN_KEY } from "@/config/token_key";
import { useRouter } from 'next/navigation'
export default async function authHeader() {
  const router = useRouter();
  let user = null;
  try {
     user = JSON.parse(localStorage.getItem(`${TOKEN_KEY}`));
     await api.post("/api/test/user", {
      xaccesstoken: user.accessToken,
    })
      .then((res) => {

        if (res.data.message === "Login Finish.") {

          return true;
        } else {
          localStorage.removeItem(`${TOKEN_KEY}`);
          router.push('/admin');
      
          return false;
        }
      })
      .catch((err) => {
        localStorage.removeItem(`${TOKEN_KEY}`);
        router.push('/admin');
      });
  } catch (error) {
    localStorage.removeItem(`${TOKEN_KEY}`);
    router.push('/admin');
  }

 

 
}
