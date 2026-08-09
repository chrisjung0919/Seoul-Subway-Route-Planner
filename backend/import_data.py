import pandas as pd
from pathlib import Path
from database import get_connection

DATA_DIR = Path(__file__).parent.parent / "data"

TABLES = [
    ("subway_lines.csv", "subway_lines"),
    ("stations.csv", "stations"),
    ("station_lines.csv", "station_lines"),
    ("connections.csv", "connections"),
    ("fares.csv", "fares"),
]

conn = get_connection()
cursor = conn.cursor()

for csv_file, table in TABLES:
    df = pd.read_csv(DATA_DIR / csv_file)

    placeholders = ", ".join(["%s"] * len(df.columns))
    columns = ", ".join(df.columns)

    sql = f"""
        INSERT INTO {table}
        ({columns})
        VALUES ({placeholders})
    """

    for row in df.itertuples(index=False):
        cursor.execute(sql, tuple(row))

    conn.commit()
    print(f"Imported {len(df)} rows into {table}")

cursor.close()
conn.close()

print("All CSV files imported successfully!")