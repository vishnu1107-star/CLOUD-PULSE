import os
import sys
import requests

SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL", "")


def notify_slack(text):
    # Always post to real Slack if webhook URL is set
    if SLACK_WEBHOOK_URL:
        try:
            payload = {
                "text": text,
                "username": "CloudPulse Bot",
                "icon_emoji": ":zap:"
            }
            resp = requests.post(SLACK_WEBHOOK_URL, json=payload, timeout=5)
            _safe_print(f"[slack:sent] HTTP {resp.status_code} -> {text}")
            return resp.status_code == 200
        except requests.RequestException as e:
            _safe_print(f"[slack:error] {e}")
            return False
    else:
        _safe_print(f"[slack:disabled] No SLACK_WEBHOOK_URL set. Message: {text}")
        return False


def _safe_print(text):
    """Prints to console safely, stripping non-encodable characters on Windows."""
    try:
        print(text)
    except UnicodeEncodeError:
        safe = text.encode('ascii', errors='replace').decode('ascii')
        print(safe)