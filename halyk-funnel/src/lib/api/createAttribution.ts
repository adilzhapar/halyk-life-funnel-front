import { CreateAttributionInputType } from "../forms/attribution";
import { api } from "./api";


export const createAttribution = async (data: CreateAttributionInputType) => {
  try {
    const response = await api.post("/attribution/init/", data);
    
    console.log('response', response);
    
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
}