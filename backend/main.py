from services.route_service import RouteService


def main():
    service = RouteService()

    start = input("Current Station: ")
    end = input("Destination: ")

    try:
        result = service.find_route(start, end)

        print("\n========================")
        print("      BEST ROUTE")
        print("========================\n")

        print(f"Line: {result['line']}\n")

        for station in result["route"]:
            print(station)

        print("========================")
        print(f"Travel Time : {result['travel_time']} minutes")
        print(f"Fare        : ₩{result['fare']}")

    except ValueError as e:
        print(e)


if __name__ == "__main__":
    main()