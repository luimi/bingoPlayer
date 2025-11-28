
const server = import.meta.env.VITE_BINGOPLAYER_SERVER

export const getMultiScan = async (fileInput: any) => {
    return await scanImage('multipleScan', fileInput);
}

const scanImage = async (path: string , fileInput: any) => {
    const formdata = new FormData();
    const file = fileInput.target.files[0];
    formdata.append("image", file, file.name);

    const requestOptions: any = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    let result : any = await fetch(`${server}/${path}`, requestOptions);
    result = await result.json()
    
    return result;
}