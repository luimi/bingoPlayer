import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useBingoContext } from "../../contexts/BingoContext";
import './styles.scss';
import { setNumber, unsetNumber } from "../../utils/BingoController";
import { Link } from "react-router-dom";
import GameModeMini from "../../components/GameModeMini";
import NumberGroup from "../../components/NumberGroup";
import GameMode from "../../components/GameMode";
import MiniBingoCard from "../../components/MiniBingoCard";
import logo from '../../assets/logo-banner.png';

interface ComponentProps { }
const Numbers: React.FC<ComponentProps> = () => {
   const router = useIonRouter();
   const { cards, numbers, order, gameMode, gameModes}: any = useBingoContext();
   const numberArray = Array.from({ length: 75 }, (_, i) => i + 1);
   const currentGameMode = gameModes.find((mode: any) => mode.name === gameMode);
   return (
      <IonPage>
         <IonContent>
            <img className="logo" src={logo}/>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
               <IonFabButton color="warning" onClick={() => router.goBack()}>
                  <IonIcon icon={arrowBack} ></IonIcon>
               </IonFabButton>
            </IonFab>
            <NumberGroup letter="B" from={1} to={15} numbers={numbers} setNumber={setNumber} unsetNumber={unsetNumber}/>
            <NumberGroup letter="I" from={16} to={30} numbers={numbers} setNumber={setNumber} unsetNumber={unsetNumber}/>
            <NumberGroup letter="N" from={31} to={45} numbers={numbers} setNumber={setNumber} unsetNumber={unsetNumber}/>
            <NumberGroup letter="G" from={46} to={60} numbers={numbers} setNumber={setNumber} unsetNumber={unsetNumber}/>
            <NumberGroup letter="O" from={61} to={75} numbers={numbers} setNumber={setNumber} unsetNumber={unsetNumber}/>
            <div className="ion-padding ion-margin"/>
            <div className="ion-padding ion-margin"/>
         </IonContent>
         <IonFooter>
            <IonGrid style={{overflow: "scroll"}}>
               <IonRow className="ion-nowrap">
                  <IonCol size="auto">
                     <GameMode title={currentGameMode.title} sketch={currentGameMode.sketch} active={true}/>
                  </IonCol>
                  {order.map((index: number) => (
                     <IonCol size="auto" className="ion-text-center" key={index}>
                        <Link to={`/card/${index}`}>
                           <MiniBingoCard card={cards[index]} numbers={numbers} showHeaders={false} />
                        </Link>
                     </IonCol>
                  ))}
               </IonRow>
            </IonGrid>
         </IonFooter>
      </IonPage>
   );
};

export default Numbers;