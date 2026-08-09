import heapq


class Dijkstra:

    def shortest_path(self, graph, start, end):

        priority_queue = [(0, start)]

        distances = {station: float("inf") for station in graph}
        distances[start] = 0

        previous = {}

        while priority_queue:

            current_distance, current_station = heapq.heappop(priority_queue)

            if current_station == end:
                break

            for neighbor, travel_time in graph[current_station]:

                distance = current_distance + travel_time

                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    previous[neighbor] = current_station

                    heapq.heappush(
                        priority_queue,
                        (distance, neighbor)
                    )

        path = []

        current = end

        while current != start:
            path.append(current)
            current = previous[current]

        path.append(start)

        path.reverse()

        return path, distances[end]