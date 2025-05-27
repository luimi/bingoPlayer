import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner, useIonAlert, useIonRouter, useIonToast } from "@ionic/react";
import { useBingoContext } from "../contexts/BingoContext";
import { Link } from "react-router-dom";
import { add, addCircleOutline, camera } from "ionicons/icons";
import { useRef, useState } from "react";
import { getCardsWithIA } from "../utils/Gemini";
import { setCard, setCards } from "../utils/BingoController";
import MiniBingoCard from "./MiniBingoCard";
import ItemNew from "./ItemNew";

interface ComponentProps { }
const BingoCards: React.FC<ComponentProps> = () => {
    const { cards, numbers, order }: { cards: Array<Array<Array<number>>>, numbers: Array<number>, order: any } = useBingoContext();
    const [present] = useIonToast();
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useIonRouter();
    const handleInputChange = async (e: any) => {
        setLoading(true)
        const newCards = await getCardsWithIA(e)
        setLoading(false)
        if (newCards && newCards.length > 0) {
            setCards(newCards)
        } else {
            present({
                message: 'No se pudo procesar la información de los cartones',
                duration: 3000,
                position: 'top',
                color: 'danger',
            })
        }
    }
    return (
        <IonGrid>
            <IonRow>
                {cards.length > 0 && order.map((index: number) => (
                    <IonCol size="4" className="ion-text-center" key={index}>
                        <Link to={`/card/${index}`}>
                            <MiniBingoCard card={cards[index]} numbers={numbers} />
                        </Link>
                    </IonCol>
                ))}
                <IonCol size="12" className="ion-text-center">
                    <ItemNew description="Carton/es" buttons={[{ icon: <IonIcon icon={add} />, action: () => router.push("/card") }, {
                        icon: <>{loading ? <IonSpinner></IonSpinner> : <IonIcon icon={camera} />}</>, action: () => {
                            if (!loading) inputFileRef.current?.click()
                        }
                    }]} />
                    <input type="file" className="ion-hide" ref={inputFileRef} capture="environment" onChange={handleInputChange} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default BingoCards;