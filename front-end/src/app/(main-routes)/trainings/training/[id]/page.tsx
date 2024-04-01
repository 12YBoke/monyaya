import { Container } from "@/ui/components/container/container"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingView } from "@/ui/components/training-view/training-view"

export default async function Home({ params } : { params: { id: string } }) {
  const idTraining = decodeURIComponent(params.id)
  const session = await getServerSession(authOptions)
  const userId = 
    session ? await prisma?.user.findUnique({
      where: {
        name: session!.user!.name!
      },
      select: {
        id: true
      }
    }) : null
  const myLearnings = 
    userId ? await prisma?.learners.findMany({
      where: {
        userId: userId!.id
      },
      select: {
        trainingId: true,
        status: true,
      }
    }) : null
  const training = await prisma?.trainings.findMany({
    where: {
      id: idTraining
    },
    include: {
      _count: {
        select: {
          modules: true,
        }
      },
      modules: {
        select: {
          title: true,
          description: true,
        }
      },
      user: {
        select: {
          name: true,
          email: true,
          municipality: true,
          createdAt: true,
          district: true,
          avenue: true,
          number: true,
          image: true,
        },
      },
      courses: {
        select: {
          name: true,
          category: {
            select: {
              name: true
            }
          }
        }
      },
      learners: {
        select: {
          userId: true,
          status: true
        }
      }
    }
  })
  
  return (
    <Container className="flex py-8 px-4 md:px-8 md:py-8 flex-col gap-8">
      {
        session || myLearnings ?
        <TrainingView 
          className="grid grid-cols-1"
          data={training} 
          userId={userId!.id!} 
          myLearnings={myLearnings!} 
          sessionName={session!.user!.name!}
        />
        :
        <TrainingView 
          className="grid grid-cols-1"
          data={training} 
        />
      }
    </Container>
    
  )
}