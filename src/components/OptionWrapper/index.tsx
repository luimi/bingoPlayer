import { IonCard, IonCardContent, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react";

interface ComponentProps {
    title: string;
    action?: any;
    actionTitle?: any;
    icon?: string;
    children?: React.ReactNode
}
const OptionWrapper: React.FC<ComponentProps> = ({ title = "Title", action, actionTitle, icon, children }) => {
    return (
        <IonCard>
            <IonCardContent className="ion-no-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <IonItem lines="none">
                                <IonLabel><strong>{title}</strong></IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol size="6" className="ion-text-right">
                            {action !== undefined && icon !== undefined &&
                                <IonChip color="primary" onClick={action}>
                                    <IonLabel>{actionTitle}</IonLabel>
                                    <IonIcon icon={icon}></IonIcon>
                                </IonChip>}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {children}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default OptionWrapper;