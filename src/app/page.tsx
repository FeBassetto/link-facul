"use client";
import { Button, Container, Input, RoomContainer } from "@/styles/page.styles";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter()

  const [page, setPage] = useState('')

  const redirectToAnotherPage = () => {
    if (page) {
      router.push(`/${page}`);
    }
  };

  return (
    <Container>
      <h1>Digite o nome da sala</h1>
      <RoomContainer>
        <Input value={page} onChange={e => setPage(e.target.value)} />
        <Button onClick={redirectToAnotherPage}>Ir para sala</Button>
      </RoomContainer>
    </Container>
  )
}
