import { buildMockQuery } from '@/util/queryHelpers';
import { QueryInput, QueryOutput } from '../types/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  }

  async generateQuery(data: QueryInput): Promise<QueryOutput> {
    try {
      // Production API call
      debugger
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result: QueryOutput = await response.json();
      return result;
    } catch (error) {
      console.error('API call failed, using mock data:', error);
      
      // Fallback to mock implementation
      return this.generateMockQuery(data);
    }
  }

  private async generateMockQuery(data: QueryInput): Promise<QueryOutput> {
    // Simulate API delay
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    
    const rawQuery = buildMockQuery(data);
    const encoded = encodeURIComponent(rawQuery);
    
    return {
      raw_query: rawQuery,
      encoded,
      example_link: `https://www.linkedin.com/search/results/content/?contentType=%22jobs%22&keywords=${encoded}&origin=GLOBAL_SEARCH_HEADER&sortBy=%22date_posted%22`
    };
  }
}

export const apiService = new ApiService();