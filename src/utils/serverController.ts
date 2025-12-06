
const server = import.meta.env.VITE_BINGOPLAYER_SERVER

export const getScan = async (fileInput: any) => {
    const file = fileInput.target.files[0]
    return await scanImage('scan', file, file.name);
}


export const getStatus = async () => {
    const result = await fetch(`${server}/status`);
    return await result.json();
}

const scanImage = async (path: string, file: any, name: string) => {
    const formdata = new FormData();
    formdata.append("image", file, name);

    const requestOptions: any = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    let result: any = await fetch(`${server}/${path}`, requestOptions);
    result = await result.json()

    return result;
}