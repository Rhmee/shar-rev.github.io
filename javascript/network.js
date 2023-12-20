export class Network {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async fetchMovies() {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'X-Master-Key': this.apiKey,
            };

            const response = await fetch(this.apiUrl, { headers });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data.record.movies)) {
                return data.record.movies;
            } else {
                console.error("Data.record.movies is not an array.");
            }
        } catch (error) {
            console.error("Error fetching or parsing JSON:", error);
        }
    }
}
