

export async function getImage() {
    const response = await fetch(`https://pixabay.com/api/?key=55056599-cffb8dbcfd98e997b82fa9b32&q=books&safesearch=true&per_page=50`);
    const data = await response.json();
    console.log(data);

    if (!data.hits || data.hits.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * data.hits.length);
    return data.hits[randomIndex].largeImageURL;
}