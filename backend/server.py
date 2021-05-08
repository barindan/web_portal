import json
from fastapi.staticfiles import StaticFiles
import psycopg2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware

from config import password_postgres

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

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
            cursor.execute("SELECT * FROM users WHERE login=%s", (login,))
            conn.commit()
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
            cursor.execute("SELECT * FROM users WHERE login=%s", (login,))
            conn.commit()
            user_info = cursor.fetchone()
            if user_info:
                return {'success': False,
                        'error_code': 'login is busy',
                        }

            cursor.execute(
                """INSERT INTO users (login, password, name, surname) VALUES (%s, %s, %s, %s)""",
                (login, data.get("password"), data.get("name"), data.get("surname")))
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
    print(f"'{title}'")
    if title:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id FROM articles WHERE title=%s", (title,))
            article_id = cursor.fetchall()
            conn.commit()

            cursor.execute("SELECT title FROM articles")
            record = cursor.fetchall()
            print("Результат", record)
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
        conn.commit()
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
            cursor.execute("SELECT article FROM articles WHERE title=%s", (title,))
            conn.commit()
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
            cursor.execute("SELECT article FROM articles WHERE id=%s", (id_article,))
            conn.commit()
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
    print(data)
    article = data.get('outputData')
    print(article)
    if article:
        title = ''
        for block in article.get('blocks'):
            if block.get('type') == 'header':
                title = block.get('data').get('text').replace("&nbsp;", "").strip(" ")
        print(title + " It is title")
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO articles (title, article) VALUES (%s, %s)", (title, json.dumps(article)))
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
                title = block.get('data').get('text').replace("&nbsp;", "").strip(" ")

        with conn.cursor() as cursor:
            cursor.execute(
                """UPDATE articles SET article=%s, title=%s WHERE id=%s""", (json.dumps(article), title, article_id))
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
            cursor.execute("DELETE FROM articles WHERE id=%s", (article_id,))
            conn.commit()

            cursor.execute("SELECT * from articles")
            record = cursor.fetchall()
            print("Результат", record)
            return {"success": True, "isLogin": True}
    return {"success": False, "isLogin": True, "error_code": "no id article"}


@app.post("/upload_file")
async def upload_file(request: Request):
    form = await request.form()
    filename = form["image"].filename
    img = await form['image'].read()
    path_file = "./static/" + filename
    with open(path_file, 'wb') as local_file:
        local_file.write(img)
    print(path_file)
    url = "http://localhost:8000/static/" + filename
    return {
        "success": 1,
        "file": {
            "url": url,
        }
    }


@app.post("fetch_url")
async def fetch_url(request: Request):
    print("[2]")
    print(request)