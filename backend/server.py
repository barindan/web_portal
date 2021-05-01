import psycopg2
from psycopg2 import sql
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request

from config import password_postgres

app = FastAPI()
origins = ['http://localhost:3001']
app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

conn = psycopg2.connect(user="barindan",
                        password=password_postgres,
                        host="127.0.0.1",
                        port="5432",
                        database="web_portal")


@app.post("/login")
async def login_web_portal(request: Request):
    with conn.cursor() as cursor:
        data = await request.json()
        print(data)
        login = data.get('login')
        password = data.get('password')
        cursor.execute(f"SELECT * FROM users WHERE login='{login}'")
        user = ()
        for row in cursor:
            user = row
        print(user)
        if user:
            if user[2] == password:
                return {'success': True}
            else:
                return{'success': False,
                       'error_code': 'bad pass'}
        return {'success': False,
                'error_code': 'no user'
                }


@app.post("/registration")
async def auth(request: Request):
    with conn.cursor() as cursor:
        data = await request.json()
        login = data.get('login')
        print(data)
        cursor.execute(f"SELECT * FROM users WHERE login='{login}'")
        user = ()
        for row in cursor:
            user = row
            print(user)
        if user:
            return {'success': False,
                    'error_code': 'login is busy',
                    }
        values = [
            (f'{login}', f'{data.get("password")}', f'{data.get("name")}', f'{data.get("surname")}')
        ]
        insert = sql.SQL('INSERT INTO users (login, password, name, surname) VALUES {}').format(
            sql.SQL(',').join(map(sql.Literal, values))
        )
        print("[1]")
        cursor.execute(insert)
        conn.commit()

        cursor.execute("SELECT * from users")
        record = cursor.fetchall()
        print("Результат", record)
        return {'success': True}


@app.post("/get_article")
async def root(request):
    data = request
    return {"message": data}
