import { post } from './request.js';

const client_id = "123857965273-930jlfpdk5ef9ofpa77c7oa4mhhhe726.apps.googleusercontent.com";

const handleCredentialResponse = response =>
  post('login', { token: response.credential });

const loadScript = onLoad => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.onload = onLoad;
  document.body.appendChild(script);
};

const renderGoogleAuthButton = () => {
  google.accounts.id.initialize({
    client_id,
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.body,
    { theme: "outline", size: "large" }  // customization attributes
  );
};

export const initGoogleAuthButton = () => {
  loadScript(() => {
    renderGoogleAuthButton();
  });
};
