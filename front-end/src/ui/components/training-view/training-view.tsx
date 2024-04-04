"use client"

import { pusherClient } from "@/lib/pusher"
import { useState } from "react"
import { Container } from "../container/container"
import { Typography } from "../typography/typography"
import { SearchResultButtons, SearchResultTrainer } from "@/ui/modules/search-result/search-result-buttons"
import { Calendar, List, Map, } from "lucide-react"
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { truncateText } from "@/lib/truncate-text"
import clsx from "clsx"
import { Accordion,AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { YayaProfil } from "@/ui/modules/yaya-profil/yaya-profil"
import { usePathname } from "next/navigation"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import RekreationPaysage from '../../../../public/rekreatioonPaysage.png'
import Image from "next/image"
import { Buttons } from "../buttons/buttons"

interface Props {
  data: {
    id : string
    name : string
    description : string
    userId : string
    price : number
    coursesId : string
    createdAt : Date
    _count : {
      modules: number
    }
    modules : {
      title: string
      description: string
    }[]
    user: {
      name: string
      municipality: string | null
      email: string | null
      createdAt?: Date
      district: string | null
      avenue: string | null
      number: string | null
      image?: string | null
    }
    courses: {
      name: string
      category: {
        name: string
      }
    }
  }[]
  userId?: string
  sessionName?: string
  myLearnings?: {
    trainingId: string
    status: "PENDING" | "APPROVED" | "REJECTED"
  }[]
  className?: string
}

export const TrainingView = ({data, userId, sessionName, myLearnings, className}: Props) => {
  const [learnings, setLearnings] = useState(myLearnings ? myLearnings : [])
  const pathname = usePathname()

  if(userId) {
    const channel = pusherClient.subscribe(userId!);
    channel.bind("add", function (data: any) { 
      const parsedLearnings = JSON.parse(data.result);
      setLearnings((prev) => [...prev, parsedLearnings]);
    })
  }
  
  return (
    <Container className={clsx("", className)}>
      {
        data.map(({id, modules, createdAt, name, description, price, user, courses}) => (
          <Container className="bg-white w-full gap-4 md:gap-8 flex flex-col md:flex-row rounded" key={id}>
            <Container className="md:basis-3/5 flex flex-col gap-4 ">
              <Container className="md:sticky md:top-24 w-full relative md:w-auto aspect-video bg-primary-50 rounded overflow-hidden flex justify-center items-center">
                <Image src={RekreationPaysage} alt="rekreatioon logo" className="h-auto w-full group-hover:scale-150 animate"/>
              </Container>
            </Container>
            <Container className="md:basis-2/5 flex flex-col gap-4 md:gap-8">
              <Container className="gap-4 flex flex-row justify-between">
                <Container className="flex flex-row gap-1 items-center">
                  <Typography variant="body-sm">{courses.name}</Typography>
                </Container>
                <Container className="flex flex-row gap-1 items-center">
                  <Calendar width={14} height={14}/>
                  <Typography variant="body-sm">{format(createdAt, 'dd MMMM yyyy', { locale: fr })}</Typography>
                </Container>
              </Container>
              <Container className="flex flex-col">
                <Typography variant="title-base">{name}</Typography>
              </Container>
              <Container className="flex flex-col gap-2">
                <Typography variant="body-sm">Description</Typography>
                <Typography>{description}</Typography>
              </Container>
              <Container className="flex flex-col gap-2">
                <Typography variant="body-sm">Module(s)</Typography>

                <Accordion type="single" collapsible className="w-full">
                  {modules.map(({title, description}) => (  
                    <AccordionItem key={title} value={title}>
                      <AccordionTrigger>{title}</AccordionTrigger>
                      <AccordionContent>{description}</AccordionContent>
                    </AccordionItem>
                  ))
                  }
                </Accordion>
              </Container>
              <Container className="my-8 flex flex-row items-center justify-between w-full">
                <Container className="flex flex-row gap-1 items-center">
                  <Typography variant="title-lg" className="text-primary-Default">${price}</Typography>
                </Container> 
                <SearchResultButtons 
                  userId={userId ? userId : null} 
                  trainingId={id} 
                  isMyAccount={sessionName === user!.name} 
                  amLearner={learnings.some(objet => objet.trainingId === id)} 
                  status={learnings.find(obj => obj!.trainingId === id)?.status}  
                />
              </Container>
              <Container>
                {
                  sessionName === user!.name ?
                  null
                  :
                  user &&
                    <YayaProfil 
                      data = {
                        [{
                        name : user.name,
                        image : user.image!,
                        email : user.email!,
                        createdAt: user.createdAt,
                        municipality : user.municipality!,
                        district : user.district!,
                        avenue : user.avenue!,
                        number : user.number!
                        }]
                      }
                      className="w-full md:40%"
                    >
                    <Buttons buttonType="link" baseUrl={`/profil/${name}`}>Voir profil</Buttons>
                  </YayaProfil> 
                }
              </Container>
            </Container>
          </Container>
        ))
      }
    </Container>
  )
}