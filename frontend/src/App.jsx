import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SubwayMap from "./components/SubwayMap";

function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [route, setRoute] = useState(null);
  const [stations, setStations] = useState([]);

  const [filteredStart, setFilteredStart] = useState([]);

  const [filteredEnd, setFilteredEnd] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/stations")
      .then((response) => {
        setStations(response.data);
      })
      .catch(console.error);
  }, []);

  const findRoute = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/route", {
        params: {
          start,
          end,
        },
      });

      setRoute(response.data);
    } catch (error) {
      console.error(error);
      alert("Could not find route.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "46px",
          marginBottom: "10px",
        }}
      >
        Seoul Subway Route Planner
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#777",
          marginBottom: "40px",
          fontSize: "18px",
        }}
      >
        Fast • Accurate • Route Planning
      </p>

      <input
        value={start}
        onChange={(e) => {
          const value = e.target.value;

          setStart(value);

          if (value.length === 0) {
            setFilteredStart([]);
            return;
          }

          setFilteredStart(
            stations
              .filter((station) =>
                station.toLowerCase().includes(value.toLowerCase())
              )
              .slice(0, 8)
          );
        }}
        placeholder="🚉 Current Station"
        style={{
          width: "100%",
          padding: "16px",
          marginBottom: "15px",
          fontSize: "18px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      />

      {filteredStart.length > 0 && (
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0 5px 12px rgba(0,0,0,.15)",
          }}
        >
          {filteredStart.map((station) => (
            <div
              key={station}
              onClick={() => {
                setStart(station);
                setFilteredStart([]);
              }}
              style={{
                padding: "14px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              🚉 {station}
            </div>
          ))}
        </div>
      )}

      <input
        value={end}
        onChange={(e) => {
          const value = e.target.value;

          setEnd(value);

          if (value.length === 0) {
            setFilteredEnd([]);
            return;
          }

          setFilteredEnd(
            stations
              .filter((station) =>
                station.toLowerCase().includes(value.toLowerCase())
              )
              .slice(0, 8)
          );
        }}
        placeholder="🎯 Destination"
        style={{
          width: "100%",
          padding: "16px",
          marginBottom: "25px",
          fontSize: "18px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      />

      {filteredEnd.length > 0 && (
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0 5px 12px rgba(0,0,0,.15)",
          }}
        >
          {filteredEnd.map((station) => (
            <div
              key={station}
              onClick={() => {
                setEnd(station);
                setFilteredEnd([]);
              }}
              style={{
                padding: "14px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              🚉 {station}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={findRoute}
        style={{
          width: "100%",
          padding: "16px",
          fontSize: "20px",
          borderRadius: "10px",
          background: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Find Best Route
      </button>

      {route && (
        <div
          style={{
            marginTop: "45px",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            background: "#fafafa",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>🚇 Best Route</h2>

          <hr />

          <h3 style={{ color: "#1976d2" }}>{route.line}</h3>

          <div style={{ marginTop: "20px" }}>
            {route.route.map((station, index) => (
              <div
                key={station}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#1976d2",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  {index + 1}
                </div>

                <div style={{ fontSize: "18px" }}>
                  {station}
                </div>
              </div>
            ))}
          </div>

          <hr style={{ margin: "25px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
            }}
          >
            <div>
              ⏱ <strong>{route.travel_time} min</strong>
            </div>

            <div>
              💰 <strong>₩{route.fare.toLocaleString()}</strong>
            </div>

            <div>
              🚉 <strong>{route.route.length} stops</strong>
            </div>
          </div>
        </div>
      )}

      <SubwayMap
      route={route}
      start={start}
      end={end}
      setStart={setStart}
      setEnd={setEnd}
      />

    </div>
  );
}

export default App;