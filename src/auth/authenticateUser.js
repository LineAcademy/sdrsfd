import * as checkPermissions from './checkPermissions'

export default (to, from, next) => {
  localStorage.setItem("redirection_url", JSON.stringify(to));
  if (
    localStorage.getItem("userInfo") != null &&
    localStorage.getItem("userInfo").length > 0
  ) {
    if(checkPermissions.hasPermission(to.meta.screen, to.meta.permission)) {
      next()
    } else {
      const default_url = JSON.parse(localStorage.getItem("userInfo"))?.default_url
      next(default_url)
    }
  } else {
    localStorage.removeItem("userInfo");
    next("login");
  }
};