import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import studentImage from '../../../../public/Revisao-de-Literatura-Exemplo.jpg'
export default function VisionSection(){
    return(
        <Container className=" container flex flex-col-reverse lg:flex-row-reverse max-w-full lg:justify-between  items-center gap-8 lg:my-10 p-8 ">
             <Container className="">
                <Image 
                width={500}
                src={studentImage}
                height={300}
                alt="image"
                className="rounded-2xl "
            />
            </Container>
            <Container className="lg:w-1/2 flex flex-col justify-between items-center gap-8">
                <Typography className="text-[#39ae44] " component="h4" variant="title-lg" >Notre Vision</Typography>
                <Typography className="leading-relaxed text-lg" component="p" variant="body-base">
                Notre vision est de devenir la plateforme numéro un d'apprentissage, le réflexe naturel 
                pour toute personne souhaitant acquérir de nouvelles compétences. Nous voulons que nos 
                utilisateurs n'aient plus besoin d'être qualifiés ou de parcourir de longues distances 
                pour apprendre. Grâce à un simple clic, un 'yaya' (mentor) sera à leur disposition, prêt 
                à les accompagner dans leur parcours d'apprentissage. Notre vision est de toucher chaque 
                individu et de créer une chaîne continue d'apprentissage, où ceux qui apprennent aujourd'hui 
                pourront enseigner à d'autres demain
                </Typography>
            </Container>
        </Container>
    )
}