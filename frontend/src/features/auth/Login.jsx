import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLoginMutation } from "./authApiSlice"
import { useNavigate } from 'react-router-dom'
import { setCredentials } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Form1 from '../../components/forms/Form1'
import { Box, Flex, Text } from '@chakra-ui/react'
import useTitle from '@/hooks/useTitle'
import { Input1 } from '@/components/forms/FormElements'
import Button1 from '@/components/buttons/Button1'
import { selectAllUsers, useGetUsersQuery } from '../users/usersApiSlice'
import usePersist from '@/hooks/usePersist'


const Login = () => {
    useTitle("Login")
    const navigate = useNavigate()

    const [persist, SetPersist] = usePersist()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    // const loginMutation = useMemo(() => useLoginMutation(), []);
    const [login] = useLoginMutation()
    const dispatch = useDispatch()

    const handleUname = useCallback((e) => setUsername(e.target.value), []);
    const handlePwd = useCallback((e) => setPassword(e.target.value), []);


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!username || !password) return setErrorMsg("Enter Username and Password");

        try {
            const userData = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken: userData.accessToken }));
            setUsername("");
            setPassword("");
            navigate("/dashboard");
        } catch (err) {
            if (!err.status) {
                setErrorMsg("No server response")
            } else if (err.status === 400) {
                setErrorMsg("Missing Username or Password")
            } else if (err.message === 401) {
                setErrorMsg("Unauthorized")
            } else {
                setErrorMsg(err.data?.message)
            }

        }
    }, [username, password, login, dispatch, navigate]);


    return (
        <Flex px={"30px"} flexDir={"column"} pb={{ base: "50px", lg: "100px" }} justifyContent={"center"} alignItems={"center"} minH={"90vh"}>
            <Text className='pri-text'>Login</Text>
            <form className="contact-form">
                {/* Name Field */}
                <Input1
                    label={"USERNAME"}
                    type="text"
                    required={true}
                    value={username}
                    func={handleUname}
                    placeholder="Enter your username" />

                {/* Email Field */}
                <Input1
                    label={"PASSWORD"}
                    type="password"
                    required={true}
                    value={password}
                    func={handlePwd}
                    placeholder="Enter your pssword" />
                <Button1 func={handleSubmit} text={"Submit"} />
            </form>
        </Flex>)

}

export default Login
