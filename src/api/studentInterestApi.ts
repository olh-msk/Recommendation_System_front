import axiosClient from './axiosClient';

export const saveStudentInterests = async (
  studentId: number,
  interestIds: number[]
): Promise<void> => {
  await axiosClient.post(`/StudentInterest/${studentId}`, interestIds);
};
