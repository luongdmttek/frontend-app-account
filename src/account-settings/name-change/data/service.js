import { getConfig } from 'frontend-platform-vi';
import { getAuthenticatedHttpClient } from 'frontend-platform-vi/auth';

import { handleRequestError } from '../../data/utils';

// eslint-disable-next-line import/prefer-default-export
export async function postNameChange(name) {
  // Requests a pending name change, rather than saving the account name immediately
  const requestConfig = { headers: { Accept: 'application/json' } };
  const requestUrl = `${getConfig().LMS_BASE_URL}/api/user/v1/accounts/name_change/`;

  const { data } = await getAuthenticatedHttpClient()
    .post(requestUrl, { name }, requestConfig)
    .catch(error => handleRequestError(error));

  return data;
}
