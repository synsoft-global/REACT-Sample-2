import React from "react";
import { Button } from "reactstrap";

const ZoneSeat = ({
  onClick,
  style,
  id,
  children,
  seatType,
  height,
  width,
}) => {
  var seatTypeSVGUrl = `url(https://fiff.exmple.com/img/seats/${seatType}.svg)`;

  return (
    <Button
      id={id}
      className="seat"
      style={{
        ...style,
      }}
      key={id}
      variant="flat"
      onClick={() => onClick && onClick()}
    >
      <div
        style={{
          width: width,
          height: height,
          backgroundImage: `${seatTypeSVGUrl}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: "0px",
          left: "0px",
        }}
      >
        {children}
      </div>
    </Button>
  );
};

export default ZoneSeat;
