import { UserManager, WebStorageStateStore } from "oidc-client";

let appBaseUrl = `${window.location.protocol}//${window.location.host}`;
const authority = "https://local.www.scrum.org/";

const settings = {
  userStore: new WebStorageStateStore(),
  authority: authority,
  client_id: "oidc_spike",
  redirect_uri: `${appBaseUrl}/callback.html`,
  silent_redirect_uri: `${appBaseUrl}/silent-renew.html`,
  post_logout_redirect_uri: `${appBaseUrl}/`,
  response_type: "code",
  scope: "openid profile email",
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
};

let userManager = new UserManager(settings);

export default {
  getUser() {
    return userManager.getUser();
  },

  login() {
    return userManager.signinRedirect();
  },

  logout() {
    return userManager.signoutRedirect();
  },

  getAccessToken() {
    return userManager.getUser().then(data => {
      return data.access_token;
    });
  }
};
