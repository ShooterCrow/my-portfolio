import store from "@/app/store";
import { useEffect } from "react";
import { projectApiSlice } from "../projects/projectsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { contactApiSlice } from "../contact/contactApiSlice";
import { Outlet } from "react-router-dom";
import { servicesApiSlice } from "../services/ServicesApiSlice";

const Prefetch = () => {

  useEffect(() => {
    store.dispatch(projectApiSlice.util.prefetch("getProjects", "projectList", {force: true}))
    store.dispatch(servicesApiSlice.util.prefetch("getServices", "servicesList", {force: true}))
    store.dispatch(usersApiSlice.util.prefetch("getUsers", "usersList", {force: true}))
    store.dispatch(contactApiSlice.util.prefetch("getContactMsgs", "contactMsgsList", {force: true}))

  }, []);

  return <Outlet/>
};

export default Prefetch;
