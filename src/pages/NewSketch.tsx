import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonAlert, useIonRouter, useIonToast } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { setGameMode } from "../utils/BingoController";
import InputGroup from "../components/InputGroup";
import Sketch from "../components/Sketch";
import ButtonAccent from "../components/ButtonAccent";
import { useTranslation } from "react-i18next";
import '../utils/I18n';
import { gaEvent } from "../utils/analytics";

interface ComponentProps { }
const NewSketch: React.FC<ComponentProps> = () => {
    const router = useIonRouter();
    const { t } = useTranslation();
    const [pattern, setPatern] = React.useState({
        name: '',
        title: '',
        sketch: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    })
    const [present] = useIonToast();

    const save = () => {
        if (pattern.name.trim() === '') {
            present({
                message: t("newSketch.error.name"),
                duration: 3000,
                position: 'top',
                color: 'danger',
            })
            return;
        }
        if (setGameMode(pattern, t)) {
            gaEvent("new-game-mode")
            router.goBack()
        } else present({
            message: t("newSketch.error.exists"),
            duration: 3000,
            position: 'top',
            color: 'danger',
        })
    }
    return (
        <IonPage>
            <IonContent>
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton color="warning" onClick={() => router.goBack()}>
                        <IonIcon icon={arrowBack} ></IonIcon>
                    </IonFabButton>
                </IonFab>
                <div className="ion-padding">
                    <h1>{t("newSketch.title")}</h1>
                    <InputGroup title={t('newSketch.name')} onChange={(e: any) => setPatern({ ...pattern, name: e.target.value + '', title: e.target.value + '' })} />
                    <h2>{t("newSketch.template")}</h2>
                    <Sketch pattern={pattern} setPatern={setPatern} />
                    <ButtonAccent text={t("newSketch.save")} action={save} />
                </div>

            </IonContent>
            <IonFooter></IonFooter>
        </IonPage>
    );
};

export default NewSketch;