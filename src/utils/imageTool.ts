import { Crop, PixelCrop } from "react-image-crop"

export const canvasPreview = (canvas: HTMLCanvasElement, image: HTMLImageElement, crop: Crop) => {
    if (!canvas || !image || !crop) return;

    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('No 2d context')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const pixelRatio = window.devicePixelRatio

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    const rotateRads = 0 * Math.PI / 180
    const centerX = image.naturalWidth / 2
    const centerY = image.naturalHeight / 2
    console.log("data", "scalex", scaleX, "scaley", scaleY, "pixelratio", pixelRatio, "cropw", crop.width, "croph", crop.height, "cropx", cropX, "cropy", cropY, "centerx",centerX, "centery",centerY)
    ctx.save()

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY)
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY)
    // 3) Rotate around the origin
    ctx.rotate(rotateRads)
    // 2) Scale the image
    ctx.scale(1, 1)
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY)
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    )

    ctx.restore()
}

export const getBlob = async (image: HTMLImageElement, canvas: HTMLCanvasElement, crop: Crop) => {
    if (!image || !canvas || !crop) {
        throw new Error('Crop canvas does not exist')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    let scaledWidth = crop.width * scaleX
    let scaledHeight = crop.height * scaleY

    const MAX_SIZE = 500

    if (scaledWidth > MAX_SIZE || scaledHeight > MAX_SIZE) {
        if (scaledWidth < scaledHeight) {
            scaledHeight = scaledHeight * (MAX_SIZE / scaledWidth)
            scaledWidth = MAX_SIZE
        } else {
            scaledWidth = scaledWidth * (MAX_SIZE / scaledHeight)
            scaledHeight = MAX_SIZE
        }
    }

    const offscreen = new OffscreenCanvas(
        scaledWidth,
        scaledHeight,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
        throw new Error('No 2d context')
    }

    ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        scaledWidth,
        scaledHeight,
    )
    
    const blob = await offscreen.convertToBlob({
        type: 'image/png',
    })

    return blob;
}