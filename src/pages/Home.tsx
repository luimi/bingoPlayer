import { IonContent, IonIcon, IonModal, IonPage, useIonModal } from '@ionic/react';
import OptionWrapper from '../components/OptionWrapper';
import { close, pencil, refresh, trash } from 'ionicons/icons';
import NumberBoardMini from '../components/NumberBoardMini';
import GameModes from '../components/GameModes';
import { clearCards, clearNumbers, setNumber } from '../utils/BingoController';
import { Link } from 'react-router-dom';
import BingoCards from '../components/BingoCards';
import SectionWrapper from '../components/SectionWrapper';
import logo from '../assets/logo-banner.png';
import { useTranslation } from 'react-i18next';
import '../utils/I18n';
import { gaEvent } from '../utils/analytics';
import Welcome from '../components/Welcome';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isEditingGameModes, setIsEditingGameModes] = useState(false)
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem("welcome")) {
      setIsWelcomeOpen(true)
    }
  }, [])
  const dismiss = () => {
    setIsWelcomeOpen(false)
  }
  return (
    <IonPage>
      <IonContent>
        <img className="logo" src={logo}/>
        {/* CARTONES */}
        <SectionWrapper title={t('home.cards.title')} actionTitle={t('home.cards.button')} icon={<IonIcon icon={trash} />} action={() => {
          gaEvent("clear-cards")
          clearCards()
        }}>
          <BingoCards />
        </SectionWrapper>

        {/* TIPOS DE JUEGO */}
        <SectionWrapper title={t('home.gameMode.title')} actionTitle={t('home.gameMode.button')} icon={<IonIcon icon={isEditingGameModes ? close : pencil} />} action={() => {
          setIsEditingGameModes(!isEditingGameModes)
        }}>
          <GameModes isEditing={isEditingGameModes} />
        </SectionWrapper>

        {/* JUEGO ACTUAL */}
        <SectionWrapper title={t('home.currentGame.title')} actionTitle={t('home.currentGame.button')} icon={<IonIcon icon={refresh} />} action={() => {
          gaEvent("clear-numbers")
          clearNumbers()
        }}>
          <Link to="/numbers">
            <NumberBoardMini />
          </Link>
        </SectionWrapper>
        
        <Welcome dismiss={dismiss} isOpen={isWelcomeOpen}/>

      </IonContent>

    </IonPage>
  );
};

export default Home;
