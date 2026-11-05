"""직접 생성한 로컬 응답 기록 HTML을 headless Chrome으로 PNG 캡처한다."""
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "docs" / "evidence" / "week6"
CHROME = Path(os.environ.get("PROGRAMFILES", r"C:\Program Files")) / "Google/Chrome/Application/chrome.exe"
PROFILE = ROOT / "build" / "practice-capture-chrome"

for page in sorted(OUTPUT.glob("*.html")):
    image = page.with_suffix(".png")
    result = subprocess.run([
        str(CHROME), "--headless", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
        f"--user-data-dir={PROFILE}", "--hide-scrollbars", "--window-size=1440,900",
        f"--screenshot={image}", page.as_uri(),
    ], capture_output=True, timeout=40, creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
    if result.returncode != 0 or not image.exists():
        raise RuntimeError(result.stderr.decode("utf-8", errors="replace"))
    print(image.name)
