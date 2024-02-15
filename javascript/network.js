// network.js
export class Network {
    constructor(url) {
      this.url = url;
    }
  
    async fetchData() {
      try {
        const response = await fetch(this.url);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  }
  