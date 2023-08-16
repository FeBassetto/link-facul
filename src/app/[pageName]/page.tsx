'use client'
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

interface ContentPageProps {
    params: {
        pageName: string;
    };
}

interface IMessages {
    content: string
    created_at: {
        seconds: number,
        nanoseconds: number
    }
    roomname: string
}

const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #000;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MessagesList = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding: 10px;
  color: #333;
`;

const NewMessageContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const NewMessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NewMessageButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BackButton = styled(Link)`
  display: block;
  margin-bottom: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
`;



export default function ContentPage({ params }: ContentPageProps) {
    const [messages, setMessages] = useState<IMessages[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const messagesListRef = useRef<HTMLDivElement>(null);

    const fetchMessages = useCallback(() => {
        axiosInstance
            .get(`/api/get-room-content?nameRoom=${params.pageName}`)
            .then((res) => {
                const sortedMessages = res.data.sort((a: IMessages, b: IMessages) =>
                    a.created_at.seconds < b.created_at.seconds ? -1 : 1
                );
                setMessages(sortedMessages);
            });
    }, [params.pageName]);


    useEffect(() => {
        fetchMessages();
    }, [fetchMessages, params.pageName]);

    useEffect(() => {
        messagesListRef.current?.scrollTo(0, messagesListRef.current.scrollHeight);
    }, [messages]);

    const sendMessage = () => {
        if (newMessage) {
            axiosInstance
                .post("/api/send-content", {
                    roomName: params.pageName,
                    content: newMessage,
                })
                .then(() => {
                    fetchMessages();
                    setNewMessage("");
                });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <FullPageContainer>
            <ChatContainer>
                <BackButton href="/">{`< Voltar`}</BackButton>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Chat Room: {params.pageName}
                </h1>
                <MessagesList ref={messagesListRef}>
                    {messages.map((message) => (
                        <MessageContainer key={message.created_at.nanoseconds}>
                            <p>{message.content}</p>
                        </MessageContainer>
                    ))}
                </MessagesList>
                <NewMessageContainer>
                    <NewMessageInput
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <NewMessageButton onClick={sendMessage}>Enviar</NewMessageButton>
                </NewMessageContainer>
            </ChatContainer>
        </FullPageContainer>
    );
}
