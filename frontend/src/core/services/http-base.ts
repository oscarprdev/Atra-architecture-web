interface Response<S> {
  status: number;
  data?: S;
  createdAt?: string;
  message?: string;
}

interface HttpBase {
  get<T>(keyEndpoint: string): Promise<Response<T>>;
}

export class DefaultHttpBase implements HttpBase {
  // private readonly apiUrl: string = 'https://atra-backend.vercel.app/';
  private readonly apiUrl: string = 'http://localhost:1234/';

  async get<T>(keyEndpoint: string): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`);

      if (!response.ok) {
        return {
          status: response.status,
          message: 'An error occurred while fetching data',
        };
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      return {
        status: 400,
        message: 'An error occurred while fetching data',
      };
    }
  }

  async patchJson<T>(keyEndpoint: string, input: T): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        return {
          status: response.status,
          message: 'An error occurred while fetching data',
        };
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      return {
        status: 400,
        message: 'An error occurred while fetching data',
      };
    }
  }

  async sendFormData<T>(
    keyEndpoint: string,
    input: FormData,
    method: string
  ): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`, {
        method,
        body: input,
      });

      if (!response.ok) {
        return {
          status: response.status,
          message: 'Request failed',
        };
      }

      const jsonResponse: Response<T> = await response.json();

      return {
        status: jsonResponse.status,
        data: jsonResponse.data,
      };
    } catch (e: unknown) {
      console.log(e);
      return {
        status: 400,
        message: 'An error occurred while fetching data',
      };
    }
  }

  async delete<T>(keyEndpoint: string): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return {
          status: response.status,
          message: 'An error occurred while fetching data',
        };
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      return {
        status: 400,
        message: 'An error occurred while fetching data',
      };
    }
  }
}
