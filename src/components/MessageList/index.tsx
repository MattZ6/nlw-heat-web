import { useEffect, useState } from 'react';

import { nlwHeatApi } from '../../services/nlwHeatApi';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

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

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

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
