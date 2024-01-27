import { UpdateAttributionInputType } from "../forms/attribution";
import { api } from "./api";


export const patchAttribution = async (data: UpdateAttributionInputType) => {
  try {
    const response = await api.patch("/attribution/properties/", data);
    console.log('patch response', response);
    
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
}