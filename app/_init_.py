#app/services/__init__.py

from flask import Flask
from app.routes import api

def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(api, url_prefix='/api')
    return app