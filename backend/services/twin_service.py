import datetime
from database.db import get_connection

digital_twin = {

    "energy_system": {
        "current_usage_kwh": 5000,
        "peak_demand_kwh": 1500,
        "status": "stable"
    },

    "water_system": {
        "current_usage_liters": 50000,
        "leakage_detected": False,
        "status": "normal"
    },

    "traffic_system": {
        "avg_vehicle_count": 3200,
        "congestion_level": "moderate",
        "status": "controlled"
    }
}


def get_digital_twin_data():
    return digital_twin


def update_energy(value):
    digital_twin["energy_system"]["current_usage_kwh"] = value
    return digital_twin["energy_system"]


def update_water(value):
    digital_twin["water_system"]["current_usage_liters"] = value
    return digital_twin["water_system"]


def update_traffic(value):
    digital_twin["traffic_system"]["avg_vehicle_count"] = value
    return digital_twin["traffic_system"]