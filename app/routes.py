from flask import Blueprint, request, jsonify
from app.services import processor

api = Blueprint('api', __name__)

@api.route('/sum', methods=['POST'])
def sum_numbers():
    data = request.json
    result = processor.compute_sum(data['a'], data['b'])
    return jsonify({'result': result})

@api.route('/reverse', methods=['POST'])
def reverse_string():
    data = request.json
    result = processor.reverse_string(data['input'])
    return jsonify({'result': result})
