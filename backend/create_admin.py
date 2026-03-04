import bcrypt
from database.db import get_connection

def create_admin():

    conn = get_connection()
    cursor = conn.cursor()

    email = "callmevish.c7@gmail.com"
    username = "Salaar"
    password = "Salaar@123"

    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    try:
        cursor.execute("""
        INSERT INTO users (email, username, password, role)
        VALUES (?, ?, ?, ?)
        """, (email, username, hashed_password, "admin"))

        conn.commit()
        print("Admin user created successfully.")

    except Exception as e:
        print("Error:", e)

    finally:
        conn.close()


if __name__ == "__main__":
    create_admin()
    