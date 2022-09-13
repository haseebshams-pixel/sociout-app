import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getAllJobs = (skip: number, search: string) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.GETJOBS}/${skip}`, {search: search});
};

export {getAllJobs};
