import requests

def fetch_codeforces_data(username):
    try:
        response = requests.get(f"https://codeforces.com/api/user.info?handles={username}")
        if response.status_code == 200:
            data = response.json()
            if data["status"] == "OK":
                user_info = data["result"][0]
                return {
                    "rating": user_info.get("rating"),
                    "rank": user_info.get("rank"),
                }
        return None
    except Exception as e:
        print(f"Error fetching Codeforces data: {e}")
        return None
