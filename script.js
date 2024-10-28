const count = 10
const apiKey = "tTguXPDwDKz49eFCIOgnPna_HFv-dWFxn-Gq3eribqE"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
const imageContainer = document.getElementById('imageDiv')
const loader = document.getElementById('loading')

let isDownloaded = false
let imagesLoaded = 0
let totalImages = 0
let imagesArray = []

getImages()
async function getImages() {
    try {
        const response = await fetch(apiUrl)
        imagesArray = await response.json()
        displayImages()

    } catch (error) {

    }
}

function displayImages() {
    imagesLoaded = 0
    totalImages = imagesArray.length
    imagesArray.forEach((image) => {
        const item = document.createElement('a')
        setAttributes(item, { href: image.urls.regular })

        const img = document.createElement('img')
        setAttributes(img, {
            src: image.urls.regular,
            alt: image.alt_description
        })

        img.addEventListener('load', imageLoaded)

        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        isDownloaded = true
        loader.hidden = true
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isDownloaded) {
        getImages()
    }
})