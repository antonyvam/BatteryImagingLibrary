import React, { useState } from "react";
import AppContext from "./types";

const AppContextProvider = (props: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
    // user files
    const [foo, setFoo] = useState<number | null>(null);
    return (
        <AppContext.Provider
            value={{
                foo: [foo, setFoo],
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;