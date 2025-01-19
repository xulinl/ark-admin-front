import axios, { type AxiosRequestConfig } from 'axios'

const pendingRequests = new Map<string, any>()

export const generateRequestKey = (config: AxiosRequestConfig): string => {
  if (config) {
    return `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`
  }
  return ''
}

export const cancelPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    const cancel = pendingRequests.get(requestKey)
    cancel('取消重复请求')
    pendingRequests.delete(requestKey)
  }
}

export const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateRequestKey(config)
  config.cancelToken = new axios.CancelToken((cancel) => {
    if (!pendingRequests.has(requestKey)) {
      pendingRequests.set(requestKey, cancel)
    }
  })
}

export const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}
