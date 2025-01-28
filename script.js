document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소
    const elements = {
        generateButton: document.getElementById('generate-button'),
        promptText: document.getElementById('prompt-text'),
        subjectInput: document.getElementById('subject'),
        sceneInput: document.getElementById('scene'),
        cameraSelect: document.getElementById('camera'),
        lensSelect: document.getElementById('lens'),
        lightingSelect: document.getElementById('lighting'),
        historyContainer: document.getElementById('history-container')
    };

    // 설정
    const config = {
        maxHistorySize: 5,
        copyTimeout: 1500,
        lensDescriptions: {
            '50mm f/1.8': '표준 렌즈, 자연스러운 원근감과 좋은 보케 효과',
            '85mm f/1.4': '인물 촬영에 최적화된 중망원 렌즈',
            '24-70mm f/2.8': '다목적 표준 줌 렌즈',
            '100mm f/2.8 Macro': '근접 촬영을 위한 매크로 렌즈',
            '70-200mm f/2.8': '스포츠, 야생동물 촬영에 적합한 망원 줌 렌즈',
            '16-35mm f/2.8': '풍경, 건축 촬영에 적합한 광각 줌 렌즈'
        }
    };

    // 상태 관리
    const state = {
        promptHistory: JSON.parse(localStorage.getItem('promptHistory') || '[]')
    };

    // 프리셋 데이터
    const presets = [
        {
            name: '풍경 사진',
            subject: '산과 호수',
            scene: '일몰의',
            camera: 'Canon EOS R5',
            lens: '16-35mm f/2.8',
            lighting: 'golden hour'
        },
        {
            name: '인물 사진',
            subject: '여성 모델',
            scene: '자연스러운 포즈의',
            camera: 'Sony A7 III',
            lens: '85mm f/1.4',
            lighting: 'natural light'
        },
        {
            name: '매크로 사진',
            subject: '꽃',
            scene: '이슬 맺힌',
            camera: 'Nikon D850',
            lens: '100mm f/2.8 Macro',
            lighting: 'soft lighting'
        }
    ];

    // 유틸리티 함수
    const utils = {
        copyToClipboard: async (text) => {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                console.error('복사 실패:', err);
                return false;
            }
        },

        showCopyFeedback: (element, originalText) => {
            element.textContent = '복사되었습니다!';
            setTimeout(() => {
                element.textContent = originalText;
            }, config.copyTimeout);
        },

        saveToLocalStorage: (key, value) => {
            try {
                localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            } catch (err) {
                console.error('저장 실패:', err);
            }
        }
    };

    // 프롬프트 관련 기능
    const promptManager = {
        generate: () => {
            const subject = elements.subjectInput.value.trim();
            const scene = elements.sceneInput.value.trim();

            if (!subject || !scene) {
                alert('주제와 장면을 입력해주세요.');
                return;
            }

            const prompt = `${scene} ${subject}, ${elements.cameraSelect.value}로 촬영, ${elements.lensSelect.value}, ${elements.lightingSelect.value} --ar 16:9`;
            elements.promptText.textContent = prompt;
            historyManager.add(prompt);
            promptManager.select();
        },

        select: () => {
            const range = document.createRange();
            range.selectNode(elements.promptText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    };

    // 히스토리 관리
    const historyManager = {
        add: (prompt) => {
            state.promptHistory = state.promptHistory.filter(p => p !== prompt);
            state.promptHistory.unshift(prompt);
            
            if (state.promptHistory.length > config.maxHistorySize) {
                state.promptHistory.pop();
            }

            utils.saveToLocalStorage('promptHistory', state.promptHistory);
            historyManager.updateUI();
        },

        updateUI: () => {
            if (!elements.historyContainer) return;

            elements.historyContainer.innerHTML = `
                <h3>최근 프롬프트 기록</h3>
                <ul class="history-list">
                    ${state.promptHistory.map((prompt, index) => `
                        <li class="history-item">
                            <span class="history-prompt">${prompt}</span>
                            <button class="copy-btn" data-index="${index}">복사</button>
                        </li>
                    `).join('')}
                </ul>
            `;

            elements.historyContainer.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const index = parseInt(btn.dataset.index);
                    const prompt = state.promptHistory[index];
                    if (await utils.copyToClipboard(prompt)) {
                        utils.showCopyFeedback(btn, '복사');
                    }
                });
            });
        }
    };

    // 자동 저장 설정
    const setupAutoSave = () => {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            const savedValue = localStorage.getItem(input.id);
            if (savedValue) input.value = savedValue;

            input.addEventListener('change', () => {
                utils.saveToLocalStorage(input.id, input.value);
            });
        });
    };

    // 프리셋 설정
    const setupPresets = () => {
        const container = document.createElement('div');
        container.className = 'preset-container';
        container.innerHTML = `
            <h3>프리셋 프롬프트</h3>
            <div class="preset-buttons">
                ${presets.map(preset => `
                    <button class="preset-button" data-preset='${JSON.stringify(preset)}'>
                        ${preset.name}
                    </button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.preset-button').forEach(button => {
            button.addEventListener('click', () => {
                const preset = JSON.parse(button.dataset.preset);
                Object.entries(preset).forEach(([key, value]) => {
                    const input = document.getElementById(key);
                    if (input) {
                        input.value = value;
                        utils.saveToLocalStorage(key, value);
                    }
                });
                promptManager.generate();
            });
        });

        const exampleContainer = document.querySelector('.example-container');
        exampleContainer.insertBefore(container, elements.promptText.parentElement);
    };

    // 렌즈 설명 설정
    const setupLensDescription = () => {
        const description = document.createElement('div');
        description.className = 'lens-description';
        elements.lensSelect.parentNode.appendChild(description);

        const updateDescription = () => {
            description.textContent = config.lensDescriptions[elements.lensSelect.value] || '';
        };

        elements.lensSelect.addEventListener('change', updateDescription);
        updateDescription();
    };

    // 이벤트 리스너 설정
    const setupEventListeners = () => {
        elements.generateButton.addEventListener('click', promptManager.generate);
        elements.promptText.addEventListener('click', async () => {
            if (await utils.copyToClipboard(elements.promptText.textContent)) {
                utils.showCopyFeedback(elements.promptText, elements.promptText.textContent);
            }
        });
    };

    // 초기화
    const init = () => {
        setupAutoSave();
        setupPresets();
        setupLensDescription();
        setupEventListeners();
        historyManager.updateUI();
    };

    // 실행
    init();
});