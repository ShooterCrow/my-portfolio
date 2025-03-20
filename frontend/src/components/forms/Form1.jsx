import React, { useEffect, useState } from "react";
import Button1 from "../buttons/Button1";
import { useCreateContactMsgMutation } from "@/features/contact/contactApiSlice";
import Loader from "../otherComps/Loader";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { Input1, Select1, TextArea1 } from "./FormElements"

const Form1 = () => {
  const [createContactMsg, { isLoading, isSuccess, isError, error }] = useCreateContactMsgMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(null);
  const [isSell, setIsSell] = useState('');
  const [options, setOptions] = useState([
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ]);

  const handleName = (e) => setName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handleMsg = (e) => setMsg(e.target.value)
  const handleSell = (e) => {
    setIsSell(e.target.value);
  };

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

        <Flex alignItems={"center"} gap={"10px"} w={"100%"} justifyContent={"space-between"}>
          {/* Budget Field */}
          <Input1
            label={"BUDGET"}
            type="number"
            required={true}
            // value={budget}
            // func={handleBuget}
            placeholder="Your Budget" />

          {/* Ecommerce? Field */}
          <Select1
            label={"Recieving Payments?"}
            required={true}
            options={options}
            value={isSell}
            func={handleSell}
          />
        </Flex>

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
