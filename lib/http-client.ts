import { AxiosApiDataResponse } from "@/types/axios";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

type TokenResponse = {
  access_token: string;
  expires_in: number;
};

class HttpClient {
  private axiosInstance: AxiosInstance;
  private accessToken: string | undefined;
  private tokenExpiresAt: number | undefined;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.spotify.com/v1",
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await this.getAccessToken();
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  }

  /**
   * Gets the current access token, refreshing it if expired
   * @returns {Promise<string>} The access token
   */
  private async getAccessToken(): Promise<string> {
    if (
      this.accessToken &&
      this.tokenExpiresAt &&
      Date.now() < this.tokenExpiresAt
    ) {
      return this.accessToken;
    }

    const tokenData = await this.requestNewToken();
    this.accessToken = tokenData.access_token;
    this.tokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
    return this.accessToken;
  }

  /**
   * Requests a new access token from Spotify using Client Credentials Flow
   * @returns {Promise<TokenResponse>} Token data including access token and expiration
   */
  private async requestNewToken(): Promise<TokenResponse> {
    try {
      const auth = btoa(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      );
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${auth}`,
          },
        }
      );

      const data = response.data;
      if (data.error) {
        throw new Error(
          data.error_description || "Failed to obtain access token"
        );
      }
      return data;
    } catch (error) {
      console.error("Error obtaining Spotify access token:", error);
      throw error;
    }
  }

  /**
   * Makes a GET request to the specified URL
   * @param url - The endpoint URL (relative to baseURL or absolute if baseUrl is provided)
   * @param config - Optional Axios request configuration
   * @param baseUrl - Optional base URL to override the default (e.g., "http://localhost:3000")
   * @returns {Promise<AxiosApiDataResponse<T>>} Response with data, headers, and error info
   */
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<AxiosApiDataResponse<T>> {
    try {
      const instance = baseUrl
        ? axios.create({ baseURL: baseUrl })
        : this.axiosInstance;
      const response: AxiosResponse<T> = await instance.get(url, config);
      return {
        data: response.data ?? null,
        headers: response.headers,
        isError: false,
        error: null,
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        data: null,
        headers: error.response?.headers ?? {},
        isError: true,
        error,
      };
    }
  }

  /**
   * Makes a POST request to the specified URL
   * @param url - The endpoint URL (relative to baseURL or absolute if baseUrl is provided)
   * @param payload - The request payload
   * @param config - Optional Axios request configuration
   * @param baseUrl - Optional base URL to override the default (e.g., "http://localhost:3000")
   * @returns {Promise<AxiosApiDataResponse<T>>} Response with data, headers, and error info
   */
  public async post<TPayload, T>(
    url: string,
    payload: TPayload,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<AxiosApiDataResponse<T>> {
    try {
      const instance = baseUrl
        ? axios.create({ baseURL: baseUrl })
        : this.axiosInstance;
      const response: AxiosResponse<T> = await instance.post(
        url,
        payload,
        config
      );
      return {
        data: response.data ?? null,
        headers: response.headers,
        isError: false,
        error: null,
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        data: null,
        headers: error.response?.headers ?? {},
        isError: true,
        error,
      };
    }
  }
}

export const httpClient = new HttpClient();
