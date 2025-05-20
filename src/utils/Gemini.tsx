const GOOGLE_API_KEY = import.meta.env.VITE_API_GEMINI;
const prompt = "Analiza esta imagen y devuelve un array en JSON donde extraigas los numeros de bingo en este formato [[[1,15,23,43,69], [2,16,24,45,70], ...]] donde el primer arreglo contiene cada carton de bingo que veas, si en alguno de las celdas no hay numero entero, rellena los campos con el numero cero, si no hay cartones legibles devuelve un array vacio"

export const getCardsWithIA = async (event: any) => {
    const selectedFile = event.target.files[0];
    const mimeType = selectedFile.type;
    const numBytes = selectedFile.size;
    const displayName = selectedFile.name;

    const startUploadResponse = await startUpload(numBytes, mimeType, displayName)
    if (!startUploadResponse.ok) return null;
    const uploadUrl = startUploadResponse.headers.get('X-Goog-Upload-URL');
    if (!uploadUrl) return null;
    const fileBuffer = await selectedFile.arrayBuffer();
    const uploadResponse = await upload(uploadUrl, numBytes, mimeType, fileBuffer)
    if (!uploadResponse.ok) return null;
    const fileInfo = await uploadResponse.json();
    const fileUri = fileInfo?.file?.uri;
    if (!fileUri) return null;
    const generateContentResponse = await generateContent(mimeType, fileUri)
    if (!generateContentResponse.ok) return null;
    const responseJson = await generateContentResponse.json();
    const description = responseJson?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!description) null;
    await deleteUpload(fileInfo)
    return stringToJson(description)
}

const startUpload = async (numBytes: number, mimeType: string, displayName: string) => {
    return await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
            'X-Goog-Upload-Protocol': 'resumable',
            'X-Goog-Upload-Command': 'start',
            'X-Goog-Upload-Header-Content-Length': numBytes.toString(),
            'X-Goog-Upload-Header-Content-Type': mimeType,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file: {
                display_name: displayName,
            },
        }),
    });
}

const upload = async (
    uploadUrl: string,
    numBytes: number,
    mimeType: string,
    fileBuffer: ArrayBuffer
) => {
    return await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-Length': numBytes.toString(),
            'X-Goog-Upload-Offset': '0',
            'X-Goog-Upload-Command': 'upload, finalize',
            'Content-Type': mimeType,
        },
        body: fileBuffer,
    });
}

const generateContent = async (mimeType: string, fileUri: string) => {
    return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt },
                        { file_data: { mime_type: mimeType, file_uri: fileUri } },
                    ],
                },
            ],
        }),
    });
}

const deleteUpload = async (fileInfo: any) => {
    await fetch(`https://generativelanguage.googleapis.com/v1beta/${fileInfo.file.name}?key=${GOOGLE_API_KEY}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const stringToJson = (jsonString: string) => {
  try {
    const cleanedString = jsonString.replace(/```json\n/g, '').replace(/\n```/g, '').trim();
    const jsonObject = JSON.parse(cleanedString);
    return jsonObject;
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return null;
  }
}