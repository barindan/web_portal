import psycopg2
from psycopg2 import sql
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware

from config import password_postgres

app = FastAPI()
origins = [
    'http://localhost:3001',
    'http://localhost:3002',
           ]
app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

app.add_middleware(SessionMiddleware, secret_key="!secret")

conn = psycopg2.connect(user="barindan",
                        password=password_postgres,
                        host="127.0.0.1",
                        port="5432",
                        database="web_portal")


@app.post("/login")
async def login_web_portal(request: Request):
    user = request.session.get("user")
    if user:
        return {'success': True}
    else:
        with conn.cursor() as cursor:
            data = await request.json()
            print(data)
            login = data.get('login')
            password = data.get('password')
            cursor.execute(f"SELECT * FROM users WHERE login='{login}'")
            data_user = cursor.fetchone()
            if data_user:
                if data_user[2] == password:
                    user = {"username": data_user[1], "name": data_user[3], "surname": data_user[4]}
                    request.session['user'] = user
                    print(request.session.get("user"))
                    return {'success': True}
                else:
                    return{'success': False,
                           'error_code': 'bad pass'}
            return {'success': False,
                    'error_code': 'no user'
                    }


@app.post("/registration")
async def auth(request: Request):
    user = request.session.get("user")
    if user:
        return {'success': True}
    else:
        with conn.cursor() as cursor:
            data = await request.json()
            login = data.get('login')
            print(data)
            cursor.execute(f"SELECT * FROM users WHERE login='{login}'")
            user_info = cursor.fetchone()
            if user_info:
                return {'success': False,
                        'error_code': 'login is busy',
                        }
            values = [
                (f'{login}', f'{data.get("password")}', f'{data.get("name")}', f'{data.get("surname")}')
            ]
            insert = sql.SQL('INSERT INTO users (login, password, name, surname) VALUES {}').format(
                sql.SQL(',').join(map(sql.Literal, values))
            )
            cursor.execute(insert)
            conn.commit()

            cursor.execute("SELECT * from users")
            record = cursor.fetchall()
            print("Результат", record)
            user = {"username": login, "name": data.get("name"), "surname": data.get("surname")}
            request.session['user'] = user
            print(request.session.get("user"))
            return {'success': True}


@app.post("/get_article_id")
async def get_article_id(request: Request):
    data = await request.json()
    title = data.get("title")
    print(title)
    if title:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT id FROM articles WHERE title='{title}'")
            article_id = cursor.fetchone()
            print(article_id[0])
            if article_id:
                return {"success": True, "article_id": article_id[0]}
            else:
                return {"success": False, "error_code": "article not found"}
    else:
        return {"success": False, "error_code": "bad request"}


@app.get("/get_article_title")
async def get_title():
    with conn.cursor() as cursor:
        cursor.execute("SELECT title FROM articles ORDER BY id")
        title = []
        for row in cursor:
            title.append(row[0])
        print(title)
        if title:
            return {"success": True, "titles": title}
        else:
            return {"success": False, "error_code": "no article"}


@app.post("/get_article")
async def get_article(request: Request):
    data = await request.json()
    title = data.get('title')
    if not title:
        return {"success": False, "error_code": "bad request"}
    if title:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT article FROM articles WHERE title='{title}'")
            article = cursor.fetchone()
            print(article)
            if article:
                return {'success': True, "article": article[0]}
            else:
                return {'success': False, "error_code": "article not found"}


@app.post("/get_article_by_id")
async def get_article_by_id(request: Request):
    data = await request.json()
    print(data)
    id_article = data.get('idArticle')
    if id_article:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT article FROM articles WHERE id='{id_article}'")
            article = cursor.fetchone()
            print(article[0])
            if article:
                print("Recv data")
                return {'success': True, "article": article[0]}
            else:
                return {'success': False, "error_code": "article not found, bad id"}
    else:
        return {"success": False, "error_code": "bad request"}


@app.post("/add_article")
async def add_article(request: Request):
    user = request.session.get('user')
    if not user:
        return {"success": False, "is_login": False}
    data = await request.json()
    article = data.get('outputData')
    print(article)
    if article:
        title = ''
        for block in article.get('blocks'):
            if block.get('type') == 'header':
                title = block.get('data').get('text')
        print(title + " It is title")
        article_str = str(article).replace("'", '"')
        print(article_str)
        with conn.cursor() as cursor:
            cursor.execute(f"INSERT INTO articles (title, article) VALUES ('{title}','{article_str}')")
            conn.commit()

            cursor.execute("SELECT * from articles")
            record = cursor.fetchall()
            print("Результат", record)
        return {"success": True, "is_login": True}
    else:
        return {"success": False, "is_login": True}


@app.post('/update_article')
async def update_article(request: Request):
    user = request.session.get("user")
    if not user:
        return {"success": False, "is_login": False}
    data = await request.json()
    print(data)
    article = data.get('outputData')
    article_id = data.get('idArticle')
    print(article_id)
    if article:
        title = ''
        for block in article.get('blocks'):
            if block.get('type') == 'header':
                title = block.get('data').get('text')
        article_text = str(article).replace("'", '"')
        with conn.cursor() as cursor:
            cursor.execute(f"UPDATE articles SET article='{article_text}', title='{title}' WHERE id={article_id}")
            conn.commit()

            cursor.execute("SELECT * from articles")
            record = cursor.fetchall()
            print("Результат", record)
        return {"success": True, "is_login": True}
    else:
        return {"success": False, "is_login": True}


@app.get('/check_login')
async def check_login(request: Request):
    user = request.session.get("user")
    print("Check login")
    print(user)
    if user:
        return {"success": True, "user": user}
    else:
        return {"success": False}


@app.get('/logout')
async def logout(request: Request):
    if request.session.get('user'):
        request.session.pop('user', None)
        return {"success": True}
    return {
        "success": False,
    }


@app.post("/delete_article")
async def delete_article(request: Request):
    user = request.session.get("user")
    if not user:
        return {"success": False, "isLogin": False}
    data = await request.json()
    article_id = data.get("articleId")
    if article_id:
        with conn.cursor() as cursor:
            cursor.execute(f"DELETE FROM articles WHERE id='{article_id}'")
            conn.commit()

            cursor.execute("SELECT * from articles")
            record = cursor.fetchall()
            print("Результат", record)
            return {"success": True, "isLogin": True}
    return {"success": False, "isLogin": True, "error_code": "no id article"}
