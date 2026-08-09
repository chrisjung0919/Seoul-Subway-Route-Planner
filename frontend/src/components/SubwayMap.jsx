import { useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

function SubwayMap({
  route,
  start,
  end,
  setStart,
  setEnd,
}) {
  const handleStationClick = (stationName) => {
    if (!start) {
      setStart(stationName);
      return;
    }

    if (!end) {
      setEnd(stationName);
      return;
    }

    // Both boxes already filled → start a new search
    setStart(stationName);
    setEnd("");
  };
  
  const [hoveredStation, setHoveredStation] = useState(null);

    const isActiveStation = (stationName) => {
    if (!route) return false;

    return route.route.includes(stationName);
    };

    const stationColor = (stationName) => {
    return isActiveStation(stationName)
        ? "#0052A4"
        : "#BDBDBD";
    };

    const lineColor = (stationA, stationB) => {
    return isActiveStation(stationA) &&
        isActiveStation(stationB)
        ? "#0052A4"
        : "#BDBDBD";
    };

  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ddd",
          borderRadius: "15px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.15 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <svg
              width="1800"
              height="900"
              viewBox="0 0 1800 900"
              style={{
                background: "white",
              }}
            >
              {/* Line 1 */}

                {/* Seoul Station → City Hall */}

                <line
                x1="150"
                y1="450"
                x2="450"
                y2="450"
                stroke={lineColor("Seoul Station", "City Hall")}
                strokeWidth="12"
                style={{ transition: "all .35s ease" }}
                />

                {/* City Hall → Jonggak */}

                <line
                x1="450"
                y1="450"
                x2="750"
                y2="450"
                stroke={lineColor("City Hall", "Jonggak")}
                strokeWidth="12"
                style={{ transition: "all .35s ease" }}
                />

                {/* Jonggak → Jongno 3-ga */}

                <line
                x1="750"
                y1="450"
                x2="1050"
                y2="450"
                stroke={lineColor("Jonggak", "Jongno 3-ga")}
                strokeWidth="12"
                style={{ transition: "all .35s ease" }}
                />

                {/* Jongno 3-ga → Dongdaemun */}

                <line
                x1="1050"
                y1="450"
                x2="1350"
                y2="450"
                stroke={lineColor("Jongno 3-ga", "Dongdaemun")}
                strokeWidth="12"
                style={{ transition: "all .35s ease" }}
                />

                {/* Dongdaemun → Dongmyo */}

                <line
                x1="1350"
                y1="450"
                x2="1650"
                y2="450"
                stroke={lineColor("Dongdaemun", "Dongmyo")}
                strokeWidth="12"
                style={{ transition: "all .35s ease" }}
                />

              {/* Seoul Station */}

              <circle
                cx="150"
                cy="450"
                r="14"
                fill="white"
                stroke={stationColor("Seoul Station")}
                strokeWidth="6"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                }}
                onClick={() => handleStationClick("Seoul Station")}
              />
              <text
                x="120"
                y="495"
                fontSize="26"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                    userSelect: "none",
                }}
                onClick={() => handleStationClick("Seoul Station")}
              >
                Seoul Station
              </text>

              {/* City Hall */}

              <circle
                cx="450"
                cy="450"
                r="14"
                fill="white"
                stroke={stationColor("City Hall")}
                strokeWidth="6"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                }}
                onClick={() => handleStationClick("City Hall")}
              />
              <text
                x="395"
                y="495"
                fontSize="26"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                    userSelect: "none",
                }}
                onClick={() => handleStationClick("City Hall")}
              >
                City Hall
              </text>

              {/* Jonggak */}

              <circle
                cx="750"
                cy="450"
                r="14"
                fill="white"
                stroke={stationColor("Jonggak")}
                strokeWidth="6"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                }}
                onClick={() => handleStationClick("Jonggak")}
              />
              <text
                x="710"
                y="495"
                fontSize="26"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                    userSelect: "none",
                }}
                onClick={() => handleStationClick("Jonggak")}
              >
                Jonggak
              </text>

              {/* Jongno 3-ga */}

              <circle
                cx="1050"
                cy="450"
                r="14"
                fill="white"
                stroke={stationColor("Jongno 3-ga")}
                strokeWidth="6"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                }}
                onClick={() => handleStationClick("Jongno 3-ga")}
              />
              <text
                x="975"
                y="495"
                fontSize="26"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                    userSelect: "none",
                }}
                onClick={() => handleStationClick("Jongno 3-ga")}
              >
                Jongno 3-ga
              </text>

              {/* Dongdaemun */}

              <circle
                cx="1350"
                cy="450"
                r="14"
                fill="white"
                stroke={stationColor("Dongdaemun")}
                strokeWidth="6"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                }}
                onClick={() => handleStationClick("Dongdaemun")}
              />
              <text
                x="1270"
                y="495"
                fontSize="26"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                    userSelect: "none",
                }}
                onClick={() => handleStationClick("Dongdaemun")}
              >
                Dongdaemun
              </text>

              {/* Dongmyo */}

              <circle
                cx="1650"
                cy="450"
                r="14"
                fill="white"
                stroke={stationColor("Dongmyo")}
                strokeWidth="6"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                }}
                onClick={() => handleStationClick("Dongmyo")}
              />
              <text
                x="1610"
                y="495"
                fontSize="26"
                style={{
                    cursor: "pointer",
                    transition: "all .35s ease",
                    userSelect: "none",
                }}
                onClick={() => handleStationClick("Dongmyo")}
              >
                Dongmyo
              </text>
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default SubwayMap;