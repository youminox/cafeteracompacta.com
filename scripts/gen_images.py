#!/usr/bin/env python3
"""
Genera imágenes de ambiente para cafeteracompacta.com vía la Edge Function cafetera-images
(Supabase charlielingan → OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (< 68 KB, siempre < 100 KB) en public/img/.

Uso:
  python3 scripts/gen_images.py home        # genera imágenes de la Home y de los 12 silos
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/cafetera-images"
TOKEN = "cafetera-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

HOME_PROMPTS = {
    "home-hero-cafetera": "A sleek compact brushed stainless steel espresso machine with a round analog pressure gauge on a modern walnut and white quartz kitchen countertop, extracting rich tiger-striped hazelnut espresso crema into a double-walled glass cup on a mini digital scale, warm morning sunlight",
    "og-default": "A premium compact stainless steel espresso machine centered on a modern kitchen counter next to a compact conical burr coffee grinder, a bottomless portafilter and a cappuccino with heart latte art, warm editorial studio daylight",
    "home-casabrews-cm5418": "A slim 15cm brushed stainless steel compact espresso machine with a central round pressure gauge on a bright modern kitchen counter, pulling a rich double shot of espresso with thick golden crema, morning light",
    "home-breville-bambino": "A compact stainless steel espresso machine with clean minimalist buttons on a modern kitchen counter, steaming glossy microfoam milk in a stainless steel pitcher next to a fresh espresso shot",
    "home-delonghi-dedica": "An ultra-slim 15cm metallic Italian compact espresso machine with a professional stainless steel steam wand on a small apartment kitchen counter, pouring a silky latte art heart",
    "home-molinos-espresso": "A compact black electric conical burr coffee grinder on a walnut counter next to roasted coffee beans, a metallic dosing cup and a portafilter with magnetic dosing funnel, warm morning light",
    "home-accesorios-51-54": "A curated barista flat lay on a wooden board featuring a naked bottomless portafilter with walnut handle, a calibrated spring tamper, a 0.3mm needle WDT distributor, a stainless steel puck screen and a mini digital espresso scale",
    "home-latte-art": "Close-up of a brushed stainless steel barista milk pitcher pouring silky microfoam into a ceramic cup of espresso, forming a crisp white tulip latte art on a warm kitchen counter",
    "home-coffee-corner": "A cozy organized compact coffee corner in a small modern apartment kitchen, featuring a 15cm slim stainless steel espresso machine, a compact grinder on top of a steel knock box drawer, and ceramic espresso cups",
    "cat-resenas-cafeteras": "A brushed stainless steel compact espresso machine extracting rich hazelnut crema into a glass cup on a sunlit modern kitchen counter, editorial product photography",
    "cat-comparativas": "Two different compact stainless steel espresso machines placed side by side on a clean walnut countertop with portafilters and espresso cups, warm daylight",
    "cat-mejores-cafeteras-y-accesorios": "A complete compact home espresso bar with a slim stainless steel espresso machine, conical burr grinder, mini scale, tamper and milk pitcher in a bright kitchen",
    "cat-molinos-y-molienda": "A compact conical burr coffee grinder grinding fresh espresso beans into a metal dosing cup next to a portafilter on a wooden counter",
    "cat-espumadores-y-latte-art": "A stainless steel milk pitcher pouring glossy microfoam into an espresso cup creating heart latte art next to a compact espresso machine steam wand",
    "cat-basculas-y-accesorios-barista": "Precision espresso accessories on a wooden counter: bottomless portafilter, calibrated spring tamper, WDT needle tool, puck screen and mini digital coffee scale",
    "cat-extraccion-y-recetas-espresso": "Close-up of a bottomless naked portafilter extracting golden tiger-striped espresso into a glass cup sitting on a mini digital scale showing 36 grams",
    "cat-mantenimiento-y-descalcificacion": "A sparkling clean brushed stainless steel compact espresso machine with a clear water tank and clean portafilter on a bright hygienic kitchen countertop",
    "cat-problemas-y-soluciones": "Close-up of the analog pressure gauge on a stainless steel compact espresso machine pointing to the optimal espresso zone while brewing a rich shot",
    "cat-espacios-pequenos-y-coffee-corner": "A minimalist compact coffee station in a small apartment kitchen corner under upper cabinets with a slim espresso machine and compact grinder",
    "cat-cafe-en-grano-y-agua": "Fresh medium-roasted espresso coffee beans in a ceramic bowl next to a matte black vacuum coffee canister and a glass pitcher of filtered water",
    "cat-ciencia-y-tecnologia-espresso": "Technical studio close-up of a stainless steel espresso machine group head, bottomless portafilter and steam wand with warm golden rim light",
}


def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json", "x-cafetera-token": TOKEN},
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    # Límite estricto: <= 68 KB para la imagen 1200x675 (siempre < 100 KB como pidió el usuario)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        r = im.resize((width, round(width * 9 / 16)), Image.LANCZOS)
        q = 78
        while True:
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf] or q <= 38:
                break
            q -= 5
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists():
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=5) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)


if __name__ == "__main__":
    main()
