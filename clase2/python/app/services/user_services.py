from app.models.user import User

users = [
    User(1, "Alice", "alice@gmail.com"),
    User(2, "Carlos", "carlos@gmail.com")
]

def get_all_users():
    return [user.to_dict() for user in users]

def find_by_id(userId):
    for user in users:
        if(user.id == userId):
            return user.to_dict()
    return None

def add_user(name, email):
    id = len(users) + 1
    user = User(id, name, email)
    users.append(user)
    return user.to_dict()
