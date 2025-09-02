import {CSSProperties} from "react";
import {FoldProps} from "../interfaces/types";

const Fold = ({children, bgColour, hero = false}: FoldProps) => {
    const colour = bgColour! as React.CSSProperties["backgroundColor"];
    const style: CSSProperties = hero
        ? {background: "linear-gradient(90deg, rgba(33,33,33,1) 0%, rgba(112,112,112,0.5) 100%)"}
        : {
              background: colour
          };

    return (
        <div className="fold" style={style}>
            {children}
        </div>
    );
};

export default Fold;
