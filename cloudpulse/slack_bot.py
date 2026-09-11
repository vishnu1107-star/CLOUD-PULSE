import os
import requests

SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL", "")


def notify_slack(text):
    if not SLACK_WEBHOOK_URL:
        print(f"[slack:disabled] {text}")
        return False
    try:
        resp = requests.post(SLACK_WEBHOOK_URL, json={"text": text}, timeout=5)
        return resp.status_code == 200
    except requests.RequestException as e:
        print(f"[slack:error] {e}")
        return False