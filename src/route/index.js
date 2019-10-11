import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import asyncLoader from "../utils/loadable"
import routingGuart from "@/tools/routingGuard"//引入路由守卫的高阶组件封装器 下面的appAdditem组件会有用到路由守卫

// import AppIndex from "@/appIndex/appIndex";
// import AppLogin from "@/appLogin/appLogin";
const AppIndex=asyncLoader(()=>import("@/components/appIndex/appIndex"));
const AppLogin=asyncLoader(()=>import("@/components/appLogin/appLogin"));
const AppAdditem=asyncLoader(()=>import("@/components/appAdditem/appAdditem"));
const AppMain=asyncLoader(()=>import("@/components/appMain/appMain"));
const Flux=asyncLoader(()=>import("@/components/flux/flux"));
const Redux=asyncLoader(()=>import("@/components/redux/redux"));
const ReactRedux=asyncLoader(()=>import("@/components/reactRedux/reactRedux"));
const router =()=> (
    <Router>
      <Route exact path="/flux" component={Flux}></Route>
      <Route exact path="/reactRedux" component={ReactRedux}></Route>
      <Route exact path="/redux" component={Redux}></Route>
      <Route exact path="/appIndex" component={AppIndex}></Route>
      <Route exact path="/" component={AppLogin}></Route>
      <Route exact path="/appAdditem" component={routingGuart(AppAdditem)}></Route>
      <Route exact path="/appMain" component={routingGuart(AppMain)}></Route>
    </Router>
  )
export default router;
