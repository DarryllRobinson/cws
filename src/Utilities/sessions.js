import React from "react";
import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
  console.log('Cookie has been set: ', session);
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");
  console.log('sessionCookie: ', sessionCookie);
  if (sessionCookie === undefined) {
    return {};
  }
  else {
    return JSON.parse(sessionCookie);
  }
};

export const SessionContext = React.createContext(getSessionCookie());
