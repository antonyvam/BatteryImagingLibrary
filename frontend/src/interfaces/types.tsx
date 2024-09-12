import { createContext } from "react";

interface contextProps {
    foo: [
        foo: number | null,
        setFoo: (e: number | null) => void
    ]
};

const AppContext = createContext<contextProps | null>(null);
export default AppContext;