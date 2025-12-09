import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner, useIonAlert, useIonRouter, useIonToast } from "@ionic/react";
import { useBingoContext } from "../contexts/BingoContext";
import { Link } from "react-router-dom";
import { add, addCircleOutline, camera, informationCircle, warningOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { setCard, setCards } from "../utils/BingoController";
import MiniBingoCard from "./MiniBingoCard";
import ItemNew from "./ItemNew";
import '../utils/I18n';
import { useTranslation } from "react-i18next";
import { gaEvent } from "../utils/analytics";
import Scan from "./Scan";
import { getScan, getStatus } from "../utils/serverController";
import CropModal from "./Crop";
import { InterstitialAd } from "@capgo/capacitor-admob";
import { Capacitor } from "@capacitor/core";

interface ComponentProps { }
const BingoCards: React.FC<ComponentProps> = () => {
    const { cards, numbers, order }: { cards: Array<Array<Array<number>>>, numbers: Array<number>, order: any } = useBingoContext();
    const { t } = useTranslation();
    const [present] = useIonToast();
    const scanRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useIonRouter();

    const resolveScan = async (e: any) => {
        setLoading(true);

        const newCards = await getScan(e)

        setLoading(false);
        if (newCards && newCards.success) {
            setCards(newCards.data)
            gaEvent(`scan-${newCards.length}`)
            showAd();
        } else {
            present({
                message: t("bingoCards.error.cardsWithAI"),
                duration: 5000,
                position: 'top',
                color: 'danger',
                icon: warningOutline
            })
        }
    }

    const showAd = async () => {
        const platform = Capacitor.getPlatform();
        const interstitial = new InterstitialAd({
            adUnitId: platform === 'ios' ? 'ca-app-pub-6931890428485350/6401003805' : 'ca-app-pub-6931890428485350/6644438586',
        });
        await interstitial.load();
        await interstitial.show();
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
                    <ItemNew description={t("bingoCards.cards")} buttons={[
                        {
                            icon: <IonIcon icon={add} />,
                            action: () => router.push("/card")
                        },
                        {
                            icon: <>{loading ? <IonSpinner></IonSpinner> : <IonIcon icon={camera} />}</>,
                            action: async () => {
                                try {
                                    const result = await getStatus()
                                    if (result.status) scanRef.current?.click()
                                    else present({
                                        message: t("bingoCards.error.unavailable"),
                                        duration: 5000,
                                        position: 'top',
                                        color: 'warning',
                                        icon: informationCircle
                                    })
                                } catch (e) {
                                    present({
                                        message: t("bingoCards.error.server"),
                                        duration: 5000,
                                        position: 'top',
                                        color: 'warning',
                                        icon: informationCircle
                                    })
                                }


                            }
                        }
                    ]} />

                </IonCol>
            </IonRow>
            <input type="file" accept="image/*" className="ion-hide" ref={scanRef} capture="environment" onChange={resolveScan} />
        </IonGrid>
    );
};

export default BingoCards;