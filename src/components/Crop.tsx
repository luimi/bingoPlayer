import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark, close } from 'ionicons/icons';
import React, { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview, getBlob } from '../utils/imageTool';

interface CropProps {
    image: any;
    dismiss: any;
    isOpen: boolean;
    done: any;
}

const CropModal: FC<CropProps> = ({ image, dismiss, isOpen, done }) => {
    const { t, i18n } = useTranslation();
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })
    const [completed, setCompleted] = useState(false)
    const [imageSrc, setImageSrc] = useState<any>()
    const imageRef = useRef<HTMLImageElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const reader = new FileReader()
        reader.addEventListener('load', () =>
            setImageSrc(reader.result?.toString() || ''),
        )
        reader.readAsDataURL(image)
        canvasPreview(previewCanvasRef.current!, imageRef.current!, crop)
    }, [])

    const finish = async () => {
        const blob = await getBlob(imageRef.current!, previewCanvasRef.current!, crop);
        console.log(blob)
        done(blob)
    }

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t("crop.title")}</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={dismiss}>
                            <IonIcon slot="icon-only" icon={close} className='close'></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid style={{height: '100%'}}>
                    <IonRow className="ion-align-items-center"  style={{height: '100%'}}>
                        <IonCol>
                            <ReactCrop 
                                crop={crop} 
                                onChange={c => setCrop(c)} 
                                onComplete={() => {
                                    canvasPreview(previewCanvasRef.current!, imageRef.current!, crop);
                                    setCompleted(true)
                                }}>
                                <img src={imageSrc} ref={imageRef} />
                            </ReactCrop>
                            <canvas
                                className='ion-hide'
                                ref={previewCanvasRef}
                                style={{
                                    objectFit: 'contain',
                                    width: crop.width,
                                    height: crop.height,
                                }}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton color="warning" onClick={finish} disabled={!completed}>
                        <IonIcon icon={checkmark} ></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonModal>
    )
}

export default CropModal;