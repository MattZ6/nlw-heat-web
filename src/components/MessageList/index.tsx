import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2K21" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p>
          Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImageContainer}>
              <img src="https://github.com/mattz6.png" alt="Matheus Felipe Zanin" />
            </div>
            <span>Matheus Felipe Zanin</span>
          </div>
        </li>
        <li className={styles.message}>
          <p>
          Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImageContainer}>
              <img src="https://github.com/mattz6.png" alt="Matheus Felipe Zanin" />
            </div>
            <span>Matheus Felipe Zanin</span>
          </div>
        </li>
        <li className={styles.message}>
          <p>
          Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImageContainer}>
              <img src="https://github.com/mattz6.png" alt="Matheus Felipe Zanin" />
            </div>
            <span>Matheus Felipe Zanin</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
