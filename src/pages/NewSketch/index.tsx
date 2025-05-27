import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonAlert, useIonRouter, useIonToast } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { setGameMode } from "../../utils/BingoController";
import InputGroup from "../../components/InputGroup";
import Sketch from "../../components/Sketch";
import ButtonAccent from "../../components/ButtonAccent";

interface ComponentProps { }
const NewSketch: React.FC<ComponentProps> = () => {
    const router = useIonRouter();
    const [pattern, setPatern] = React.useState({
        name: '',
        title: '',
        sketch: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    })
    const [present] = useIonToast();

    const save = () => {
        if (pattern.name.trim() === '') {
            present({
                message: "Debes ingresar un nombre",
                duration: 3000,
                position: 'top',
                color: 'danger',
            })
            return;
        }
        if (setGameMode(pattern)) router.goBack()
        else present({
                message:  "Ya existe un modo de juego con ese nombre",
                duration: 3000,
                position: 'top',
                color: 'danger',
            })
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton color="warning" onClick={() => router.goBack()}>
                        <IonIcon icon={arrowBack} ></IonIcon>
                    </IonFabButton>
                </IonFab>
                <h1>Nuevo Modo De Juego</h1>
                <InputGroup title="Nombre" onChange={(e: any) => setPatern({ ...pattern, name: e.target.value + '', title: e.target.value + '' })} />
                <h2>Casillas</h2>
                <Sketch pattern={pattern} setPatern={setPatern} />
                <ButtonAccent text="Guardar" action={save} />

            </IonContent>
        </IonPage>
    );
};

export default NewSketch;