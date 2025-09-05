import { gaEvent } from "./analytics";

const { VITE_PARTNER_URL, VITE_PARTNER_APP, VITE_PARTNER_APPID, VITE_PARTNER_RESTKEY } = import.meta.env;
const ids = {
    userId: "UserID"
}
export const getUserID = () => {
    if (localStorage.getItem(ids.userId)) return localStorage.getItem(ids.userId)
    else {
        const uuid = crypto.randomUUID();
        localStorage.setItem(ids.userId, uuid);
        return uuid
    }
}

export const getCampaign = async (userId: string) => {
    if(!userId) return null;

    const body = JSON.stringify({
        "code": VITE_PARTNER_APP,
        "id": userId
    });

    const requestOptions: any = {
        method: "POST",
        headers: getHeaders(),
        body: body,
        redirect: "follow"
    };

    let result: any = await fetch(`${VITE_PARTNER_URL}/functions/getCampaign`, requestOptions)
    result = await result.json();

    if (result) {
        result = result.result;
        gaEvent("ads-partner")
    }
    return result
}

export const setCampaignClick = async (id: string) => {
    if(!id) return null;

    const body = JSON.stringify({
        "id": id
    });

    const requestOptions: any = {
        method: "POST",
        headers: getHeaders(),
        body: body,
        redirect: "follow"
    };

    await fetch(`${VITE_PARTNER_URL}/functions/clickCampaign`, requestOptions)

    return
}

const getHeaders = () => {
    const header: any = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Accept', 'application/json');
    header.append('X-Parse-Application-Id', VITE_PARTNER_APPID || "");
    header.append('X-Parse-REST-API-Key', VITE_PARTNER_RESTKEY || "");
    return header;
}