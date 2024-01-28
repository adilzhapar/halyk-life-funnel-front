import { api } from './api';

export const getResult = async (attribution_id: string) => {
  try {
    const response = await api.get('/recommendations/', {
      params: {
        attribution_id,
      },
    });

    console.log('response', response);

    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};
