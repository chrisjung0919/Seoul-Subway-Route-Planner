from database import get_connection
from graph import SubwayGraph
from dijkstra import Dijkstra

class RouteService:

    def __init__(self):
        self.station_names = self.load_station_names()

        self.station_ids = {
            name.lower(): station_id
            for station_id, name in self.station_names.items()
        }

        self.station_lines = self.load_station_lines()

    def load_station_names(self):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT station_id, station_name_en
            FROM stations
        """)

        stations = {}

        for station_id, station_name in cursor.fetchall():
            stations[station_id] = station_name

        cursor.close()
        conn.close()

        return stations

    def station_name(self, station_id):
        return self.station_names.get(station_id, "Unknown Station")

    def station_id(self, station_name):
        return self.station_ids.get(station_name.lower())

    def load_station_lines(self):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT station_id, line_name
            FROM station_lines
            JOIN subway_lines
            USING(line_id)
        """)

        station_lines = {}

        for station_id, line_name in cursor.fetchall():
            station_lines[station_id] = line_name

        cursor.close()
        conn.close()

        return station_lines

    def station_line(self, station_id):
        return self.station_lines.get(station_id)

    def calculate_fare(self, travel_time):
        conn = get_connection()
        cursor = conn.cursor()

        # Simple assumption:
        # 1 minute = 1 km (for this sample dataset)

        distance = travel_time

        cursor.execute("""
            SELECT fare
            FROM fares
            WHERE %s BETWEEN min_distance AND max_distance
        """, (distance,))

        result = cursor.fetchone()

        cursor.close()
        conn.close()

        if result:
            return result[0]

        return None
    
    def find_route(self, start_station, end_station):
        start = self.station_id(start_station)
        end = self.station_id(end_station)

        if start is None:
            raise ValueError(f"Station '{start_station}' not found.")

        if end is None:
            raise ValueError(f"Station '{end_station}' not found.")

        subway = SubwayGraph()
        subway.load_graph()

        graph = subway.get_graph()

        algorithm = Dijkstra()

        path, total_time = algorithm.shortest_path(
            graph,
            start,
            end
        )

        fare = self.calculate_fare(total_time)

        return {
            "route": [self.station_name(station) for station in path],
            "line": self.station_line(path[0]),
            "travel_time": total_time,
            "fare": fare
        }

    def get_all_stations(self):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT station_name_en
            FROM stations
            ORDER BY station_name_en
        """)

        stations = [row[0] for row in cursor.fetchall()]

        cursor.close()
        conn.close()

        return stations