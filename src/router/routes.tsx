// routes.ts

import React from "react";
import Login from "../pages/login/Login";
// import Students from "../pages/student/Students";
import  Subjects  from "../pages/subject/Subjects" ;
import Students from "../pages/student/Students";
import Exam from "../pages/exam/Exam";

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
  },
  {
    path:'/student',
    title:'student',
    element:<Students/>
  },
  {
    path:'/exam',
    title:'exam',
    element:<Exam/>
  }
];

export default routes;
