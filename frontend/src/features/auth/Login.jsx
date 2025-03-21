import React, { useCallback, useEffect, useState } from 'react'
import { useLoginMutation } from "./authApiSlice"
import { useNavigate } from 'react-router-dom'
import { setCredentials } from './authSlice'
import { useDispatch } from 'react-redux'
import { Flex, Text, useToast } from '@chakra-ui/react'
import useTitle from '@/hooks/useTitle'
import { Input1 } from '@/components/forms/FormElements'
import Button1 from '@/components/buttons/Button1'
import usePersist from '@/hooks/usePersist'
import Loader from '@/components/otherComps/Loader'


const Login = () => {
    useTitle("Login")
    const navigate = useNavigate()

    const [persist, SetPersist] = usePersist()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    // const loginMutation = useMemo(() => useLoginMutation(), []);
    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()
    const dispatch = useDispatch()

    const toast = useToast()
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Login Success!",
                description: "You have successfully looged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else if (isError) {
            toast({
                title: "Error!",
                description: errorMsg,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [isSuccess, isError, error, toast]);

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
        <>
            <Flex
                position="absolute"
                top="30%"
                left="50%"
                transform="translate(-50%, -50%)">
                {isLoading && <Loader />}
            </Flex>
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
            </Flex>
        </>
    )

}

export default Login
