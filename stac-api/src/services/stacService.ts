import { StacCollection, StacItem } from "stac-ts";

export interface SearchParams {
  collections: string[];
  bbox?: number[];
  datetime?: string;
  limit?: number;
  query?: Record<string, any>;
}

class StacClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCollections(): Promise<{ collections: StacCollection[] }> {
    const response = await fetch(`${this.baseUrl}/collections`);
    return response.json();
  }

  async search(params: SearchParams): Promise<{ features: StacItem[] }> {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return response.json();
  }
}

export class StacService {
  private client: StacClient;

  constructor() {
    this.client = new StacClient("https://data.inpe.br/bdc/stac/v1");
  }

  async listCollections(): Promise<StacCollection[]> {
    const collections = await this.client.getCollections();
    return collections.collections;
  }

  async search(params: SearchParams): Promise<StacItem[]> {
    const searchResult = await this.client.search(params);
    return searchResult.features;
  }
}
