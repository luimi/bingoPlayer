import { IonCol, IonGrid, IonIcon, IonRow, useIonRouter } from "@ionic/react";
import React from "react";
import { setCurrentGameMode } from "../../utils/BingoController";
import { useBingoContext } from "../../contexts/BingoContext";
import { add } from "ionicons/icons";
import GameMode from "../GameMode";
import ItemNew from "../ItemNew";

interface ComponentProps { }
const GameModes: React.FC<ComponentProps> = () => {
    const { gameModes, gameMode }: { gameModes: any[], gameMode: string } = useBingoContext();
    const router = useIonRouter();
    return (
        <IonGrid>
            <IonRow>
                {gameModes.map((_gameMode, index) => {
                    return (
                        <IonCol key={index} size="auto" className={`ion-text-center ${_gameMode.name === gameMode ? 'active': ''}`} onClick={() => setCurrentGameMode(_gameMode.name)}>
                            <GameMode title={_gameMode.title} sketch={_gameMode.sketch} active={_gameMode.name === gameMode}/>
                        </IonCol>
                    );
                })}
                <IonCol size="12" className="ion-text-center">
                    <ItemNew description="Modo de juego" buttons={[{icon: <IonIcon icon={add}/>, action: () => router.push('/new-sketch')}]} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default GameModes;