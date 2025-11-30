import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner, useIonAlert, useIonRouter, useIonToast } from "@ionic/react";
import { useBingoContext } from "../contexts/BingoContext";
import { Link } from "react-router-dom";
import { add, addCircleOutline, camera } from "ionicons/icons";
import { useRef, useState } from "react";
import { setCard, setCards } from "../utils/BingoController";
import MiniBingoCard from "./MiniBingoCard";
import ItemNew from "./ItemNew";
import '../utils/I18n';
import { useTranslation } from "react-i18next";
import { gaEvent } from "../utils/analytics";
import Scan from "./Scan";
import { getMultiScan, getScan } from "../utils/serverController";
import CropModal from "./Crop";
import { InterstitialAd } from "@capgo/capacitor-admob";
import { Capacitor } from "@capacitor/core";

interface ComponentProps { }
const BingoCards: React.FC<ComponentProps> = () => {
    const { cards, numbers, order }: { cards: Array<Array<Array<number>>>, numbers: Array<number>, order: any } = useBingoContext();
    const { t } = useTranslation();
    const [present] = useIonToast();
    const scanMultipleRef = useRef<HTMLInputElement>(null)
    const scanOneRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [scan, setScan] = useState(false)
    const [crop, setCrop] = useState<any>(undefined)
    const router = useIonRouter();
    const resolveScanMultiple = async (e: any) => {
        setScan(false)
        setLoading(true);

        const newCards = await getMultiScan(e)

        setLoading(false);
        if (newCards && newCards.success) {
            setCards(newCards.data)
            gaEvent(`scan-${newCards.length}`)
        } else {
            present({
                message: t("bingoCards.error.cardsWithAI"),
                duration: 3000,
                position: 'top',
                color: 'danger',
            })
        }
    }

    const resolveScanOne = async (blob: any) => {
        setCrop(undefined)
        setLoading(true);
        let result = await getScan(blob);
        setLoading(false);
        if (result.success) {
            setCards([result.data])
            gaEvent(`scan-1`)
            showAd();

        } else {
            present({
                message: t("bingoCards.error.cardsWithAI"),
                duration: 3000,
                position: 'top',
                color: 'danger',
            })
        }
    }

    const scanOne = (e: any) => {
        setScan(false)
        setCrop(e.target.files[0])
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
                            action: () => {
                                setScan(true);
                            }
                        }
                    ]} />

                </IonCol>
            </IonRow>
            {crop && <CropModal dismiss={() => setCrop(undefined)} isOpen={crop !== undefined} image={crop} done={resolveScanOne} />}
            <Scan
                dismiss={() => setScan(false)}
                isOpen={scan}
                scanOne={() => {
                    if (!loading) scanOneRef.current?.click();
                }}
                scanMultiple={() => {
                    if (!loading) scanMultipleRef.current?.click();
                }} />
            <input type="file" accept="image/*" className="ion-hide" ref={scanOneRef} capture="environment" onChange={scanOne} />
            <input type="file" accept="image/*" className="ion-hide" ref={scanMultipleRef} capture="environment" onChange={resolveScanMultiple} />
        </IonGrid>
    );
};

export default BingoCards;