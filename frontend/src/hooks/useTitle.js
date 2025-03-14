import React, { useEffect } from 'react'

const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title
        if (title) document.title = title

        return () => document.title = prevTitle
    }, [title])
  return 
}

export default useTitle
