import { useSelector } from "react-redux"
import { selectAllContactMsgs, useGetContactMsgsQuery } from "@/features/contact/contactApiSlice"
import { VStack } from "@chakra-ui/react"
import ContactMsgBlock from "./ContactMsgBlock"
import Loader from "@/components/otherComps/Loader"
import React from "react"

const ContactMsgsList = () => {
    const {
        data,
        isLoading,
        isSuccess,
    } = useGetContactMsgsQuery("contactMsgsList", {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: false
        })

    let content
    if (isLoading) content = <Loader />
    if (isSuccess) {
        const { ids, entities } = data
        content = <VStack spacing={{ base: 3, md: 4 }} align="stretch">
            {ids?.map(id => <ContactMsgBlock key={id} contactId={id} />)}
        </VStack>
    }
    return content
}

export default React.memo(ContactMsgsList)