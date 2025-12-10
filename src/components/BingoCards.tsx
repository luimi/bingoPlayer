import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner, useIonAlert, useIonRouter, useIonToast } from "@ionic/react";
import { useBingoContext } from "../contexts/BingoContext";
import { Link } from "react-router-dom";
import { add, addCircleOutline, camera, informationCircle, warningOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { setCard, setCards } from "../utils/BingoController";
import MiniBingoCard from "./MiniBingoCard";
import ItemNew from "./ItemNew";
import '../utils/I18n';
import { useTranslation } from "react-i18next";
import { gaEvent } from "../utils/analytics";
import Scan from "./Scan";
import { getScan, getStatus as getServerStatus } from "../utils/serverController";
import CropModal from "./Crop";
import { InterstitialAd } from "@capgo/capacitor-admob";
import { Capacitor } from "@capacitor/core";
import { KeepAwake } from '@capacitor-community/keep-awake';
import Tips from "./Tips";

interface ComponentProps { }
const BingoCards: React.FC<ComponentProps> = () => {
    const { cards, numbers, order }: { cards: Array<Array<Array<number>>>, numbers: Array<number>, order: any } = useBingoContext();
    const { t } = useTranslation();
    const [present] = useIonToast();
    const scanRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<any>(null)
    const [showTips, setShowTips] = useState<boolean>(false)
    const router = useIonRouter();

    useEffect(() => {
        getStatus()
    }, [])

    const resolveScan = async (e: any) => {
        setLoading(true);
        let newCards : any;
        await KeepAwake.keepAwake();

        try {
            newCards = await getScan(e);
        }catch (e) {}
        
        await KeepAwake.allowSleep();
        setLoading(false);
        if (newCards && newCards.success) {
            setCards(newCards.data)
            gaEvent(`scan-${newCards.length}`)
            showAd();
            getStatus();
        } else {
            setShowTips(true)
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

    const getStatus = async () => {
        if (loading) return;
        setLoading(true);
        try {
            setStatus(await getServerStatus());
        } catch (e) { }
        setLoading(false);
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
                            action: () => {
                                if (loading) return;
                                if (status && status.status) {
                                    scanRef.current?.click();
                                } else if (status && !status.status) {
                                    present({
                                        message: t("bingoCards.error.unavailable"),
                                        duration: 5000,
                                        position: 'top',
                                        color: 'warning',
                                        icon: informationCircle
                                    });
                                } else {
                                    present({
                                        message: t("bingoCards.error.server"),
                                        duration: 5000,
                                        position: 'top',
                                        color: 'warning',
                                        icon: informationCircle
                                    });
                                    getStatus()
                                }
                            }
                        }
                    ]} />

                </IonCol>
            </IonRow>
            <input type="file" accept="image/*" className="ion-hide" ref={scanRef} capture="environment" onChange={resolveScan} />
            <Tips isOpen={showTips} dismiss={() => setShowTips(false)} />
        </IonGrid>
    );
};

export default BingoCards;