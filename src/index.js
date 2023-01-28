import Application from './application';

var onDeviceReady = () => {
  document.body.classList.add(cfg.PLATFORM);
  document.body.classList.add(cfg.ENV);
  if (cfg.PLATFORM == 'device' && typeof device != 'undefined') {
    if (device.platform == 'iOS' && device.model[6] >= 4)
      document.body.classList.add('hq');

    document.body.classList.add(device.platform);

    setTimeout(function() {
      navigator.splashscreen && navigator.splashscreen.hide();
    }, 2000);
  }

  new Application();
};

document.addEventListener('deviceready', onDeviceReady);

if (cfg.PLATFORM == 'browser') onDeviceReady();
