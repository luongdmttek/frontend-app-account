import { getConfig } from 'frontend-platform-vi';
import { getAuthenticatedHttpClient } from 'frontend-platform-vi/auth';
import { convertKeyNames, snakeCaseObject } from 'frontend-platform-vi/utils';
import siteLanguageList from './constants';

export async function getSiteLanguageList() {
  return siteLanguageList;
}

export async function patchPreferences(username, params) {
  let processedParams = snakeCaseObject(params);
  processedParams = convertKeyNames(processedParams, {
    pref_lang: 'pref-lang',
  });

  await getAuthenticatedHttpClient()
    .patch(`${getConfig().LMS_BASE_URL}/api/user/v1/preferences/${username}`, processedParams, {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    });

  return params; // TODO: Once the server returns the updated preferences object, return that.
}

export async function postSetLang(code) {
  const formData = new FormData();
  formData.append('language', code);

  await getAuthenticatedHttpClient()
    .post(`${getConfig().LMS_BASE_URL}/i18n/setlang/`, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
}
