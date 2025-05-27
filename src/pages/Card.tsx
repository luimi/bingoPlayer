import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonIcon, IonPage, IonRow, useIonRouter } from "@ionic/react";
import { add, arrowBack, headset, navigate, pencil, saveOutline, trashBin } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getCard, removeCard, setCard, setNumber, unsetNumber } from "../utils/BingoController";
import { RouteComponentProps } from "react-router";
import { useBingoContext } from "../contexts/BingoContext";
import BingoCard from "../components/BingoCard";
import logo from '../assets/logo-banner.png';

interface ComponentProps extends RouteComponentProps<{ index?: string; }> { }
const Card: React.FC<ComponentProps> = ({ match }) => {
    const router = useIonRouter();
    const { numbers } = useBingoContext();
    const [sketch, setSketch] = useState([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
    const [isNew, setIsNew] = useState(true)
    const [isEditing, setIsEditing] = useState(true)
    const [cardIndex, setCardIndex] = useState(-1)

    useEffect(() => {
        if (match.params.index) {
            setIsNew(false)
            setIsEditing(false)
            setSketch(getCard(parseInt(match.params.index)))
            setCardIndex(parseInt(match.params.index))
        }
    }, [])
    return (
        <IonPage>
            <IonContent>
                <img className="logo ion-margin-vertical" src={logo}/>
                <BingoCard sketch={sketch} numbers={numbers} isEditing={isEditing} setNumber={setNumber} unsetNumber={unsetNumber} setSketch={setSketch} />
            </IonContent>
            <IonFooter>
                <IonGrid>
                    <IonRow className="ion-text-center">
                        {!isNew && <IonCol>
                            <IonFab horizontal="center">
                                <IonFabButton color="danger" onClick={() => {
                                    removeCard(cardIndex)
                                    router.goBack()
                                }}>
                                    <IonIcon icon={trashBin}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                        </IonCol>}
                        {isEditing && <IonCol>
                            <IonFab horizontal="center">
                                <IonFabButton color="primary" onClick={() => {
                                setCard(sketch, isNew ? undefined : cardIndex)
                                if (isNew) router.goBack()
                                setIsEditing(false)
                            }}>
                                    <IonIcon icon={saveOutline}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                        </IonCol>}
                        {!isEditing && <IonCol>
                            <IonFab horizontal="center">
                                <IonFabButton color="primary" onClick={() => setIsEditing(true)}>
                                    <IonIcon icon={pencil}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                        </IonCol>}
                        <IonCol style={{height: '70px'}} >
                            <IonFab horizontal="center">
                                <IonFabButton  color="warning" onClick={() => router.goBack()}>
                                    <IonIcon icon={arrowBack}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Card;