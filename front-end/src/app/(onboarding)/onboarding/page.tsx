import { Container } from "@/ui/components/container/container";
import { Init } from "../steps/init";
import { ScrollOnboard } from "@/ui/components/scroll-onboard/scroll-onboard";
import { CompleteRegistration } from "../steps/complete-registration";

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
export default async function Home () {

  const session = await getServerSession(authOptions)

  const user = await prisma!.user.findUnique({
    where: {
      name: session!.user!.name!
    },
    select: {
      email: true,
      name: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      password: true,
      municipality: true,
      district: true,
      avenue: true,
      number: true,
    }
  }) 

  return(
    <Container className="flex flex-col h-[100vh] w-full overflow-hidden relative"> 
      <ScrollOnboard
        data = {[
          {
            id: "init",
            element: <Init/>,
          },
          {
            id: "init2",
            element: <CompleteRegistration data= {user!} name={user!.name}/>,
          },
        ]}
      />
    </Container>
  )
}