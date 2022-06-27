import { getConfig } from 'frontend-platform-vi';
import { getAuthenticatedHttpClient } from 'frontend-platform-vi/auth';

import { handleRequestError } from '../../data/utils';

// eslint-disable-next-line import/prefer-default-export
export async function postVerifiedNameConfig(username, commitValues) {
  const requestConfig = { headers: { Accept: 'application/json' } };
  const requestUrl = `${getConfig().LMS_BASE_URL}/api/edx_name_affirmation/v1/verified_name/config`;

  const { useVerifiedNameForCerts } = commitValues;
  const postValues = {
    username,
    use_verified_name_for_certs: useVerifiedNameForCerts,
  };

  const { data } = await getAuthenticatedHttpClient()
    .post(requestUrl, postValues, requestConfig)
    .catch(error => handleRequestError(error));

  return data;
}
