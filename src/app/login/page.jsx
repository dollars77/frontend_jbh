"use client";
import React, { useState } from "react";
import ErrorMessage from "@/src/components/ErrorMessage";
import { Typography, FormControl, Button } from "@mui/material";
import { signin } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Toast from "@/src/components/Toast";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import Logoweb from "@/src/components/Logoweb";

// import LanguageSelectorAdmin from "../language-selector-admin";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const submitLogin = async (e) => {
    e.preventDefault();
    await signin(username, password)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: `กำลังเข้าสู่ระบบ`,
        });
        location.reload();
      })
      .catch((err) => {
        setErrorMessage(`username หรือ password ไม่ถูกต้อง`);
      });
  };
  return (
    <div
      className="w-full h-screen bg-zinc-200"
      style={{
        backgroundSize: "cover",
      }}
    >
      {/* <div className="grid justify-end w-full pt-2 pr-2">
        <LanguageSelectorAdmin />
      </div> */}

      <div className="p-4 w-full h-screen pt-24 lg:pt-36">
        <div className="pb-10">
          <div className="my-auto  text-center w-14  h-14 lg:h-20 mx-auto  flex justify-center relative">
            <Logoweb />
          </div>
        </div>

        <form
          onSubmit={submitLogin}
          className="p-5 mx-auto text-center rounded-lg bg-gray-300 w-full md:w-1/3"
        >
          <Typography
            variant="h5"
            sx={{ mb: 2 }}
            component="div"
            style={{ color: "black" }}
          >
            LOGIN
          </Typography>
          <div className=" mx-auto my-3 ">
            <Input
              size="large"
              className="ant-input-affix-wrapper form-input h-10 w-full rounded-md"
              autoComplete="off"
              placeholder="Username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mx-auto my-5">
            <Input.Password
              size="large"
              autoComplete="off"
              className="rounded-md h-10"
              placeholder={"password"}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              prefix={<LockOutlined className="site-form-item-icon" />}
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
            {errorMessage ? <ErrorMessage message={errorMessage} /> : <></>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "75%" }} variant="standard">
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                backgroundColor: "#000000",
                ":hover": {
                  bgcolor: "#000033",
                },
                borderRadius: "10px",
              }}
              className=""
            >
              LOGIN
            </Button>
          </FormControl>
        </form>
      </div>
      <footer>
        <div
          className="text-white text-center py-2 lg:py-4 w-full fixed bottom-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        >
          <p className="text-xs lg:text-xs">
            ©{new Date().getFullYear()} JBH-STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Admin;
