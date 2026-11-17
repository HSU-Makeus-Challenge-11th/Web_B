"""실행 중인 실습 서버에 HTTP 요청을 보내고 원본 응답과 캡처용 HTML을 저장한다."""
import html
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

BASE_URL = "http://127.0.0.1:18080"
OUTPUT = Path(__file__).resolve().parents[1] / "evidence" / "week6"
OUTPUT.mkdir(parents=True, exist_ok=True)
captured_at = datetime.now(timezone(timedelta(hours=9))).isoformat(timespec="seconds")
records = []


def call(key, title, method, path, expected, body=None):
    payload = json.dumps(body, ensure_ascii=False).encode("utf-8") if body is not None else None
    request = Request(BASE_URL + path, data=payload, method=method,
                      headers={"Content-Type": "application/json"} if body is not None else {})
    try:
        response = urlopen(request, timeout=20)
    except HTTPError as error:
        response = error
    with response:
        raw_body = response.read().decode("utf-8")
        result = {
            "key": key, "title": title, "capturedAt": captured_at,
            "method": method, "url": BASE_URL + path, "request": body,
            "status": response.status, "reason": response.reason,
            "headers": dict(response.headers), "rawBody": raw_body,
            "response": json.loads(raw_body) if raw_body else None,
        }
    records.append(result)
    (OUTPUT / "responses.json").write_text(
        json.dumps({"environment": "Spring Boot / H2, test profile", "records": records},
                   ensure_ascii=False, indent=2), encoding="utf-8")
    assert result["status"] == expected, (key, result["status"], raw_body)
    return result


signup = call("01-signup", "회원가입 성공", "POST", "/members", 201,
              {"email": "umc@example.com", "password": "Umc!1234", "nickname": "moviefan"})
member_id = signup["response"]["result"]["memberId"]
assert "password" not in signup["response"]["result"]
call("02-validation", "이메일 검증 실패", "POST", "/members", 400,
     {"email": "not-email", "password": "Umc!1234", "nickname": "moviefan"})
call("07-email-conflict", "중복 이메일", "POST", "/members", 409,
     {"email": "umc@example.com", "password": "Umc!1234", "nickname": "anotherfan"})
other = call("setup-other", "다른 회원 준비", "POST", "/members", 201,
             {"email": "other@example.com", "password": "Umc!1234", "nickname": "otherfan"})
other_id = other["response"]["result"]["memberId"]
created = call("03-rating-create", "평점 등록 성공", "POST", f"/members/{member_id}/ratings", 201,
               {"movieId": 550, "score": 5, "comment": "다시 보고 싶은 영화"})
rating_id = created["response"]["result"]
call("08-score-validation", "별점 범위 검증", "POST", f"/members/{member_id}/ratings", 400,
     {"movieId": 155, "score": 6})
call("09-rating-conflict", "중복 평점", "POST", f"/members/{member_id}/ratings", 409,
     {"movieId": 550, "score": 4})
call("04-rating-update", "평점 수정 성공", "PATCH", f"/members/{member_id}/ratings/{rating_id}", 200,
     {"score": 4, "comment": "수정한 후기"})
call("10-forbidden-update", "다른 회원의 수정 차단", "PATCH", f"/members/{other_id}/ratings/{rating_id}", 403,
     {"score": 1})
call("11-forbidden-delete", "다른 회원의 삭제 차단", "DELETE", f"/members/{other_id}/ratings/{rating_id}", 403)
saved = call("12-read-after-update", "수정 결과 확인", "GET", f"/members/{member_id}/ratings", 200)
assert len(saved["response"]) == 1
assert saved["response"][0]["score"] == 4
assert saved["response"][0]["comment"] == "수정한 후기"
call("13-not-found", "없는 평점 수정", "PATCH", f"/members/{member_id}/ratings/9223372036854775807", 404,
     {"score": 3})
deleted = call("05-rating-delete", "평점 삭제 성공", "DELETE", f"/members/{member_id}/ratings/{rating_id}", 204)
assert deleted["rawBody"] == ""
call("06-deleted-not-found", "삭제한 평점 재요청", "DELETE", f"/members/{member_id}/ratings/{rating_id}", 404)
empty = call("14-read-after-delete", "삭제 결과 확인", "GET", f"/members/{member_id}/ratings", 200)
assert empty["response"] == []


def pretty(value):
    return json.dumps(value, ensure_ascii=False, indent=2)


def render(record):
    status_class = "success" if record["status"] < 300 else "failure"
    request_text = pretty(record["request"]) if record["request"] is not None else "(요청 본문 없음)"
    response_text = pretty(record["response"]) if record["rawBody"] else "(응답 본문 없음 · 0 bytes)"
    content_type = record["headers"].get("Content-Type", "없음")
    return f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>{html.escape(record['title'])}</title>
<style>
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: #eef1f5; color: #1f2937; font-family: "Malgun Gothic", sans-serif; }}
main {{ margin: 32px; background: white; border: 1px solid #d8dee7; border-radius: 12px; padding: 28px 32px; }}
.eyebrow {{ color: #64748b; font-size: 17px; margin-bottom: 10px; }}
h1 {{ font-size: 30px; margin: 0 0 14px; }}
.url {{ padding: 16px; background: #f5f7fa; border: 1px solid #e2e8f0; border-radius: 7px; font-family: Consolas, monospace; font-size: 20px; overflow-wrap: anywhere; }}
.method {{ color: #245cb6; font-weight: 700; margin-right: 14px; }}
.columns {{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }}
h2 {{ font-size: 19px; margin: 0 0 14px; }}
pre {{ font: 18px/1.65 Consolas, "Malgun Gothic", monospace; white-space: pre-wrap; overflow-wrap: anywhere; margin: 0; min-height: 330px; padding: 22px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; }}
.status {{ display: inline-block; padding: 5px 10px; border-radius: 5px; margin-left: 10px; font: bold 17px Consolas, monospace; }}
.success {{ background: #dcfce7; color: #166534; }} .failure {{ background: #ffedd5; color: #9a3412; }}
.meta {{ font-size: 15px; color: #64748b; line-height: 1.8; margin-top: 20px; }}
.notice {{ margin-top: 14px; padding: 12px 16px; border-left: 3px solid #94a3b8; background: #f8fafc; font-size: 15px; line-height: 1.7; }}
</style></head><body><main>
<div class="eyebrow">6주차 Spring Boot 실습 · 실제 HTTP 요청 / 응답 기록</div>
<h1>{html.escape(record['title'])}</h1>
<div class="url"><span class="method">{record['method']}</span>{html.escape(record['url'])}</div>
<div class="columns"><section><h2>Request Body</h2><pre>{html.escape(request_text)}</pre></section>
<section><h2>Response <span class="status {status_class}">{record['status']} {html.escape(record['reason'])}</span></h2><pre>{html.escape(response_text)}</pre></section></div>
<div class="meta">실행 환경: Spring Boot 3.5.0 · Java 21 · H2 (test profile)<br>
실행 시각: {html.escape(captured_at)} · Response Content-Type: {html.escape(content_type)}</div>
<div class="notice">로컬 Spring 서버에서 받은 응답을 저장해 표시한 화면입니다. Postman 화면이 아니며, 원본 상태·헤더·본문은 responses.json에 함께 보관했습니다.</div>
</main></body></html>'''


for record in records:
    if record["key"].startswith("setup-"):
        continue
    (OUTPUT / (record["key"] + ".html")).write_text(render(record), encoding="utf-8")

print(f"Captured {len(records)} real HTTP responses in {OUTPUT}")
