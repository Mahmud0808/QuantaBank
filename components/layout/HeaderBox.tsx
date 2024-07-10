import React from "react";

const HeaderBox = ({
    type = "title",
    title,
    subtext,
    user,
}: HeaderBoxProps) => {
    return (
        <div className="header-box">
            <h1 className="header-box-title">
                {title},&nbsp;
                {type == "greeting" && (
                    <span className="text-bank-gradient">
                        {user?.split(" ")[0] || "Guest"}
                    </span>
                )}
            </h1>
            <p className="header-box-subtext">{subtext}</p>
        </div>
    );
};

export default HeaderBox;
