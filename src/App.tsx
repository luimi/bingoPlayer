import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import { setBingoAnimation, setBingoContext } from './utils/BingoController';
import { BingoContext, useBingoContext } from './contexts/BingoContext';
import Numbers from './pages/Numbers';
import NewSketch from './pages/NewSketch';
import Card from './pages/Card';
import { useCallback, useState } from 'react';
import BingoAnimation from './components/BingoAnimation';
import { SafeArea } from "capacitor-plugin-safe-area";

setupIonicReact();
setBingoContext(BingoContext);

const App: React.FC = () => {
  const [showBingo, setShowBingo] = useState(false);

  const triggerBingoAnimation = useCallback(() => {
    setShowBingo(true);
  }, []);

  const handleBingoAnimationEnd = useCallback(() => {
    setShowBingo(false);
  }, []);

  SafeArea.getSafeAreaInsets().then((data) => {
    const { insets } = data;
    document.body.style.setProperty("--ion-safe-area-top", `${insets.top}px`);
    document.body.style.setProperty("--ion-safe-area-right", `${insets.right}px`);
    document.body.style.setProperty("--ion-safe-area-bottom", `${insets.bottom}px`);
    document.body.style.setProperty("--ion-safe-area-left", `${insets.left}px`);
  });
  setBingoAnimation(triggerBingoAnimation)
  
  return <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/numbers">
          <Numbers />
        </Route>
        <Route exact path="/new-sketch">
          <NewSketch />
        </Route>
        <Route exact path="/card/:index" component={Card} />
        <Route exact path="/card" component={Card} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
    <BingoAnimation isVisible={showBingo} onAnimationEnd={handleBingoAnimationEnd} />
  </IonApp>
};

export default App;
