import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { close, imageOutline, imagesOutline } from 'ionicons/icons';
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/react';
import scan_one from '../assets/scan/scan-one.png';
import scan_multiple from '../assets/scan/scan-multiple.png';
import scan_explain from '../assets/scan/scan-explain.png';

interface ScanProps {
    dismiss: any;
    isOpen: boolean;
    scanOne: any;
    scanMultiple: any;
}

const Scan: FC<ScanProps> = ({ dismiss, isOpen = false, scanOne, scanMultiple }) => {
    const { t, i18n } = useTranslation();
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t("scan.title")}</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={dismiss}>
                            <IonIcon slot="icon-only" icon={close} className='close'></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <Swiper
                    modules={[Pagination, Navigation]} // Add modules as needed
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation={true}
                    loop={false}
                    style={{ height: "100%" }}
                >
                    <SwiperSlide>
                        <div>
                            <img src={scan_one} style={{maxWidth: 200}}/>
                            <p>{t("scan.step1")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={scan_multiple} style={{maxWidth: 200}}/>
                            <p>{t("scan.step2")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={scan_explain} style={{maxWidth: 200}}/>
                            <p>{t("scan.step3")}</p>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
            </IonContent>
            <IonFooter>
                <IonGrid>
                    <IonRow>
                        <IonCol style={{height: '70px'}}>
                            <IonFab horizontal="center">
                                <IonFabButton color="primary" onClick={scanOne}>
                                    <IonIcon icon={imageOutline}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                        </IonCol>
                        <IonCol>
                            <IonFab horizontal="center">
                                <IonFabButton color="warning" onClick={scanMultiple}>
                                    <IonIcon icon={imagesOutline}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonModal>
    )
}

export default Scan;