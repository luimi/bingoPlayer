import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { close } from 'ionicons/icons';
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/react';

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
                    style={{ height: "80%" }}
                >
                    <SwiperSlide>
                        <div>
                            <p>{t("scan.step1")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <p>{t("scan.step2")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <p>{t("scan.step3")}</p>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
                <IonButton expand='block' onClick={scanOne}>{t("scan.scan1")}</IonButton>
                <IonButton expand='block' onClick={scanMultiple}>{t("scan.scanMultiple")}</IonButton>
            </IonContent>
        </IonModal>
    )
}

export default Scan;