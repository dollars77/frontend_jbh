import api from "@/config/api";
import { TOKEN_KEY } from "@/config/token_key";
export default async function authUser() {
  let user = null;
  try {
     user = JSON.parse(localStorage.getItem(`${TOKEN_KEY}Userdata`));
     
     await api.post("/api/people/checktoken", {
      xaccesstoken: user.token,
    })
      .then((res) => {

        if (res.data.message === "Login Finish.") {

          return true;
        } else {
          localStorage.removeItem(`${TOKEN_KEY}Id`);
          localStorage.removeItem(`${TOKEN_KEY}Userdata`);
          if (window.$chatwoot) {
            window.$chatwoot.reset();
          }
          window.location.href = `/`;
      
          return false;
        }
      })
      .catch((err) => {
        if (window.$chatwoot) {
          window.$chatwoot.reset();
        }
        localStorage.removeItem(`${TOKEN_KEY}Id`);
   
        localStorage.removeItem(`${TOKEN_KEY}Userdata`);
        window.location.href = `/`;
      });
  } catch (error) {
    if (window.$chatwoot) {
      window.$chatwoot.reset();
    }
    localStorage.removeItem(`${TOKEN_KEY}Id`);
    localStorage.removeItem(`${TOKEN_KEY}Userdata`);
    window.location.href = `/`;
  }

 

 
}
