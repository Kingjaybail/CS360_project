from flask import Blueprint, request, jsonify
from app.services import processor

api = Blueprint('api', __name__)

@api.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})

@api.route("/sum", methods=["POST"])
def sum_numbers():
    data = request.get_json(force=True, silent=True) or {}
    a = data.get("a", 0)
    b = data.get("b", 0)
    if a is None or b is None:
        return jsonify({"error": "Invalid input"}), 400
    try:
        return jsonify({"result": int(a) + int(b)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
