import Axios, { AxiosError } from "axios";
import queryString from "query-string";

interface IHandler {
  path: string;
  type: string;
  data?: any;
  _token?: string;
  isFormData?: boolean;
  isUrlencoded?: boolean;
  isBloob?: boolean;
}

export interface IResponse<T> {
  success: boolean;
  msg: string;
  data: T;
}

export interface IServerResponse{
  message: string;
  status: string;
  data: any;
}

const GlobalHandler = async (payload: IHandler): Promise<[boolean, IServerResponse]> => {
  const _handler = async (payload: IHandler): Promise<[boolean, IServerResponse]> => {
    try {
      const { path, type, data, isBloob } = payload;
      const token = payload._token;
      const baseURL = `${process.env.EXPO_PUBLIC_BACKEND_API}${path}`;
      let success = false;
      const maxAttempt = 2;
      let attempt = 0;
      const performRequest = async (): Promise<any> => {
        let response = null;
        while (!success && attempt < maxAttempt) {
          attempt++;
          try {
            // Perform the API request
            if (type === "get") {
              response = await Axios.get(baseURL, {
                params: data,
                responseType: isBloob ? "blob" : "json",
                paramsSerializer: (params) => parseParams(params),
                headers: {
                  "Content-Type": "application/json",
                  ...(token != null
                    ? {
                        Authorization: `${token}`,
                      }
                    : {}),
                },
              });
            } else if (type === "put") {
              response = await Axios.put(
                baseURL,
                payload.isUrlencoded ? queryString.stringify(data) : data,
                {
                  headers: {
                    "Content-Type": payload.isFormData
                      ? "multipart/form-data"
                      : payload.isUrlencoded
                      ? "application/x-www-form-urlencoded"
                      : "application/json",
                    ...(token != null
                        ? {
                              Authorization: `${token}`,
                          }
                        : {})
                  },
                }
              );
            } else if (type === "patch") {
              response = await Axios.patch(
                baseURL,
                payload.isUrlencoded ? queryString.stringify(data) : data,
                {
                  headers: {
                    "Content-Type": payload.isFormData
                      ? "multipart/form-data"
                      : payload.isUrlencoded
                      ? "application/x-www-form-urlencoded"
                      : "application/json",
                    ...(token != null
                        ? {
                              Authorization: `${token}`,
                          }
                        : {})
                  },
                }
              );
            } else if (type === "delete") {
              response = await Axios.delete(baseURL, {
                headers: {
                  "Content-Type": payload.isFormData
                    ? "multipart/form-data"
                    : payload.isUrlencoded
                    ? "application/x-www-form-urlencoded"
                    : "application/json",
                  ...(token != null
                      ? {
                            Authorization: `${token}`,
                        }
                      : {})
                },
                data: data,
              });
            } else {
              const requestOptions = {
                headers: {
                  "Content-Type": payload.isFormData
                    ? "multipart/form-data"
                    : payload.isUrlencoded
                    ? "application/x-www-form-urlencoded"
                    : "application/json",
                  ...(token != null
                    ? {
                        Authorization: `${token}`,
                      }
                    : {}),
                },
              };
              response = await Axios.post(baseURL, data, requestOptions);
            }
            success = true;
          } catch (error) {
            if(error instanceof AxiosError){
              console.log(error.response.data)
              response = error.response
            }
          }
        }
        if (!success) {
          console.log("All attempts to perform request failed");
        }
        return response.data;
      };
      const response = await performRequest();
      return [success, response];
    } catch (error: any) {
      return [false, error];
    }
  };
  return _handler(payload);
};

const parseParams = (params) => {
  let options = "";

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (Array.isArray(value)) {
      // If the value is an array, iterate over its elements and append each one with the key
      value.forEach((element) => {
        if (Array.isArray(element)) {
          // If the element is also an array, iterate over its elements
          element.forEach((subElement) => {
            options += `${key}=${subElement}&`;
          });
        } else {
          // If the element is not an array, simply append it with the key
          options += `${key}=${element}&`;
        }
      });
    } else {
      // If the value is not an array, append it with the key
      options += `${key}=${value}&`;
    }
  });
  // Remove the trailing '&' and return the result
  return options ? options.slice(0, -1) : options;
};
export default GlobalHandler;
