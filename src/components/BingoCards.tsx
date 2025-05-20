import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner, useIonAlert } from "@ionic/react";
import { useBingoContext } from "../contexts/BingoContext";
import { Link } from "react-router-dom";
import { addCircleOutline, camera } from "ionicons/icons";
import { useRef, useState } from "react";
import { getCardsWithIA } from "../utils/Gemini";
import { setCard, setCards } from "../utils/BingoController";

interface ComponentProps { }
const BingoCards: React.FC<ComponentProps> = () => {
    const { cards, numbers, order }: { cards: Array<Array<Array<number>>>, numbers: Array<number>, order: any } = useBingoContext();
    const [presentAlert] = useIonAlert();
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const handleInputChange = async (e: any) => {
        setLoading(true)
        const newCards = await getCardsWithIA(e)
        setLoading(false)
        if (newCards && newCards.length > 0) {
            setCards(newCards)
        } else {
            presentAlert({
                header: 'Error',
                message: 'No se pudo procesar la informacion de los cartones'
            })
        }
    }
    return (
        <IonGrid>
            <IonRow>
                {cards.length > 0 && order.map((index: number) => (
                    <IonCol size="auto" className="ion-text-center" key={index}>
                        <Link to={`/card/${index}`}>

                            
                            <table id="card">
                                <tr>
                                    <th>B</th>
                                    <th>I</th>
                                    <th>N</th>
                                    <th>G</th>
                                    <th>O</th>
                                </tr>
                                <tbody>
                                    {cards[index].map((row, rIndex) => (
                                        <tr key={`row${rIndex}`}>
                                            {row.map((cell, cIndex) => (
                                                <td key={`cell${rIndex}${cIndex}`} className={`${numbers.includes(cell) ? 'selected' : ''}`}>{cell !== 0 ? cell : ''}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Link>
                    </IonCol>
                ))}
                <IonCol size="auto" className="ion-text-center">
                    <Link to="/card">
                        <div>Nuevo</div>
                        <IonIcon icon={addCircleOutline} size="large" color="primary" className="ion-padding-vertical" />
                    </Link>
                </IonCol>
                <IonCol size="auto" className="ion-text-center" onClick={() => {
                    if (!loading) inputFileRef.current?.click()
                }}>
                    <div>Nuevo/s</div>
                    {loading ? <IonSpinner></IonSpinner> : <IonIcon icon={camera} size="large" color="primary" className="ion-padding-vertical" />}
                    <input type="file" className="ion-hide" ref={inputFileRef} capture="environment" onChange={handleInputChange} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default BingoCards;