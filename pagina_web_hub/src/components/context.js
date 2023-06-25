import React from "react";

export const UserState={
    userlocal:true,
    pagina:1
}

const Uses=React.createContext(UserState);

export default Uses;