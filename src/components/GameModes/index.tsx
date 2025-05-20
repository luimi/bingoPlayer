import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import React, { use } from "react";
import GameModeMini from "../GameModeMini";
import { setCurrentGameMode } from "../../utils/BingoController";
import { useBingoContext } from "../../contexts/BingoContext";
import { addCircleOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

interface ComponentProps { }
const GameModes: React.FC<ComponentProps> = () => {
    const { gameModes, gameMode }: { gameModes: any[], gameMode: string } = useBingoContext();
    return (
        <IonGrid>
            <IonRow>
                {gameModes.map((_gameMode, index) => {
                    return (
                        <IonCol key={index} size="auto" className={`ion-text-center ${_gameMode.name === gameMode ? 'active': ''}`} onClick={() => setCurrentGameMode(_gameMode.name)}>
                            <div>{_gameMode.title}</div>
                            <GameModeMini sketch={_gameMode.sketch} />
                        </IonCol>
                    );
                })}
                <IonCol size="auto" className="ion-text-center">
                    <Link to="/new-sketch">
                        <div>Nuevo</div>
                        <IonIcon icon={addCircleOutline} size="large" color="primary" className="ion-padding-vertical" />
                    </Link>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default GameModes;