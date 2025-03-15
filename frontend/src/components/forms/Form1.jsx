import React, { useEffect, useState } from "react";
import Button1 from "../buttons/Button1";
import { useCreateContactMsgMutation } from "@/features/contact/contactApiSlice";
import Loader from "../otherComps/Loader";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { Input1, TextArea1 } from "./FormElements"

const Form1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(null);

  const [createContactMsg, { isLoading, isSuccess, isError, error }] = useCreateContactMsgMutation();

  const handleName = (e) => setName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handleMsg = (e) => setMsg(e.target.value)

  const toast = useToast()
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Message Sent!",
        description: "Your contact message has been sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (isError) {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, isError, error, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorDisplay(null);

    try {
      await createContactMsg({ name, email, message: msg }).unwrap();
      setName("");
      setEmail("");
      setMsg("");
    } catch (err) {
      setErrorDisplay("Something went wrong.");
    }
  };

  return (
    <>
      <Flex
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)">
        {isLoading && <Loader />}
      </Flex>


      <form className="contact-form">
        {/* Name Field */}
        <Input1
          label={"NAME"}
          type="text"
          required={true}
          value={name}
          func={handleName}
          placeholder="Write your name" />

        {/* Email Field */}
        <Input1
          label={"EMAIL"}
          type="email"
          required={true}
          value={email}
          func={handleEmail}
          placeholder="Write your email" />

        {/* Message Field */}

        <TextArea1
          label={"MESSAGE"}
          type="text"
          required={true}
          value={msg}
          func={handleMsg}
          placeholder="Write your message" />
        <Button1 type="submit" text={"Submit"} subText={""} func={handleSubmit} />
      </form>
    </>
  );
};

export default Form1;
