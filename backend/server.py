import json

import psycopg2
from fastapi import FastAPI

from config import password_postgres

app = FastAPI()


conn = psycopg2.connect(user="barindan",
                        password=password_postgres,
                        host="127.0.0.1",
                        port="5432",
                        database="web_portal")
cursor = conn.cursor()


@app.post("/get_article")
async def root(request):
    data = request
    return {"message": data}
