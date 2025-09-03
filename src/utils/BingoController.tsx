import { gaEvent } from "./analytics";
import { patterns } from "./defaults";

let context: any = null;
let bingoAnimation: any = null;
let translator: any = null

const local = {
    numbersPlayed: "numbers",
    gameMode: "mode",
    bingoCards: "cards",
    customGameModes: "modes",
}
const defaultGameModes = (t: any) => {
    return [
        {
            name: "full",
            title: t("bingoController.gameModes.full"),
            sketch: patterns.full,
        },
        {
            name: "x",
            title: "X",
            sketch: patterns.x,
        },
        {
            name: "l",
            title: "L",
            sketch: patterns.l,
        },
        {
            name: "t",
            title: "T",
            sketch: patterns.t,
        },
        {
            name: "h",
            title: "H",
            sketch: patterns.h,
        },
        {
            name: "i",
            title: "I",
            sketch: patterns.i,
        },
        {
            name: "corners",
            title: t("bingoController.gameModes.corners"),
            sketch: patterns.corners,
        },
        {
            name: "top",
            title: t("bingoController.gameModes.top"),
            sketch: patterns.top,
        },
    ]
}
export const getCurrentNumbers = () => {
    const numbers = localStorage.getItem(local.numbersPlayed);
    if (numbers) {
        return JSON.parse(numbers);
    } else {
        localStorage.setItem(local.numbersPlayed, JSON.stringify([]));
        return [];
    }
}
export const getCurrentGameMode = () => {
    const gameMode = localStorage.getItem(local.gameMode);
    if (gameMode) {
        return JSON.parse(gameMode);
    } else {
        localStorage.setItem(local.gameMode, JSON.stringify("full"));
        return "full";
    }
}
export const getGameModes = (t: any) => {
    
    let customGameModes = [];
    if (localStorage.getItem(local.customGameModes)) {
        customGameModes = JSON.parse(localStorage.getItem(local.customGameModes)!);
    } else {
        localStorage.setItem(local.customGameModes, JSON.stringify([]));
    }
    return [...defaultGameModes(t), ...customGameModes];
}
export const getCards = () => {
    const cards = localStorage.getItem(local.bingoCards)
    if (cards) {
        return JSON.parse(cards)
    } else {
        localStorage.setItem(local.bingoCards, JSON.stringify([]))
        return []
    }
}
export const getCard = (index: number) => {
    return JSON.parse(localStorage.getItem(local.bingoCards) || "[]")[index]
}
export const setBingoContext = (_context: any) => {
    context = _context;
}
export const setBingoAnimation = (trigger: any) => {
    bingoAnimation = trigger
}
export const setNumber = (number: number) => {
    if (context.numbers.includes(number)) return;
    let newNumbers = [...context.numbers, number];
    localStorage.setItem(local.numbersPlayed, JSON.stringify(newNumbers));
    context.setNumbers(newNumbers);
    gaEvent(`number-${number}`)
}
export const setGameMode = (gameMode: any, t: any) => {
    let customGameModes = JSON.parse(localStorage.getItem(local.customGameModes)!)
    const gameModes = [...defaultGameModes(t), ...customGameModes];
    if (gameModes.some((mode: any) => mode.name.toLowerCase() === gameMode.name.toLowerCase())) return false
    customGameModes.push(gameMode)
    localStorage.setItem(local.customGameModes, JSON.stringify(customGameModes))
    context.setGameModes([...gameModes, gameMode])
    return true
}
export const setCurrentGameMode = (gameMode: string) => {
    localStorage.setItem(local.gameMode, JSON.stringify(gameMode))
    context.setGameMode(gameMode)
}
export const setCard = (card: any, index?: number) => {
    let copy = [...context.cards]
    if (index !== undefined) {
        copy[index] = card
    } else {
        copy.push(card)
    }
    localStorage.setItem(local.bingoCards, JSON.stringify(copy))
    context.setCards(copy)
}
export const setCards = (cards: any) => {
    let copy = [...context.cards, ...cards]
    localStorage.setItem(local.bingoCards, JSON.stringify(copy))
    context.setCards(copy)
}
export const unsetNumber = (number: number) => {
    if (!context.numbers.includes(number)) return;
    let newNumbers = context.numbers.filter((n: number) => n !== number);
    localStorage.setItem(local.numbersPlayed, JSON.stringify(newNumbers));
    context.setNumbers(newNumbers);
}
export const removeCard = (index: number) => {
    let copy = [...context.cards]
    copy.splice(index, 1)
    localStorage.setItem(local.bingoCards, JSON.stringify(copy))
    context.setCards(copy)
}
export const clearNumbers = () => {
    localStorage.setItem(local.numbersPlayed, JSON.stringify([]))
    context.setNumbers([])
}
export const clearCards = () => {
    localStorage.setItem(local.bingoCards, JSON.stringify([]))
    context.setCards([])
}
export const checkBingos = () => {
    const numbers = context.numbers
    const cards = context.cards
    const pattern = context.gameModes.find((gamemode: any) => gamemode.name === context.gameMode)
    const total = pattern.sketch.flat().filter((num: number) => num === 1).length;
    let bingos: any = []
    cards.forEach((card: any, index: number) => {
        let result: any = checkCard(numbers, card, pattern.sketch, total)
        result.index = index;
        bingos.push(result)
    });
    bingos.sort((a: any, b: any) => a.count > b.count ? -1 : 1)
    let order = bingos.map((result: any) => result.index);
    context.setOrder(order)
    if (bingos.filter(((result: any) => result.success)).length > 0) bingoAnimation()
}
const checkCard = (numbers: any, card: any, pattern: any, total: number) => {
    let status = { success: false, count: 0 }
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[0].length; j++) {
            if (pattern[i][j] === 1) {
                if (numbers.includes(card[i][j])) status.count++
            }
        }
    }
    status.success = status.count === total
    return status
}