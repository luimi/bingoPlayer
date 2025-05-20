import React, { createContext, useContext, useEffect } from "react";
import { checkBingos, getCards, getCurrentGameMode, getCurrentNumbers, getGameModes, setBingoContext } from "../utils/BingoController";
import { useIonAlert } from "@ionic/react";


interface BingoContextProps {
    numbers: number[];
    setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    gameMode: string;
    setGameMode: React.Dispatch<React.SetStateAction<string>>;
    gameModes: any;
    setGameModes: React.Dispatch<React.SetStateAction<any>>;
    cards: any;
    setCards: React.Dispatch<React.SetStateAction<any>>;
    order: any;
    setOrder: React.Dispatch<React.SetStateAction<any>>;
}
interface BingoProviderProps {
    children: React.ReactNode;
}
export const BingoContext = createContext<BingoContextProps | undefined>(undefined);
export const BingoProvider: React.FC<BingoProviderProps> = ({ children }) => {

    const [numbers, setNumbers] = React.useState<number[]>(getCurrentNumbers());
    const [gameMode, setGameMode] = React.useState<string>(getCurrentGameMode());
    const [gameModes, setGameModes] = React.useState<any>(getGameModes());
    const [cards, setCards] = React.useState<any>(getCards());
    const [order, setOrder] = React.useState<any>([])
    const [presentAlert] = useIonAlert();
    useEffect(() => {
        checkBingos()
    }, [numbers, gameMode, cards])
    setBingoContext({ numbers, setNumbers, gameMode, setGameMode, gameModes, setGameModes, cards, setCards, order, setOrder, presentAlert });
    return (
        <BingoContext.Provider value={{ numbers, setNumbers, gameMode, setGameMode, gameModes, setGameModes, cards, setCards, order, setOrder }}>
            {children}
        </BingoContext.Provider>
    );
}
export const useBingoContext = () => {
  const context = useContext(BingoContext);
  if (!context) {
    throw new Error('useBingoContext must be used within a BingoProvider');
  }
  return context;
};