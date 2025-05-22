import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonAlert, useIonRouter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { setGameMode } from "../../utils/BingoController";

interface ComponentProps { }
const NewSketch: React.FC<ComponentProps> = () => {
    const router = useIonRouter();
    const [pattern, setPatern] = React.useState({
        name: '',
        title: '',
        sketch: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    })
    const [presentAlert] = useIonAlert();

    const save = () => {
        if (pattern.name.trim() === '') {
            presentAlert({
                header: "Error",
                message: "Debes ingresar un nombre"
            })
            return;
        }
        if (setGameMode(pattern)) router.goBack()
        else presentAlert({
            header: "Error",
            message: "Existe ya un modo de juego con este nombre"
        })
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton onClick={() => router.goBack()}>
                        <IonIcon icon={arrowBack} ></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonItem lines="none">
                    <IonLabel>Nuevo Patron</IonLabel>
                </IonItem>
                <IonItem>
                    <IonInput label="Nombre" labelPlacement="stacked" placeholder="Escribe aquí" type="text" onIonInput={(e) => setPatern({ ...pattern, name: e.target.value + '', title: e.target.value + '' })}></IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>Casillas</IonLabel>
                </IonItem>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="auto">
                            <table id="sketch">
                                <tr>
                                    <th>B</th>
                                    <th>I</th>
                                    <th>N</th>
                                    <th>G</th>
                                    <th>O</th>
                                </tr>
                                <tbody>
                                    {pattern.sketch.map((row, rIndex) => (
                                        <tr key={`row${rIndex}`}>
                                            {row.map((cell, cIndex) => (
                                                <td key={`cell${rIndex}${cIndex}`} className={`${cell === 1 ? 'selected' : ''}`} onClick={() => {
                                                    let copy = [...pattern.sketch]
                                                    copy[rIndex][cIndex] = copy[rIndex][cIndex] === 0 ? 1 : 0;
                                                    setPatern({ ...pattern, sketch: copy })
                                                }}></td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton expand="block" onClick={save}>Guardar</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default NewSketch;