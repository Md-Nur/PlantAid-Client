import { ReactNode } from "react"

const Title = ({children}:{children:ReactNode}) => {
  return (
    <h1 className="text-3xl md:text-5xl my-10 text-center font-bold">{children}</h1>
  )
}

export default Title