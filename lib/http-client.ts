import { AxiosApiDataResponse } from "@/types/axios";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  /**
   * Makes a GET request to the specified URL
   * @param url - The endpoint URL (relative to baseURL or absolute if baseUrl is provided)
   * @param config - Optional Axios request configuration
   * @param baseUrl - Optional base URL to override the default (e.g., "https://api.spotify.com/v1")
   * @param auth - Optional authentication header (e.g., "Bearer <token>")
   * @returns {Promise<AxiosApiDataResponse<T>>} Response with data, headers, and error info
   */
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    baseUrl?: string,
    auth?: string
  ): Promise<AxiosApiDataResponse<T>> {
    try {
      const instance = baseUrl
        ? axios.create({ baseURL: baseUrl })
        : this.axiosInstance;
      const headers = auth ? { Authorization: auth } : {};
      const response: AxiosResponse<T> = await instance.get(url, {
        ...config,
        headers,
      });
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
   * @param baseUrl - Optional base URL to override the default (e.g., "https://api.spotify.com/v1")
   * @param auth - Optional authentication header (e.g., "Bearer <token>")
   * @returns {Promise<AxiosApiDataResponse<T>>} Response with data, headers, and error info
   */
  public async post<TPayload, T>(
    url: string,
    payload: TPayload,
    config?: AxiosRequestConfig,
    baseUrl?: string,
    auth?: string
  ): Promise<AxiosApiDataResponse<T>> {
    try {
      const instance = baseUrl
        ? axios.create({ baseURL: baseUrl })
        : this.axiosInstance;
      const headers = auth ? { Authorization: auth } : {};
      const response: AxiosResponse<T> = await instance.post(url, payload, {
        ...config,
        headers,
      });
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
