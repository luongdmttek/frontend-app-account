import { getConfig } from 'frontend-platform-vi';
import { getAuthenticatedHttpClient } from 'frontend-platform-vi/auth';
import formurlencoded from 'form-urlencoded';
import { handleRequestError } from '../../data/utils';

// eslint-disable-next-line import/prefer-default-export
export async function postResetPassword(email) {
  const { data } = await getAuthenticatedHttpClient()
    .post(
      `${getConfig().LMS_BASE_URL}/password_reset/`,
      formurlencoded({ email }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .catch(handleRequestError);

  return data;
}
