export class Network {
  constructor(url) {
      this.url = url;
  }

  async fetchMoviesData() {
    try {
        const response = await fetch(this.url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
            throw new Error('Empty response received');
        }

        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}
}
