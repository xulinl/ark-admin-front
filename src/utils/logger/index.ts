import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export const logRequest = (config: AxiosRequestConfig) => {
  console.log('Request:', config.method?.toUpperCase(), config.url, config.data || config.params)
}

export const logResponse = (response: AxiosResponse) => {
  console.log('Response:', response.status, response.config.url, response.data)
}

export const logError = (error: any) => {
  console.error('Error:', error.message || error)
}
