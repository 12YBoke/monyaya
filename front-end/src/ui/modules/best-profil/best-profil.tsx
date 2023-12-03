import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Rekreation from '../../../../public/rekreatioon.jpg'
import Image from "next/image"

export const BestProfil = () => {
  let t = [
    {id:1, nom: 'Yves Boke', domains: [{id: 1, name: 'Mathematique'}, {id: 2, name: 'Geopolitique'}, {id:3, name: 'HTML'}]},
    {id:2, nom: 'Divine Ifuwa', domains: [{id: 1, name: 'Mathematique'}, {id: 2, name: 'Geopolitique'}, {id:3, name: 'HTML'}]},
    {id:3, nom: 'Marel Limaya', domains: [{id: 1, name: 'Mathematique'}, {id: 2, name: 'Geopolitique'}, {id: 4, name: 'Javascript'}]},
    {id:4, nom: 'Nathan Boke', domains: [{id: 1, name: '1'}, {id:3, name: '2'}, {id: 4, name: '3'}]},
    {id:5, nom: 'Chuck Norris', domains: [{id: 1, name: '1'}, {id:3, name: '2'}, {id: 4, name: '3'}]},
  ]
  return (
    <Container className="block overflow-hidden py-8 px-4 md:px-8 md:py-8 bg-white">
      <Container className="">
        <Typography variant="title-lg" component="h2">Nos meilleurs formateurs</Typography>
      </Container>
      <br/>
      <Container className="overflow-auto flex flex-row gap-4 md:gap-8">
      {
        t.map(x => 
          <Container key={x.id} className="basis-1/5 cursor-pointer flex flex-col px-4 py-4 md:px-4 md:py-4 bg-white gap-2 md:gap-4 items-center rounded border-secondary-100 border-[1px]">
            <Container className="h-[150px] w-[150px] md:h-[180px] md:w-[180px] bg-primary-50 rounded-full overflow-hidden flex justify-center items-center">
              <Image src={Rekreation} alt="rekreatioon logo" className="h-full w-full"/>
            </Container>
            <Container className="flex flex-col items-center">
              <Typography variant="body-base" className="font-bold" component="h3">{x.nom}</Typography>
            </Container>
            {/* <Container className="text-center">
                {
                  x.domains.map(domain =>
                    <Typography key={domain.id} variant="body-base" component="p" className="text-secondary-Default">
                      {domain.name}
                    </Typography>
                  )
                }
            </Container> */}
            <Container className="flex flex-row gap-4">
              <Buttons width="sm" variant="primary" >Voir profil</Buttons>
            </Container>
          </Container>
        )
      }
      </Container>
    </Container>
    
  )
}