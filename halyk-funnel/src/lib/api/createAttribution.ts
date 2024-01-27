import { CreateAttributionInputType } from "../forms/attribution";
import { api } from "./api";
import { v4 as uuidv4 } from 'uuid';

export const createAttribution = async (data: CreateAttributionInputType) => {
  const response = await api.post("/attribution/init/", { ...data, attribution_id: uuidv4() });
  console.log('response', response);
  
  return response.data;
}