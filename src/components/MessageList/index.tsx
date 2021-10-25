import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { nlwHeatApi } from '../../services/nlwHeatApi';

import logoImg from '../../assets/logo.svg';

import styles from './styles.module.scss';

type MessageUser = {
  id: string;
  name: string;
  avatar_url: string;
}

type Message = {
  id: string;
  text: string;
  created_at: Date;
  user: MessageUser;
}

const socket = io('http://localhost:3333');

const messagesQueue: Message[] = [];

socket.on('new_message', message => {
  messagesQueue.push(message);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean));

        messagesQueue.shift();
      }
    }, 3_000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    async function loadLastThreeMessages() {
      try {
        const { data } = await nlwHeatApi.get<Message[]>('/messages/last');

        setMessages(data);
      } catch (error) {
        // TODO: Tratar os erros
      }
    }

    loadLastThreeMessages();
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2K21" />

      <ul className={styles.messageList}>
        { messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImageContainer}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
}
