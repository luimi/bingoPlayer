import { IonContent, IonPage } from '@ionic/react';
import OptionWrapper from '../components/OptionWrapper';
import { refresh, trash } from 'ionicons/icons';
import NumberBoardMini from '../components/NumberBoardMini';
import GameModes from '../components/GameModes';
import { clearCards, clearNumbers, setNumber } from '../utils/BingoController';
import { Link } from 'react-router-dom';
import BingoCards from '../components/BingoCards';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <OptionWrapper title="Juego Actual" actionTitle='Reiniciar' icon={refresh} action={() => {
          clearNumbers()
        }}>
          <Link to="/numbers">
            <NumberBoardMini />
          </Link>
        </OptionWrapper>
        <OptionWrapper title="Modo de juego">
          <GameModes  />
        </OptionWrapper>
        <OptionWrapper title="Cartones" actionTitle='Borrar' icon={trash} action={() => {
          clearCards()
        }}>
          <BingoCards />
        </OptionWrapper>
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
