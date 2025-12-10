import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { close, imageOutline, imagesOutline } from 'ionicons/icons';
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/react';
import tip1 from '../assets/tips/tip1.png';
import tip2 from '../assets/tips/tip2.png';
import tip3 from '../assets/tips/tip3.png';

interface ScanProps {
    dismiss: any;
    isOpen: boolean;
}

const Tips: FC<ScanProps> = ({ dismiss, isOpen = false }) => {
    const { t, i18n } = useTranslation();
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t("tips.title")}</IonTitle>
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
                            <img src={tip1} style={{maxWidth: 200}}/>
                            <p>{t("tips.step1")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={tip2} style={{maxWidth: 200}}/>
                            <p>{t("tips.step2")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={tip3} style={{maxWidth: 200}}/>
                            <p>{t("tips.step3")}</p>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
            </IonContent>
        </IonModal>
    )
}

export default Tips;