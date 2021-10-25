import { FormEvent, useCallback, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import { AuthContext } from '../../contexts/Auth';
import { nlwHeatApi } from '../../services/nlwHeatApi';

import styles from './styles.module.scss';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    const text = message.trim();

    if (!text.length) {
      return;
    }

    setIsSubmiting(true);

    try {
      await nlwHeatApi.post('/messages', { text });

      setMessage('');
    } catch (error) {
      // TODO: Tratar o erro
    } finally {
      setIsSubmiting(false);
    }
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    sendMessage(message);
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong>{user?.name}</strong>
        <span>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          disabled={isSubmiting}
        />
        <button
          type="submit"
          disabled={isSubmiting || !message.trim().length}
        >
          Enviar mensagem
        </button>
      </form>
    </div>
  );
}
