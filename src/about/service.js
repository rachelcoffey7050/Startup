
const images = ['/bookcircle.jpg', '/bookends.jpg', '/books.jpg', 
    '/bookspines.jpg', '/moodybooks.jpg'
]

export function getImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex]
}