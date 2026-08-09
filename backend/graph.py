from collections import defaultdict

from database import get_connection


class SubwayGraph:
    def __init__(self):
        self.graph = defaultdict(list)

    def load_graph(self):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT from_station_id,
                   to_station_id,
                   travel_time
            FROM connections
        """)

        rows = cursor.fetchall()

        for from_station, to_station, travel_time in rows:
            # Forward direction
            self.graph[from_station].append((to_station, travel_time))

            # Reverse direction
            self.graph[to_station].append((from_station, travel_time))

        cursor.close()
        conn.close()

    def get_graph(self):
        return self.graph