import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-banner.png';
import step1 from '../assets/steps/step1.png';
import step2 from '../assets/steps/step2.png';
import step3 from '../assets/steps/step3.png';
import step4 from '../assets/steps/step4.png';
import '../utils/I18n';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles/Welcome.css';
import { close } from 'ionicons/icons';


interface WelcomeProps {
    dismiss: any
}

const Welcome: FC<WelcomeProps> = ({ dismiss }) => {
    const { t, i18n } = useTranslation();
    localStorage.setItem("welcome", "true");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t("welcome.title")}</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={dismiss}>
                            <IonIcon slot="icon-only" icon={close}></IonIcon>
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
                            <img className="logo" src={logo} />
                            <p>{t("welcome.step1")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img className="logo" src={logo} />
                            <p>{t("welcome.step2")}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h1>{t("welcome.step3")}</h1>
                            <img src={step1}/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h1>{t("welcome.step4")}</h1>
                            <img src={step2}/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h1>{t("welcome.step5")}</h1>
                            <img src={step3}/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h1>{t("welcome.step6")}</h1>
                            <img src={step4}/>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </IonContent>
        </IonPage>
    )
}

export default Welcome;