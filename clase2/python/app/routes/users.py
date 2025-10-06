from flask import jsonify, request, Blueprint
from app.services.user_services import get_all_users,add_user, find_by_id

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=["GET"])
def get_users():
    return jsonify(get_all_users())

@users_bp.route('/<int:userId>', methods=["GET"])
def get_user(userId):
    user = find_by_id(userId)
    if user:
        return jsonify(user)
    return {"error": "User not found"}, 404

@users_bp.route('/', methods=["POST"])
def create_user():
    data = request.get_json()
    if not data or "name" not in data or "email" not in data:
        return {"error": "Invalid request"}, 400
    user = add_user(data["name"], data["email"])
    return jsonify(user), 201

@users_bp.route('/status', methods=["GET"])
def getStatus():
    return {"status": "OK"}, 200

