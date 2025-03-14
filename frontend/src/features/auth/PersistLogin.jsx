import usePersist from "@/hooks/usePersist";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import Loader from "@/components/otherComps/Loader";
import { Flex } from "@chakra-ui/react";
import Button2 from "@/components/buttons/Button2";

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                // console.log('verifying refresh token')
                try {
                    await refresh()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])
    let content
    if (!persist) { // persist: no
        content = <Outlet />
    } else if (isLoading) {
        content = <Loader />
    } else if (isError) { //persist: yes, token: no
        console.log("this")
        content = (
            <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
                <Link to="/login"><Button2 text={"Please login again"} /></Link>
            </Flex>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin
