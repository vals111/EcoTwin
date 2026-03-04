from flask import Flask, jsonify, request, abort
from flask_cors import CORS

from config import APP_NAME
from database.db import get_connection

from services.auth_service import register_user, login_user, verify_user_otp
from services.twin_service import get_digital_twin_data, update_energy, update_water, update_traffic

app = Flask(__name__)
CORS(app)


def require_user():

    user_id = request.headers.get("User-ID")

    if not user_id:
        abort(401)

    return user_id


@app.route("/health")
def health():

    return jsonify({
        "status": "running",
        "project": APP_NAME
    })


@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    return jsonify(register_user(
        data.get("email"),
        data.get("username"),
        data.get("password")
    ))


@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    return jsonify(login_user(
        data.get("email"),
        data.get("password")
    ))


@app.route("/api/verify-otp", methods=["POST"])
def verify_otp():

    data = request.get_json()

    return jsonify(verify_user_otp(
        data.get("email"),
        data.get("otp")
    ))


@app.route("/api/twin")
def twin():

    require_user()

    return jsonify(get_digital_twin_data())


@app.route("/api/update/energy", methods=["POST"])
def energy():

    require_user()

    data = request.get_json()

    return jsonify(update_energy(data.get("value")))


@app.route("/api/update/water", methods=["POST"])
def water():

    require_user()

    data = request.get_json()

    return jsonify(update_water(data.get("value")))


@app.route("/api/update/traffic", methods=["POST"])
def traffic():

    require_user()

    data = request.get_json()

    return jsonify(update_traffic(data.get("value")))


if __name__ == "__main__":
    app.run(debug=True, port=5000)