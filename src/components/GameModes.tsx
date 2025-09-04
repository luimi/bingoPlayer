import { IonCol, IonGrid, IonIcon, IonRow, useIonRouter } from "@ionic/react";
import React from "react";
import { removeGameMode, setCurrentGameMode } from "../utils/BingoController";
import { useBingoContext } from "../contexts/BingoContext";
import { add } from "ionicons/icons";
import GameMode from "./GameMode";
import ItemNew from "./ItemNew";
import { useTranslation } from "react-i18next";
import '../utils/I18n';

interface ComponentProps { 
    isEditing: boolean;
}
const GameModes: React.FC<ComponentProps> = ({isEditing}) => {
    const { gameModes, gameMode }: { gameModes: any[], gameMode: string } = useBingoContext();
    const { t } = useTranslation();
    const router = useIonRouter();
    return (
        <IonGrid>
            <IonRow>
                {gameModes.map((_gameMode, index) => {
                    return (
                        <IonCol key={index} size="auto" className={`ion-text-center ${_gameMode.name === gameMode ? 'active': ''}`} onClick={() => {
                            if(isEditing) {
                                removeGameMode(_gameMode, t)
                            } else {
                                setCurrentGameMode(_gameMode.name)
                            }
                        }}>
                            <GameMode title={_gameMode.title} sketch={_gameMode.sketch} active={_gameMode.name === gameMode} isEditing={_gameMode.isDefault? false : isEditing}/>
                        </IonCol>
                    );
                })}
                <IonCol size="12" className="ion-text-center">
                    <ItemNew description={t("gameModeMini.gameMode")} buttons={[{icon: <IonIcon icon={add}/>, action: () => router.push('/new-sketch')}]} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default GameModes;