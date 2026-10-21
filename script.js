/* 생성의 시선 × 카메라·렌즈 프롬프트 가이드 — 생성기 v2 (vanilla JS, 빌드 없음) */
(function () {
  'use strict';

  // ---------- 어휘 데이터 ----------
  const NONE = { v: '', ko: '(선택 안 함)' };
  const DATA = {
    shots: [NONE,
      { v: 'extreme close-up', ko: '익스트림 클로즈업' },
      { v: 'close-up', ko: '클로즈업' },
      { v: 'medium close-up', ko: '미디엄 클로즈업(바스트샷)' },
      { v: 'medium shot', ko: '미디엄샷(웨이스트샷)' },
      { v: 'cowboy shot', ko: '카우보이샷(니샷)' },
      { v: 'full shot', ko: '풀샷' },
      { v: 'long shot', ko: '롱샷(와이드샷)' },
      { v: 'extreme long shot, tiny figure in a vast space', ko: '익스트림 롱샷' },
      { v: 'establishing shot', ko: '설정샷' },
      { v: 'two-shot', ko: '투샷' },
      { v: 'over-the-shoulder shot', ko: '어깨너머샷(OTS)' },
      { v: 'POV shot, first-person view', ko: '시점샷(POV)' },
      { v: 'insert shot of an object', ko: '인서트(사물)' },
      { v: 'empty frame, environment only, no people', ko: '인물 없는 공간 컷' }
    ],
    angles: [NONE,
      { v: 'eye-level', ko: '아이레벨' },
      { v: 'high angle, looking down', ko: '하이앵글(부감)' },
      { v: 'low angle, looking up', ko: '로우앵글(앙각)' },
      { v: "bird's-eye view, top-down", ko: '버드아이(직부감)' },
      { v: "worm's-eye view", ko: '웜아이' },
      { v: 'Dutch angle, canted frame', ko: '더치앵글(기울임)' },
      { v: 'profile view', ko: '측면' },
      { v: 'seen from behind', ko: '뒷모습' },
      { v: 'ground-level shot', ko: '그라운드레벨' },
      { v: 'aerial drone view', ko: '항공' },
      { v: 'obstructed view, peeking through foreground objects', ko: '가려진 시점' },
      { v: 'reflection shot, seen in a mirror', ko: '반영샷' }
    ],
    lenses: [NONE,
      { v: '8mm fisheye lens', ko: '8mm 어안' },
      { v: '14mm ultra-wide lens', ko: '14mm 초광각' },
      { v: '24mm wide-angle lens', ko: '24mm 광각' },
      { v: '35mm lens', ko: '35mm' },
      { v: '50mm lens', ko: '50mm 표준' },
      { v: '85mm portrait lens', ko: '85mm 인물' },
      { v: '135mm telephoto lens', ko: '135mm 망원' },
      { v: '200mm telephoto, compressed perspective', ko: '200mm 초망원(압축)' },
      { v: '100mm macro lens', ko: '100mm 매크로' },
      { v: 'tilt-shift lens, miniature effect', ko: '틸트시프트' },
      { v: 'anamorphic lens, oval bokeh', ko: '아나모픽' },
      { v: 'pinhole camera', ko: '핀홀' },
      { v: 'Petzval lens, swirly bokeh', ko: '페츠발(소용돌이 보케)' }
    ],
    apertures: [NONE,
      { v: 'f/1.2, extremely shallow depth of field, creamy bokeh', ko: 'f/1.2 극얕은 심도' },
      { v: 'f/1.8, shallow depth of field', ko: 'f/1.8 얕은 심도' },
      { v: 'f/4', ko: 'f/4 중간' },
      { v: 'f/8, deep focus', ko: 'f/8 깊은 심도' },
      { v: 'f/16, everything in sharp focus', ko: 'f/16 전체 선명' },
      { v: 'split diopter, foreground and background both sharp', ko: '스플릿 디옵터' }
    ],
    shutters: [NONE,
      { v: 'frozen motion, 1/4000s shutter', ko: '순간 정지' },
      { v: 'motion blur', ko: '모션 블러' },
      { v: 'panning shot, streaked background', ko: '패닝(배경 흐름)' },
      { v: 'long exposure, light trails', ko: '장노출(빛 궤적)' },
      { v: 'long exposure, silky water', ko: '장노출(물결)' },
      { v: 'intentional camera movement, abstract blur', ko: 'ICM 추상' },
      { v: 'double exposure', ko: '이중 노출' }
    ],
    lighting: [NONE,
      { v: 'golden hour light', ko: '골든아워' },
      { v: 'blue hour', ko: '블루아워' },
      { v: 'overcast soft light', ko: '흐린 날 부드러운 빛' },
      { v: 'harsh midday sun, hard shadows', ko: '한낮 강한 빛' },
      { v: 'window light', ko: '창가 빛' },
      { v: 'dappled light through leaves', ko: '나뭇잎 사이 얼룩빛' },
      { v: 'moonlight', ko: '달빛' },
      { v: 'Rembrandt lighting', ko: '렘브란트' },
      { v: 'split lighting', ko: '스플릿' },
      { v: 'butterfly lighting', ko: '버터플라이' },
      { v: 'loop lighting', ko: '루프' },
      { v: 'rim light, backlit', ko: '림라이트(역광)' },
      { v: 'silhouette against a bright background', ko: '실루엣' },
      { v: 'chiaroscuro, low-key', ko: '키아로스쿠로(로우키)' },
      { v: 'high-key, bright and airy', ko: '하이키' },
      { v: 'volumetric light, god rays', ko: '볼류메트릭(빛줄기)' },
      { v: 'neon practical lights', ko: '네온' },
      { v: 'candlelight', ko: '촛불' },
      { v: 'single bare bulb overhead', ko: '전구 하나' },
      { v: 'on-camera flash, snapshot look', ko: '직광 플래시' },
      { v: 'studio softbox lighting', ko: '스튜디오 소프트박스' }
    ],
    cameras: [NONE,
      { v: 'shot on Hasselblad 500C/M, medium format', ko: '핫셀블라드 500C/M (중형)' },
      { v: 'shot on Mamiya RZ67', ko: '마미야 RZ67 (중형)' },
      { v: 'shot on Leica M6, 35mm film', ko: '라이카 M6 (35mm 필름)' },
      { v: 'shot on Contax T2 with flash', ko: '콘탁스 T2 (스냅)' },
      { v: 'shot on Canon EOS R5', ko: '캐논 EOS R5' },
      { v: 'shot on Sony A7R V', ko: '소니 A7R V' },
      { v: 'shot on Fujifilm X100VI, film simulation', ko: '후지 X100VI' },
      { v: 'ARRI Alexa 35 cinema camera', ko: 'ARRI 알렉사 35 (시네마)' },
      { v: 'RED cinema camera, 8K', ko: 'RED 시네마' },
      { v: 'Bolex 16mm film', ko: '볼렉스 16mm' },
      { v: 'Super 8 film', ko: '슈퍼8' },
      { v: '1990s VHS camcorder footage', ko: '90년대 VHS 캠코더' },
      { v: 'disposable camera with flash', ko: '일회용 카메라' },
      { v: '4x5 large format view camera', ko: '4x5 대형 뷰카메라' },
      { v: 'Polaroid SX-70 instant photo', ko: '폴라로이드 SX-70' },
      { v: 'smartphone photo', ko: '스마트폰' }
    ],
    films: [NONE,
      { v: 'Kodak Portra 400', ko: '코닥 포트라 400' },
      { v: 'Kodak Portra 160', ko: '코닥 포트라 160' },
      { v: 'Kodak Gold 200', ko: '코닥 골드 200' },
      { v: 'Kodak Ektar 100', ko: '코닥 엑타 100' },
      { v: 'CineStill 800T with halation', ko: '시네스틸 800T' },
      { v: 'Fujifilm Velvia 50', ko: '후지 벨비아 50' },
      { v: 'Fujifilm Pro 400H', ko: '후지 Pro 400H' },
      { v: 'Kodak Tri-X 400 black and white', ko: '코닥 트라이X 400 (흑백)' },
      { v: 'Ilford HP5 Plus black and white', ko: '일포드 HP5 (흑백)' },
      { v: 'cross-processed film', ko: '크로스 프로세스' },
      { v: 'bleach bypass look', ko: '블리치 바이패스' },
      { v: 'expired film', ko: '기한 지난 필름' },
      { v: 'wet plate collodion', ko: '습판 콜로디온' },
      { v: 'cyanotype', ko: '시아노타입' }
    ],
    effects: [
      { v: 'lens flare', ko: '렌즈 플레어' },
      { v: 'anamorphic horizontal flare', ko: '아나모픽 수평 플레어' },
      { v: 'chromatic aberration', ko: '색수차' },
      { v: 'vignette', ko: '비네팅' },
      { v: 'film grain', ko: '필름 그레인' },
      { v: 'halation', ko: '할레이션' },
      { v: 'bloom', ko: '블룸' },
      { v: 'light leaks', ko: '라이트 리크' },
      { v: 'barrel distortion', ko: '배럴 왜곡' },
      { v: 'sun starburst', ko: '선스타' },
      { v: 'pro-mist diffusion', ko: '프로미스트 확산' },
      { v: 'rain drops on the lens', ko: '렌즈 위 빗방울' },
      { v: 'shot through glass with reflections', ko: '유리 너머' },
      { v: 'infrared false color', ko: '적외선' },
      { v: 'out-of-focus foreground', ko: '흐린 전경' }
    ],
    compositions: [NONE,
      { v: 'rule of thirds', ko: '삼분할' },
      { v: 'golden spiral composition', ko: '황금나선' },
      { v: 'centered symmetrical composition', ko: '중앙 대칭' },
      { v: 'leading lines', ko: '유도선' },
      { v: 'frame within a frame', ko: '프레임 속 프레임' },
      { v: 'lots of negative space', ko: '넓은 여백' },
      { v: 'foreground occlusion', ko: '전경 가림' },
      { v: 'layered depth, foreground midground background', ko: '겹층 깊이' },
      { v: 'low horizon', ko: '낮은 지평선' },
      { v: 'high horizon', ko: '높은 지평선' },
      { v: 'diagonal composition', ko: '대각선' },
      { v: 'repetition and pattern', ko: '반복 패턴' },
      { v: 'isolated subject', ko: '고립된 피사체' }
    ],
    styles: [
      { v: 'photorealistic photograph', ko: '사진(실사)' },
      { v: 'cinematic film still', ko: '영화 스틸' },
      { v: 'documentary photograph', ko: '다큐멘터리 사진' },
      { v: 'editorial fashion photograph', ko: '패션 화보' },
      { v: 'black and white manga page, ink lines, screentone', ko: '흑백 만화 원고(잉크·톤)' },
      { v: 'Korean webtoon panel, full color', ko: '한국 웹툰(풀컬러)' },
      { v: 'bande dessinée panel, ligne claire', ko: '유럽 만화(방드 데시네)' },
      { v: 'pencil storyboard sketch', ko: '연필 스토리보드' },
      { v: 'watercolor illustration', ko: '수채 일러스트' },
      { v: '3D render', ko: '3D 렌더' }
    ],
    ars: [
      { v: '1:1', ko: '1:1 정사각' },
      { v: '4:5', ko: '4:5 인스타 세로' },
      { v: '3:4', ko: '3:4 세로' },
      { v: '2:3', ko: '2:3 세로(원고 비율)' },
      { v: '9:16', ko: '9:16 쇼츠' },
      { v: '3:2', ko: '3:2 가로' },
      { v: '4:3', ko: '4:3 가로' },
      { v: '16:9', ko: '16:9 와이드' },
      { v: '21:9', ko: '21:9 시네마' },
      { v: '239:100', ko: '2.39:1 아나모픽' }
    ],
    roles: [
      { v: 'establish', ko: '설정샷', d: { shot: 'extreme long shot, tiny figure in a vast space', angle: 'high angle, looking down', lens: '24mm wide-angle lens', light: 'overcast soft light' } },
      { v: 'dialogue', ko: '대화', d: { shot: 'medium close-up', angle: 'eye-level', lens: '85mm portrait lens', light: 'window light' } },
      { v: 'reaction', ko: '리액션', d: { shot: 'close-up', angle: 'eye-level', lens: '85mm portrait lens', light: 'Rembrandt lighting' } },
      { v: 'insert', ko: '인서트', d: { shot: 'insert shot of an object', angle: "bird's-eye view, top-down", lens: '100mm macro lens', light: 'single bare bulb overhead' } },
      { v: 'action', ko: '액션', d: { shot: 'full shot', angle: 'low angle, looking up', lens: '24mm wide-angle lens', light: 'harsh midday sun, hard shadows' } },
      { v: 'climax', ko: '클라이맥스', d: { shot: 'extreme close-up', angle: 'Dutch angle, canted frame', lens: '35mm lens', light: 'chiaroscuro, low-key' } },
      { v: 'afterglow', ko: '여운(인물 없는 컷)', d: { shot: 'empty frame, environment only, no people', angle: 'eye-level', lens: '50mm lens', light: 'blue hour' } }
    ]
  };

  const PHOTO_PRESETS = [
    { name: '안개 속 등대지기', subject: 'an old lighthouse keeper mending a net', scene: 'on a wet stone pier at dawn', shot: 'medium shot', angle: 'seen from behind', lens: '24mm wide-angle lens', aperture: 'f/8, deep focus', shutter: '', light: 'overcast soft light', camera: 'shot on Hasselblad 500C/M, medium format', film: 'Kodak Portra 400', effects: ['film grain'], composition: 'lots of negative space', style: 'photorealistic photograph', ar: '4:5', raw: true, s: 50, c: 0, exp: 0, hd: false, niji: false },
    { name: '비 오는 네온 골목', subject: 'a woman in a red raincoat', scene: 'waiting under a neon sign in a narrow Seoul alley at night', shot: 'long shot', angle: 'obstructed view, peeking through foreground objects', lens: 'anamorphic lens, oval bokeh', aperture: 'f/1.8, shallow depth of field', shutter: '', light: 'neon practical lights', camera: 'ARRI Alexa 35 cinema camera', film: 'CineStill 800T with halation', effects: ['anamorphic horizontal flare', 'rain drops on the lens'], composition: 'frame within a frame', style: 'cinematic film still', ar: '239:100', raw: true, s: 100, c: 0, exp: 10, hd: false, niji: false },
    { name: '결심의 눈 (만화 컷)', subject: "a teenage girl's eyes", scene: 'reflecting a burning letter', shot: 'extreme close-up', angle: 'eye-level', lens: '85mm portrait lens', aperture: 'f/1.8, shallow depth of field', shutter: '', light: 'candlelight', camera: '', film: '', effects: [], composition: 'centered symmetrical composition', style: 'black and white manga page, ink lines, screentone', ar: '3:4', raw: false, s: 100, c: 0, exp: 0, hd: false, niji: true },
    { name: '옥상의 장노출', subject: 'a lone figure standing still', scene: 'on a rooftop while the city traffic streams below', shot: 'extreme long shot, tiny figure in a vast space', angle: 'high angle, looking down', lens: '35mm lens', aperture: 'f/16, everything in sharp focus', shutter: 'long exposure, light trails', light: 'blue hour', camera: 'shot on Sony A7R V', film: '', effects: ['sun starburst'], composition: 'high horizon', style: 'photorealistic photograph', ar: '3:2', raw: true, s: 100, c: 0, exp: 0, hd: true, niji: false }
  ];

  const PLANNER_PRESETS = [
    {
      name: '재회의 밤 (6컷)', subject: '10년 만에 겨울 기차역에서 재회한 두 사람', format: '흑백 인쇄 원고', order: 'ko', style: '일본 만화',
      panels: [
        { role: 'establish', line: '', sfx: '쏴아아' },
        { role: 'dialogue', line: '……오랜만이야', sfx: '' },
        { role: 'reaction', line: '', sfx: '두근' },
        { role: 'insert', line: '', sfx: '' },
        { role: 'climax', line: '왜 이제 와서', sfx: '' },
        { role: 'afterglow', line: '', sfx: '끼이익' }
      ]
    },
    {
      name: '추격 (5컷)', subject: '비 오는 밤 골목에서 벌어지는 추격', format: '흑백 인쇄 원고', order: 'ko', style: '한국 웹툰',
      panels: [
        { role: 'action', line: '거기 서!', sfx: '타다닥' },
        { role: 'insert', line: '', sfx: '철퍽' },
        { role: 'action', line: '', sfx: '콰앙' },
        { role: 'climax', line: '', sfx: '…!' },
        { role: 'afterglow', line: '', sfx: '툭' }
      ]
    },
    {
      name: '고백 (4컷)', subject: '방과 후 텅 빈 교실, 창가의 고백', format: '풀컬러', order: 'ko', style: '한국 웹툰',
      panels: [
        { role: 'establish', line: '', sfx: '' },
        { role: 'dialogue', line: '할 말이 있어', sfx: '' },
        { role: 'reaction', line: '', sfx: '두근' },
        { role: 'afterglow', line: '', sfx: '' }
      ]
    }
  ];

  // ---------- 유틸 ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const koOf = (list, v) => { if (!v) return ''; const hit = list.find((x) => x.v === v); return hit ? hit.ko : ''; };

  const store = {
    get(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; } },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 저장 불가 환경 */ } }
  };

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
      } catch (e2) { return false; }
    }
  }
  function flash(btn, msg) {
    const orig = btn.textContent; btn.textContent = msg; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1400);
  }
  function fillSelect(sel, list, selected) {
    sel.innerHTML = list.map((o) => `<option value="${esc(o.v)}"${o.v === selected ? ' selected' : ''}>${esc(o.ko)}</option>`).join('');
  }

  // ---------- 히스토리 ----------
  const HISTORY_KEY = 'gs-prompt-history-v2';
  const history = {
    items: store.get(HISTORY_KEY, []),
    add(text) {
      this.items = this.items.filter((t) => t !== text);
      this.items.unshift(text);
      this.items = this.items.slice(0, 8);
      store.set(HISTORY_KEY, this.items);
      this.render();
    },
    clear() { this.items = []; store.set(HISTORY_KEY, []); this.render(); },
    render() {
      const box = $('#history');
      if (!box) return;
      if (!this.items.length) { box.innerHTML = '<h4>최근 프롬프트</h4><p class="hint">아직 생성한 프롬프트가 없습니다.</p>'; return; }
      box.innerHTML = '<h4>최근 프롬프트 (이 브라우저에만 저장)</h4><ul>' +
        this.items.map((t, i) => `<li><span>${esc(t.length > 220 ? t.slice(0, 220) + '…' : t)}</span><button class="preset-btn" data-copy="${i}">복사</button></li>`).join('') +
        '</ul><div class="btn-row"><button class="btn ghost" id="history-clear">기록 지우기</button></div>';
      $$('[data-copy]', box).forEach((b) => b.addEventListener('click', async () => { if (await copyText(history.items[+b.dataset.copy])) flash(b, '복사됨'); }));
      const clr = $('#history-clear', box); if (clr) clr.addEventListener('click', () => history.clear());
    }
  };

  // ---------- 탭 ----------
  function setupTabs() {
    const tabs = $$('.gen-tab');
    const panels = $$('.gen-panel');
    function activate(name) {
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== name; });
      store.set('gs-tab', name);
    }
    tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.tab)));
    const q = new URLSearchParams(location.search).get('mode');
    activate(['planner', 'photo', 'illust'].includes(q) ? q : store.get('gs-tab', 'photo'));
  }

  // ---------- 사진·컷 프롬프트 생성기 ----------
  function setupPhoto() {
    const f = {
      subject: $('#p-subject'), scene: $('#p-scene'), shot: $('#p-shot'), angle: $('#p-angle'), lens: $('#p-lens'),
      aperture: $('#p-aperture'), shutter: $('#p-shutter'), light: $('#p-light'), camera: $('#p-camera'), film: $('#p-film'),
      composition: $('#p-composition'), style: $('#p-style'), ar: $('#p-ar'), raw: $('#p-raw'), s: $('#p-s'), c: $('#p-c'),
      exp: $('#p-exp'), hd: $('#p-hd'), niji: $('#p-niji'), sref: $('#p-sref'), no: $('#p-no'), effects: $('#p-effects'),
      out: $('#p-out'), outKo: $('#p-out-ko'), warn: $('#p-warn')
    };
    if (!f.subject) return;

    fillSelect(f.shot, DATA.shots); fillSelect(f.angle, DATA.angles); fillSelect(f.lens, DATA.lenses);
    fillSelect(f.aperture, DATA.apertures); fillSelect(f.shutter, DATA.shutters); fillSelect(f.light, DATA.lighting);
    fillSelect(f.camera, DATA.cameras); fillSelect(f.film, DATA.films); fillSelect(f.composition, DATA.compositions);
    fillSelect(f.style, DATA.styles); fillSelect(f.ar, DATA.ars, '4:5');
    f.effects.innerHTML = DATA.effects.map((e, i) => `<label><input type="checkbox" value="${esc(e.v)}" id="fx-${i}"> ${esc(e.ko)}</label>`).join('');

    // 프리셋
    const pb = $('#p-presets');
    pb.innerHTML = PHOTO_PRESETS.map((p, i) => `<button class="preset-btn" data-preset="${i}">${esc(p.name)}</button>`).join('');
    $$('[data-preset]', pb).forEach((b) => b.addEventListener('click', () => { applyPhotoPreset(PHOTO_PRESETS[+b.dataset.preset]); generate(); }));

    function applyPhotoPreset(p) {
      f.subject.value = p.subject; f.scene.value = p.scene; f.shot.value = p.shot; f.angle.value = p.angle; f.lens.value = p.lens;
      f.aperture.value = p.aperture; f.shutter.value = p.shutter; f.light.value = p.light; f.camera.value = p.camera; f.film.value = p.film;
      f.composition.value = p.composition; f.style.value = p.style; f.ar.value = p.ar; f.raw.checked = !!p.raw; f.s.value = p.s;
      f.c.value = p.c; f.exp.value = p.exp; f.hd.checked = !!p.hd; f.niji.checked = !!p.niji; f.sref.value = ''; f.no.value = '';
      $$('input[type="checkbox"]', f.effects).forEach((cb) => { cb.checked = p.effects.includes(cb.value); });
    }

    function generate() {
      const subject = f.subject.value.trim();
      const scene = f.scene.value.trim();
      if (!subject) { f.subject.focus(); f.warn.textContent = '주제(피사체)를 입력하세요.'; return; }
      const parts = [];
      parts.push(f.style.value);
      parts.push(scene ? `${subject} ${scene}` : subject);
      const cam = [f.shot.value, f.angle.value].filter(Boolean).join(', ');
      if (cam) parts.push(cam);
      const optic = [f.lens.value, f.aperture.value, f.shutter.value].filter(Boolean).join(', ');
      if (optic) parts.push(optic);
      if (f.light.value) parts.push(f.light.value);
      const gear = [f.camera.value, f.film.value].filter(Boolean).join(', ');
      if (gear) parts.push(gear);
      const fx = $$('input:checked', f.effects).map((cb) => cb.value);
      if (fx.length) parts.push(fx.join(', '));
      if (f.composition.value) parts.push(f.composition.value);

      const params = [];
      params.push(`--ar ${f.ar.value}`);
      if (f.niji.checked) params.push('--niji 7');
      if (f.raw.checked) params.push('--raw');
      const s = parseInt(f.s.value, 10); if (!isNaN(s) && s !== 100) params.push(`--s ${Math.max(0, Math.min(1000, s))}`);
      const c = parseInt(f.c.value, 10); if (!isNaN(c) && c > 0) params.push(`--c ${Math.min(100, c)}`);
      const x = parseInt(f.exp.value, 10); if (!isNaN(x) && x > 0) params.push(`--exp ${Math.min(100, x)}`);
      if (f.hd.checked) params.push('--hd');
      const sref = f.sref.value.trim(); if (sref) params.push(`--sref ${sref}`);
      const no = f.no.value.trim(); if (no) params.push(`--no ${no}`);

      const prompt = `${parts.join(', ')} ${params.join(' ')}`.trim();
      f.out.textContent = prompt;

      const ko = [
        koOf(DATA.styles, f.style.value),
        [koOf(DATA.shots, f.shot.value), koOf(DATA.angles, f.angle.value)].filter(Boolean).join(' · '),
        [koOf(DATA.lenses, f.lens.value), koOf(DATA.apertures, f.aperture.value), koOf(DATA.shutters, f.shutter.value)].filter(Boolean).join(' · '),
        koOf(DATA.lighting, f.light.value),
        [koOf(DATA.cameras, f.camera.value), koOf(DATA.films, f.film.value)].filter(Boolean).join(' · '),
        fx.map((v) => koOf(DATA.effects, v)).join(' · '),
        koOf(DATA.compositions, f.composition.value)
      ].filter(Boolean).join(' / ');
      f.outKo.textContent = ko;

      // 생성의 시선 체크
      const warns = [];
      const wordCount = prompt.split(/\s+/).length;
      if (wordCount > 110) warns.push(`단어 수 ${wordCount}: 지나치게 긴 프롬프트는 서로 상쇄됩니다. 50~150 토큰 범위를 권장합니다.`);
      if (/Dutch angle/.test(f.angle.value) && /fisheye/.test(f.lens.value)) warns.push('더치앵글 + 어안: 두 왜곡이 겹칩니다. 장면이 정말 요구하는지 확인하세요.');
      if (f.niji.checked && /photograph|film still/.test(f.style.value)) warns.push('--niji 7은 일러스트·애니 모델입니다. 실사 스타일과 함께 쓰면 결과가 어긋납니다.');
      if (!f.shot.value && !f.angle.value) warns.push('샷과 앵글을 모두 비웠습니다. 카메라 선택은 작가의 해석입니다. 하나는 정하세요.');
      f.warn.textContent = warns.join(' ');
      history.add(prompt);
    }

    $('#p-generate').addEventListener('click', generate);
    $('#p-copy').addEventListener('click', async (e) => { if (f.out.textContent && await copyText(f.out.textContent)) flash(e.currentTarget, '복사됨'); });
    f.out.addEventListener('click', async () => { if (f.out.textContent && await copyText(f.out.textContent)) { f.warn.textContent = '프롬프트를 복사했습니다.'; } });
    $('#p-reset').addEventListener('click', () => { applyPhotoPreset({ subject: '', scene: '', shot: '', angle: '', lens: '', aperture: '', shutter: '', light: '', camera: '', film: '', composition: '', style: DATA.styles[0].v, ar: '4:5', raw: false, s: 100, c: 0, exp: 0, hd: false, niji: false, effects: [] }); f.out.textContent = ''; f.outKo.textContent = ''; f.warn.textContent = ''; });
  }

  // ---------- 컷 플래너 (생성의 시선) ----------
  function setupPlanner() {
    const g = { subject: $('#g-subject'), count: $('#g-count'), format: $('#g-format'), order: $('#g-order'), style: $('#g-style'), list: $('#g-panels'), out: $('#g-out'), outMj: $('#g-out-mj'), warn: $('#g-warn') };
    if (!g.subject) return;

    const lensSubset = DATA.lenses.filter((l) => !/pinhole|Petzval|fisheye|tilt-shift/.test(l.v));
    const lightSubset = DATA.lighting.filter((l) => !/softbox|smartphone/.test(l.v));

    function panelRow(i, p) {
      const role = DATA.roles.find((r) => r.v === p.role) || DATA.roles[0];
      return `<div class="panel-row" data-i="${i}">
        <div class="idx">${i + 1}</div>
        <div class="panel-fields">
          <div class="field"><label>역할</label><select data-k="role">${DATA.roles.map((r) => `<option value="${r.v}"${r.v === role.v ? ' selected' : ''}>${r.ko}</option>`).join('')}</select></div>
          <div class="field"><label>샷</label><select data-k="shot"></select></div>
          <div class="field"><label>앵글</label><select data-k="angle"></select></div>
          <div class="field"><label>렌즈</label><select data-k="lens"></select></div>
          <div class="field"><label>조명</label><select data-k="light"></select></div>
          <div class="field"><label>대사 (15자 이내, 최대 2개: /로 구분)</label><input type="text" data-k="line" value="${esc(p.line || '')}" placeholder="없으면 비움"></div>
          <div class="field"><label>효과음</label><input type="text" data-k="sfx" value="${esc(p.sfx || '')}" placeholder="예: 쾅, 두근"></div>
        </div>
      </div>`;
    }

    function render(panels) {
      g.list.innerHTML = panels.map((p, i) => panelRow(i, p)).join('');
      $$('.panel-row', g.list).forEach((row, i) => {
        const p = panels[i];
        const role = DATA.roles.find((r) => r.v === p.role) || DATA.roles[0];
        fillSelect($('[data-k="shot"]', row), DATA.shots, p.shot || role.d.shot);
        fillSelect($('[data-k="angle"]', row), DATA.angles, p.angle || role.d.angle);
        fillSelect($('[data-k="lens"]', row), lensSubset, p.lens || role.d.lens);
        fillSelect($('[data-k="light"]', row), lightSubset, p.light || role.d.light);
        $('[data-k="role"]', row).addEventListener('change', (e) => {
          const r = DATA.roles.find((x) => x.v === e.target.value);
          $('[data-k="shot"]', row).value = r.d.shot; $('[data-k="angle"]', row).value = r.d.angle;
          $('[data-k="lens"]', row).value = r.d.lens; $('[data-k="light"]', row).value = r.d.light;
        });
      });
    }

    function readPanels() {
      return $$('.panel-row', g.list).map((row) => ({
        role: $('[data-k="role"]', row).value, shot: $('[data-k="shot"]', row).value, angle: $('[data-k="angle"]', row).value,
        lens: $('[data-k="lens"]', row).value, light: $('[data-k="light"]', row).value,
        line: $('[data-k="line"]', row).value.trim(), sfx: $('[data-k="sfx"]', row).value.trim()
      }));
    }

    function defaultPanels(n) {
      const seq = ['establish', 'dialogue', 'reaction', 'insert', 'action', 'climax', 'afterglow', 'dialogue'];
      return Array.from({ length: n }, (_, i) => ({ role: seq[i % seq.length], line: '', sfx: '' }));
    }

    function resize() {
      const n = Math.max(1, Math.min(12, parseInt(g.count.value, 10) || 6));
      g.count.value = n;
      const cur = readPanels();
      const next = Array.from({ length: n }, (_, i) => cur[i] || defaultPanels(n)[i]);
      render(next);
    }

    function applyPreset(p) {
      g.subject.value = p.subject; g.format.value = p.format; g.order.value = p.order; g.style.value = p.style;
      g.count.value = p.panels.length; render(p.panels.map((x) => ({ ...x })));
      generate();
    }

    const pb = $('#g-presets');
    pb.innerHTML = PLANNER_PRESETS.map((p, i) => `<button class="preset-btn" data-preset="${i}">${esc(p.name)}</button>`).join('');
    $$('[data-preset]', pb).forEach((b) => b.addEventListener('click', () => applyPreset(PLANNER_PRESETS[+b.dataset.preset])));

    function generate() {
      const subject = g.subject.value.trim();
      if (!subject) { g.subject.focus(); g.warn.textContent = '주제를 입력하세요.'; return; }
      const panels = readPanels();
      const warns = [];
      const orderText = g.order.value === 'jp' ? '오른쪽에서 왼쪽, 위에서 아래(일본식)' : '왼쪽에서 오른쪽, 위에서 아래(한국식)';
      const lines = panels.map((p, i) => {
        const roleKo = koOf(DATA.roles, p.role);
        const cam = [koOf(DATA.shots, p.shot), koOf(DATA.angles, p.angle), koOf(DATA.lenses, p.lens), koOf(DATA.lighting, p.light)].filter(Boolean).join(', ');
        const bubbles = p.line ? p.line.split('/').map((s) => s.trim()).filter(Boolean) : [];
        if (bubbles.length > 2) warns.push(`컷 ${i + 1}: 말풍선이 ${bubbles.length}개입니다. 한 컷에 최대 2개로 줄이세요.`);
        bubbles.forEach((b) => { if (b.length > 15) warns.push(`컷 ${i + 1}: "${b}"는 ${b.length}자입니다. 15자 이내로 줄이세요.`); });
        const lineText = bubbles.length ? bubbles.map((b) => `"${b}"`).join(' / ') : '없음';
        const sfx = p.sfx || '없음';
        return `컷 ${i + 1} (${roleKo}): ${cam}. 대사: ${lineText}. 효과음: ${sfx}.`;
      });

      // 생성의 시선 점검: 반복 조합, 특수 앵글 과다
      const combos = panels.map((p) => `${p.shot}|${p.angle}|${p.lens}`);
      const dupes = combos.filter((c, i) => combos.indexOf(c) !== i);
      if (dupes.length) warns.push('같은 카메라 조합(샷·앵글·렌즈)이 반복됩니다. 반복에는 이유(리듬, 대구, 변주의 기준점)가 있어야 합니다.');
      const special = panels.filter((p) => p.angle && !/^eye-level$/.test(p.angle)).length;
      if (panels.length >= 4 && special === panels.length) warns.push('모든 컷이 특수 앵글입니다. 앵글은 장면이 요구할 때 배치합니다. 목록을 채우기 위해 쓰지 않습니다.');
      const ecu = panels.filter((p) => /extreme close-up/.test(p.shot)).length;
      if (ecu >= 3) warns.push('익스트림 클로즈업이 3컷 이상입니다. 강약이 사라집니다.');

      const text = [
        '[생성의 시선 · 출판 원고 컷 플랜]',
        `주제: ${subject}`,
        `형식: ${g.format.value} / 작화: ${g.style.value} / 읽기 순서: ${orderText}`,
        `컷 수: ${panels.length} (B4 원고 규격, 세로 약 2:3)`,
        '',
        ...lines,
        '',
        '규칙:',
        '- 예술적 경지에 오른 만화 작가가 완성한, 출판 가능한 실제 종이 만화 원고 한 장을 그린다. 펜 마감, 먹칠, 톤, 말풍선, 대사, 효과음, 효과선까지 모두 들어간다.',
        '- 카메라와 렌즈의 선택은 작가의 해석이다. 위 컷의 앵글은 장면이 요구하는 것이며, 인물과 자연스럽게 조화한다.',
        '- 얼굴, 손, 핵심 동작은 매우 정밀하게 그린다. 강조하지 않을 부분은 선 굵기·밀도·톤·배경 생략으로 힘을 뺀다. 연필 밑선, 구조선, 가이드라인은 남기지 않는다.',
        '- 인물의 얼굴, 체형, 머리 모양, 복장은 모든 컷에서 일치한다.',
        '- 말풍선은 읽기 순서를 따르고 얼굴과 핵심 동작을 가리지 않는다. 한 컷에 최대 2개, 한 말풍선 15자 이내. 입력된 대사는 한 글자도 바꾸지 않고 그대로 쓴다. 대사가 "없음"인 컷에는 말풍선을 넣지 않는다.',
        '- 효과음은 손으로 그린 레터링이며, 소리의 성질에 따라 크기·굵기·질감이 달라진다. 효과음이 "없음"인 컷에는 넣지 않는다.',
        '- 워터마크, 서명, 페이지 번호, 제작 메모는 없다.'
      ].join('\n');
      g.out.textContent = text;

      // 미드저니용 컷별 프롬프트 (Niji 7)
      const mj = panels.map((p, i) => {
        const style = g.format.value === '풀컬러' ? 'full color webtoon panel' : 'black and white manga panel, ink lines, screentone';
        const parts = [style, subject, p.shot, p.angle, p.lens, p.light].filter(Boolean);
        return `#${i + 1} ${parts.join(', ')} --niji 7 --ar 3:4`;
      }).join('\n');
      g.outMj.textContent = mj;
      g.warn.textContent = warns.join(' ');
      history.add(text);
    }

    g.count.addEventListener('change', resize);
    $('#g-generate').addEventListener('click', generate);
    $('#g-copy').addEventListener('click', async (e) => { if (g.out.textContent && await copyText(g.out.textContent)) flash(e.currentTarget, '복사됨'); });
    $('#g-copy-mj').addEventListener('click', async (e) => { if (g.outMj.textContent && await copyText(g.outMj.textContent)) flash(e.currentTarget, '복사됨'); });
    $('#g-reset').addEventListener('click', () => { g.subject.value = ''; g.count.value = 6; render(defaultPanels(6)); g.out.textContent = ''; g.outMj.textContent = ''; g.warn.textContent = ''; });

    render(defaultPanels(6));
  }

  // ---------- 원서 삽화 모드 (생성의 시선 × 카메라 가이드 맞춤판) ----------
  const ILLUST_PRESETS = [
    { name: '등대지기의 새벽 (설정샷)', book: 'The Lighthouse Keeper', chapter: 1, scene: 'a girl mending a fishing net on a wet stone pier at dawn while gulls circle the lighthouse', card: '12-year-old girl, short dark hair tied back, oversized grey wool sweater, rolled trousers, bare feet, thin and quick', role: 'establish', use: 'chapter', model: 'niji', format: 'bw', sref: '' },
    { name: '열쇠 (인서트)', book: 'The Lighthouse Keeper', chapter: 2, scene: 'a small brass key lying on a wet stone step, seen from directly above', card: '', role: 'insert', use: 'chapter', model: 'gpt', format: 'bw', sref: '' },
    { name: '회차 요약 4컷', book: 'The Lighthouse Keeper', chapter: 4, scene: 'the storm reaches the pier / the girl rows toward the sandbar / the keeper shouts from the tower / the empty boat drifts at dawn', card: '12-year-old girl, short dark hair tied back, oversized grey wool sweater; the keeper: tall, white beard, oilskin coat', role: 'establish', use: 'strip', model: 'niji', format: 'bw', sref: '' },
    { name: '11월 포스터', book: 'The Lighthouse Keeper', chapter: 0, scene: 'a lighthouse on a rocky pier at blue hour, one small figure walking toward it with a lantern', card: '', role: 'establish', use: 'poster', model: 'gpt', format: 'color', sref: '' }
  ];

  function setupIllustration() {
    const b = { book: $('#b-book'), chapter: $('#b-chapter'), scene: $('#b-scene'), card: $('#b-card'), role: $('#b-role'), use: $('#b-use'), model: $('#b-model'), format: $('#b-format'), sref: $('#b-sref'), out: $('#b-out'), outKo: $('#b-out-ko'), warn: $('#b-warn') };
    if (!b.book) return;
    b.role.innerHTML = DATA.roles.filter((r) => r.v !== 'climax').map((r) => `<option value="${r.v}">${esc(r.ko)}</option>`).join('');
    const pb = $('#b-presets');
    pb.innerHTML = ILLUST_PRESETS.map((p, i) => `<button class="preset-btn" data-preset="${i}">${esc(p.name)}</button>`).join('');
    $$('[data-preset]', pb).forEach((btn) => btn.addEventListener('click', () => { const p = ILLUST_PRESETS[+btn.dataset.preset]; b.book.value = p.book; b.chapter.value = p.chapter || ''; b.scene.value = p.scene; b.card.value = p.card; b.role.value = p.role; b.use.value = p.use; b.model.value = p.model; b.format.value = p.format; b.sref.value = p.sref; generate(); }));

    const STRIP_ROLES = ['establish', 'action', 'reaction', 'afterglow'];
    const FORBIDDEN = /(삽화가|illustrator|illustrated by|표지|cover art|영화|movie|film version|netflix|disney|ghibli|pixar|in the style of [A-Z])/i;

    function camOf(roleKey) { const r = DATA.roles.find((x) => x.v === roleKey) || DATA.roles[0]; return r.d; }
    function camEn(d) { return [d.shot, d.angle, d.lens, d.light].filter(Boolean).join(', '); }
    function camKo(d) { return [koOf(DATA.shots, d.shot), koOf(DATA.angles, d.angle), koOf(DATA.lenses, d.lens), koOf(DATA.lighting, d.light)].filter(Boolean).join(', '); }

    function generate() {
      const book = b.book.value.trim(); const scene = b.scene.value.trim(); const card = b.card.value.trim();
      const chapter = b.chapter.value.trim(); const use = b.use.value; const model = b.model.value; const format = b.format.value;
      if (!book || !scene) { b.warn.textContent = '책 제목과 장면을 입력하세요.'; (book ? b.scene : b.book).focus(); return; }
      const warns = [];
      if (FORBIDDEN.test(scene + ' ' + card + ' ' + book)) warns.push('원작 삽화·표지·영화·특정 작가 스타일을 가리키는 말이 있습니다. 규약: 원작 삽화와 영화 디자인을 참조하지 않는다.');
      if (use !== 'poster' && !card) warns.push('인물 외형 카드가 비어 있습니다. 책 한 권 안에서 인물이 같아 보이려면 카드가 필요합니다.');
      if (use === 'poster' && format !== 'color') warns.push('포스터는 풀컬러가 기본입니다.');
      if (use === 'chapter' && format === 'color') warns.push('챕터 삽화는 흑백 선화 + 회색 톤 2단계가 기본입니다(인쇄 비용).');

      const material = format === 'color' ? 'full color illustration, flat colors with soft shading' : 'black and white line art with two-step grey tone, clean ink lines, no cross-hatching noise';
      const common = ['original character design (do not reference any published illustration, book cover or film adaptation)', 'no text, no letters, no captions, no speech bubbles, no watermark', 'no paper texture, no vintage filter'];
      let en = ''; let ko = '';
      const ar = use === 'poster' ? '2:3' : use === 'strip' ? '2:3' : '4:5';
      const params = [`--ar ${ar}`];
      if (model === 'niji') params.push('--niji 7');
      params.push('--raw'); if (b.sref.value.trim()) params.push(`--sref ${b.sref.value.trim()}`); params.push('--no text, letters, watermark, signature');

      if (use === 'strip') {
        const scenes = scene.split('/').map((s) => s.trim()).filter(Boolean);
        if (scenes.length !== 4) warns.push(`4컷 스트립은 장면 4개를 '/'로 나눠 입력합니다 (지금 ${scenes.length}개).`);
        const panels = STRIP_ROLES.map((r, i) => ({ role: r, scene: scenes[i] || `(scene ${i + 1})`, d: camOf(r) }));
        en = [`four-panel vertical comic strip for a student reading workbook, session recap of "${book}"${chapter ? ` (chapters ${chapter})` : ''}, ${material}`,
          ...panels.map((p, i) => `panel ${i + 1} (${p.role}): ${p.scene}, ${camEn(p.d)}`),
          card ? `characters consistent in every panel: ${card}` : '', ...common, 'thin panel borders, even gutters, white margin around the strip'].filter(Boolean).join('; ') + ' ' + params.join(' ');
        ko = ['[원서 삽화 · 생성의 시선 맞춤판 · 회차 요약 4컷 스트립]', `책: ${book}${chapter ? ` / 범위: ${chapter}장` : ''}`, `형식: ${format === 'color' ? '풀컬러' : '흑백 선화 + 회색 톤 2단계'} / 세로 4컷, 얇은 테두리, 균일한 간격, 바깥 여백`, '',
          ...panels.map((p, i) => `컷 ${i + 1} (${koOf(DATA.roles, p.role)}): ${p.scene}. 카메라: ${camKo(p.d)}.`), '',
          card ? `인물 외형 카드(모든 컷에서 동일): ${card}` : '인물 외형 카드: 없음(인물이 없는 장면만)', '',
          '규칙:', '- 원작 삽화·표지·영화 캐릭터 디자인을 참조하지 않는다. 인물은 위 외형 카드만 따른다.', '- 이미지에 글자, 말풍선, 효과음, 캡션을 넣지 않는다. 글자는 조판에서 얹는다.',
          '- 완성도 약 120%. 펜 마감, 밑선·구조선 없음. 강조하지 않을 부분은 선 굵기와 톤으로 힘을 뺀다.', '- 종이 질감·빈티지 필터 금지. 4컷의 카메라는 위 지정을 따르며 특수 앵글은 한 컷에만 쓴다.'].join('\n');
      } else if (use === 'poster') {
        const d = camOf('establish');
        en = [`${material}, promotional poster illustration for a Saturday reading class on "${book}"`, scene, camEn(d), card ? `character: ${card}` : '',
          'leave clean empty space across the top third and bottom band for title typography added later', ...common].filter(Boolean).join(', ') + ' ' + params.join(' ');
        ko = ['[원서 삽화 · 생성의 시선 맞춤판 · 홍보 포스터]', `책: ${book}`, `장면: ${scene}`, `카메라: ${camKo(d)}`, `형식: 풀컬러 일러스트. 위 1/3과 아래 띠는 제목·날짜·가격을 나중에 얹도록 비워 둔다.`,
          card ? `인물 외형 카드: ${card}` : '', '', '규칙:', '- 원작 삽화·표지·영화 캐릭터 디자인을 참조하지 않는다.', '- 이미지에 글자를 넣지 않는다. 글자는 조판 단계에서 얹는다.', '- 종이 질감·빈티지 필터 금지. 완성도 약 120%.'].filter((l) => l !== '').join('\n');
      } else {
        const d = camOf(b.role.value);
        en = [`${material}, chapter illustration for a student reading workbook, "${book}"${chapter ? ` chapter ${chapter}` : ''}`, scene, camEn(d), card ? `character: ${card}` : '',
          'generous white space on one side for student notes', ...common].filter(Boolean).join(', ') + ' ' + params.join(' ');
        ko = ['[원서 삽화 · 생성의 시선 맞춤판 · 챕터 삽화 1컷]', `책: ${book}${chapter ? ` / 장: ${chapter}` : ''}`, `장면: ${scene}`, `컷 역할: ${koOf(DATA.roles, b.role.value)} / 카메라: ${camKo(d)}`,
          `형식: ${format === 'color' ? '풀컬러' : '흑백 선화 + 회색 톤 2단계'}. 한쪽에 학생 메모용 여백을 남긴다.`, card ? `인물 외형 카드: ${card}` : '인물 외형 카드: 없음', '',
          '규칙:', '- 원작 삽화·표지·영화 캐릭터 디자인을 참조하지 않는다. 인물은 위 외형 카드만 따른다.', '- 이미지에 글자, 캡션, 말풍선을 넣지 않는다.', '- 완성도 약 120%. 펜 마감, 밑선·구조선 없음. 종이 질감·빈티지 필터 금지.', '- 장면은 해당 장에 실제로 있는 사건이어야 한다. 원작 삽화와 다른 구도로 그린다.'].join('\n');
      }
      b.out.textContent = en; b.outKo.textContent = ko; b.warn.textContent = warns.join(' ');
      history.add(model === 'niji' ? en : ko);
    }

    $('#b-generate').addEventListener('click', generate);
    $('#b-copy').addEventListener('click', async (e) => { if (b.out.textContent && await copyText(b.out.textContent)) flash(e.currentTarget, '복사됨'); });
    $('#b-copy-ko').addEventListener('click', async (e) => { if (b.outKo.textContent && await copyText(b.outKo.textContent)) flash(e.currentTarget, '복사됨'); });
    $('#b-reset').addEventListener('click', () => { ['book', 'chapter', 'scene', 'card', 'sref'].forEach((k) => { b[k].value = ''; }); b.role.value = 'establish'; b.use.value = 'chapter'; b.model.value = 'niji'; b.format.value = 'bw'; b.out.textContent = ''; b.outKo.textContent = ''; b.warn.textContent = ''; });
    b.use.addEventListener('change', () => { b.format.value = b.use.value === 'poster' ? 'color' : 'bw'; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupPhoto();
    setupPlanner();
    setupIllustration();
    history.render();
  });
})();
