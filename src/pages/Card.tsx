import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonPage, IonRow, useIonRouter } from "@ionic/react";
import { arrowBack, navigate, pencil, saveOutline, trashBin } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getCard, removeCard, setCard, setNumber, unsetNumber } from "../utils/BingoController";
import { RouteComponentProps } from "react-router";
import { useBingoContext } from "../contexts/BingoContext";

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
            <IonContent className="ion-padding">
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
                                    {sketch.map((row, rIndex) => (
                                        <tr key={`row${rIndex}`}>
                                            {row.map((cell, cIndex) => (
                                                <td key={`cell${rIndex}${cIndex}`} className={`${numbers.includes(cell) ? 'selected' : ''}`} onClick={() => {
                                                    if (cell === 0 || isEditing) return;
                                                    if (numbers.includes(cell)) {
                                                        unsetNumber(cell)
                                                    } else {
                                                        setNumber(cell)
                                                    }
                                                }}>
                                                    {isEditing && <input type="number" min="0" max="75" style={{ all: 'unset', width: '55px' }} value={sketch[rIndex][cIndex]}
                                                        onChange={(e) => {
                                                            if (isNaN(parseInt(e.target.value))) return
                                                            let copy = [...sketch]
                                                            copy[rIndex][cIndex] = parseInt(e.target.value)
                                                            setSketch(copy)
                                                        }}
                                                        onFocus={(e) => e.target.select()} />}
                                                    {!isEditing && cell !== 0 ? cell : ''}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonGrid>
                    <IonRow className="ion-text-center">
                        {!isNew && <IonCol>
                            <IonButton fill="clear" onClick={() => {
                                removeCard(cardIndex)
                                router.goBack()
                            }}>
                                <IonIcon icon={trashBin} size="large"></IonIcon>
                            </IonButton>
                        </IonCol>}
                        {isEditing && <IonCol>
                            <IonButton fill="clear" onClick={() => {
                                setCard(sketch, isNew ? undefined : cardIndex)
                                if (isNew) router.goBack()
                                setIsEditing(false)
                            }}>
                                <IonIcon icon={saveOutline} size="large"></IonIcon>
                            </IonButton>
                        </IonCol>}
                        {!isEditing && <IonCol>
                            <IonButton fill="clear" onClick={() => setIsEditing(true)}>
                                <IonIcon icon={pencil} size="large"></IonIcon>
                            </IonButton>
                        </IonCol>}
                        <IonCol>
                            <IonButton fill="clear" onClick={() => router.goBack()}>
                                <IonIcon icon={arrowBack} size="large"></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Card;