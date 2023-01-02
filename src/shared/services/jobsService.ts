import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getAllJobs = (skip: number, search: string) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.GETJOBS}/${skip}`, {search: search});
};
const deleteJob = (id: string | undefined) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DELETEJOB}/${id}`);
};
const addJob = (params: object) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADDJOB, params);
};
const editJob = (params: object, id: string) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ADDJOB}${id}`, params);
};

export {getAllJobs, deleteJob, addJob, editJob};
