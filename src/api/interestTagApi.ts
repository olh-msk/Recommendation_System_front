import axiosClient from './axiosClient';
import type { InterestTagDto } from '../types/InterestTag';

export const getInterestTags = async (): Promise<InterestTagDto[]> => {
  const res = await axiosClient.get('/InterestTag');
  return res.data;
};

export const createInterestTag = async (name: string): Promise<void> => {
  await axiosClient.post('/InterestTag', name);
};
