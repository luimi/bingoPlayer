import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useBingoContext } from "../../contexts/BingoContext";
import './styles.scss';
import { setNumber, unsetNumber } from "../../utils/BingoController";
import { Link } from "react-router-dom";

interface ComponentProps { }
const Numbers: React.FC<ComponentProps> = () => {
   const router = useIonRouter();
   const { cards, numbers, order }: { cards: Array<Array<Array<number>>>, numbers: Array<number>, order: any } = useBingoContext();
   const numberArray = Array.from({ length: 75 }, (_, i) => i + 1);
   return (
      <IonPage>
         <IonContent>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
               <IonFabButton onClick={() => router.goBack()}>
                  <IonIcon icon={arrowBack} ></IonIcon>
               </IonFabButton>
            </IonFab>
            <IonGrid>
               <IonRow>
                  {numberArray.map((number) => (
                     <IonCol size="2" size-md="1" key={number} className="">
                        <IonCard className="ion-text-center ion-no-margin">
                           <IonCardHeader className={`ion-no-padding ion-padding-vertical ${numbers.includes(number) ? 'selected' : ''}`} onClick={() => {
                              if (numbers.includes(number)) {
                                 unsetNumber(number)
                              } else {
                                 setNumber(number)
                              }
                           }}>
                              <IonCardTitle>
                                 {number}
                              </IonCardTitle>
                           </IonCardHeader>
                        </IonCard>
                     </IonCol>
                  ))}
               </IonRow>
            </IonGrid>
         </IonContent>
         <IonFooter>
            <IonGrid style={{overflow: "scroll"}}>
               <IonRow className="ion-nowrap">
                  {order.map((index: number) => (
                     <IonCol size="auto" className="ion-text-center" key={index}>
                        <Link to={`/card/${index}`}>
                           <table id="card">
                              <tbody>
                                 {cards[index].map((row, rIndex) => (
                                    <tr key={`row${rIndex}`}>
                                       {row.map((cell, cIndex) => (
                                          <td key={`cell${rIndex}${cIndex}`} className={`${numbers.includes(cell) ? 'selected' : ''}`}>{cell !== 0 ? cell : ''}</td>
                                       ))}
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </Link>
                     </IonCol>
                  ))}
               </IonRow>
            </IonGrid>
         </IonFooter>
      </IonPage>
   );
};

export default Numbers;