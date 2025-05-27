import { IonContent, IonIcon, IonPage } from '@ionic/react';
import OptionWrapper from '../components/OptionWrapper';
import { refresh, trash } from 'ionicons/icons';
import NumberBoardMini from '../components/NumberBoardMini';
import GameModes from '../components/GameModes';
import { clearCards, clearNumbers, setNumber } from '../utils/BingoController';
import { Link } from 'react-router-dom';
import BingoCards from '../components/BingoCards';
import SectionWrapper from '../components/SectionWrapper';
import logo from '../assets/logo-banner.png';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>

        <img className="logo" src={logo}/>
        {/* CARTONES */}
        <SectionWrapper title="Cartones" actionTitle='Borrar' icon={<IonIcon icon={trash}/>} action={() => {
          clearCards()
        }}>
          <BingoCards />
        </SectionWrapper>

        {/* TIPOS DE JUEGO */}
        <SectionWrapper  title="Modo de juego">
          <GameModes  />
        </SectionWrapper>

        {/* JUEGO ACTUAL */}
        <SectionWrapper  title="Juego Actual" actionTitle='Reiniciar' icon={<IonIcon icon={refresh}/>} action={() => {
          clearNumbers()
        }}>
          <Link to="/numbers">
            <NumberBoardMini />
          </Link>
        </SectionWrapper>
        
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
