import { IonFab, IonFabButton, IonIcon, IonModal } from '@ionic/react';
import React, { FC } from 'react';
import './styles/PartnerCampaign.css';
import { setCampaignClick } from '../utils/partnerController';
import { close } from 'ionicons/icons';

interface PartnerCampaignProps {
    campaign?: any;
    dismiss?: any;
}

const PartnerCampaign: FC<PartnerCampaignProps> = ({ campaign, dismiss }) => {
    return (
        <IonModal className="campaign" isOpen={campaign !== undefined} onDidDismiss={dismiss}>
            <div>
                <img src={campaign?.image} onClick={() => {
                    if (campaign.url) {
                        window.open(campaign.url, '_blank')
                        setCampaignClick(campaign.campaign)
                    }
                }} />
                <IonFab vertical='top' horizontal='end' onClick={dismiss}>
                    <IonFabButton size='small' color="dark">
                        <IonIcon icon={close}></IonIcon>
                    </IonFabButton>
                </IonFab>

            </div>
        </IonModal>
    )
}

export default PartnerCampaign;