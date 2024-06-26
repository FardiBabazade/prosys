// routes.ts

import React from "react";
import Login from "../pages/login/Login";
// import Students from "../pages/student/Students";
import  Subjects  from "../pages/subject/Subjects" ;

export type RouteConfig = {
  path: string;
  title: string;
  element: React.ReactNode;
};

const routes: RouteConfig[] = [
  {
    path: "",
    title: "Login",
    element: <Login  />,
  },
  {
    path:'/admin',
    title:'admin',
    element:<Subjects/>
  }
];

export default routes;
