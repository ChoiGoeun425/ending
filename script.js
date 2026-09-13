/* ==========================================================
   초자연 재난관리국
   사이트 03 - 선비와의 조우
========================================================== */


/* ==========================================================
   DOM 요소
========================================================== */

const painting =
    document.querySelector("#painting");

const dialogueBox =
    document.querySelector("#dialogueBox");

const dialogueName =
    document.querySelector("#dialogueName");

const dialogueText =
    document.querySelector("#dialogueText");

const choiceBox =
    document.querySelector("#choiceBox");

const talkChoice =
    document.querySelector("#talkChoice");

const ignoreChoice =
    document.querySelector("#ignoreChoice");

const faceReveal =
    document.querySelector("#faceReveal");

const scholarScene =
    document.querySelector("#scholarScene");

const scholarDialogue =
    document.querySelector("#scholarDialogue");

const scholarDialogueName =
    document.querySelector("#scholarDialogueName");

const scholarDialogueText =
    document.querySelector("#scholarDialogueText");

const backgroundPainting =
    document.querySelector("#backgroundPainting");

const truePainting =
    document.querySelector("#truePainting");

const recordWindow =
    document.querySelector("#recordWindow");

const recordWindowClose =
    document.querySelector("#recordWindowClose");

const endingChoiceBox =
    document.querySelector("#endingChoiceBox");

const askJ3Choice =
    document.querySelector("#askJ3Choice");

const revealChoice =
    document.querySelector("#revealChoice");

const revealAnswerBox =
    document.querySelector("#revealAnswerBox");

const revealAnswerInput =
    document.querySelector("#revealAnswerInput");

const revealAnswerButton =
    document.querySelector("#revealAnswerButton");

const revealAnswerMessage =
    document.querySelector("#revealAnswerMessage");




/* ==========================================================
   게임 상태
==========================================================

   story
   choice
   response
   zooming
   faceReveal
   scholar
========================================================== */

let gameMode = "story";

let conversationCount = 0;
let conversationDialogueIndex = 0;

let zoomCount = 0;
const maxZoomCount = 4;


/*
    원하는 횟수만큼 수정 가능.
    현재는 4회.
*/

const maxConversationCount = 4;


/* ==========================================================
   타이핑 변수
========================================================== */

let isTyping = false;

let typingTimer = null;

let currentTypingText = "";

let currentTypingElement = null;

/* ==========================================================
   「영원을.」 특수 연출
========================================================== */

/* ==========================================================
   「영원을.」 특수 연출
========================================================== */

let eternityScene = null;


/*
    검은 화면 생성
*/

function createEternityScene() {

    if (eternityScene) {
        return;
    }

    eternityScene =
        document.createElement("div");

    eternityScene.id =
        "eternityScene";

    eternityScene.innerHTML = `
        <div id="eternityText">
            영원을.
        </div>
    `;

    document.body.appendChild(
        eternityScene
    );
}


/*
    「영원을.」 연출
*/

async function showEternityScene() {

    createEternityScene();

    gameMode = "eternity";


    /*
        선비 화면은 건드리지 않는다.
        현재 확대된 상태 그대로 유지.
    */

    eternityScene.classList.remove("hide");


    /*
        검은 화면 등장
    */

    await wait(30);

    eternityScene.classList.add("show");


    /*
        「영원을.」 유지
    */

    await wait(1700);


    /*
        검은 화면 퇴장
    */

    eternityScene.classList.remove("show");

    eternityScene.classList.add("hide");


    await wait(500);


    /*
        다음 대사
    */

    scholarIndex++;

    gameMode = "scholar";

    showScholarDialogue();

}

/* ==========================================================
   기우제 독백
========================================================== */

let ritualScene = null;


function createRitualScene() {

    if (ritualScene) {
        return;
    }


    ritualScene =
        document.createElement("div");

    ritualScene.id =
        "ritualScene";


    ritualScene.innerHTML = `

        <div id="ritualText">

            <div class="ritual-line first">
                범이시여!
            </div>

            <div class="ritual-line second">
                오늘도, 제물을 바치러 왔나이다!
            </div>

        </div>

    `;


    document.body.appendChild(
        ritualScene
    );

}


/* ==========================================================
   기우제 독백 재생
========================================================== */

/* ==========================================================
   기우제 독백 재생
========================================================== */

async function showRitualScene() {

    createRitualScene();

    gameMode = "ritual";


    const first =
        ritualScene.querySelector(
            ".ritual-line.first"
        );

    const second =
        ritualScene.querySelector(
            ".ritual-line.second"
        );


    /*
        초기화
    */

    first.classList.remove("active");
    second.classList.remove("active");


    /*
        검은 화면 등장
    */

    ritualScene.classList.add("show");

    await wait(700);


    /*
        범이시여!
    */

    first.classList.add("active");

    await wait(3300);


    /*
        첫 번째 문장 제거
    */

    first.classList.remove("active");

    await wait(500);


    /*
        오늘도, 제물을 바치러 왔나이다!
    */

    second.classList.add("active");

    await wait(3500);


    /*
        기우제 문장만 제거
        검은 화면은 그대로 유지
    */

    second.classList.remove("active");

    await wait(700);


    /*
        방문자 이름 호출
    */

    await showOfferingScene();

}

/* ==========================================================
   초반 대사
========================================================== */

const introDialogues = [

    {
        name: "김솔음",
        text: "......마지막 그림."
    },

    {
        name: "",
        text: "산에 나있는 길 끝에 누군가 서 있다."
    },

    {
        name: "김솔음",
        text: "한복과 저 갓이라면...."
    },

    {
        name: "김솔음",
        text: "실종자일 확률은 적어."
    },

    {
        name: "",
        text: "이 그림에 애초부터 있던 존재거나,"
    },

    {
        name: "",
        text: "계속해서 보여주는 기억의 주인일지도 모른다."
    },

    {
        name: "",
        text: "그게 아니라면...."
    },

    {
        name: "???",
        text: "이번에는 참 의심이 많은 청년이 왔나보구나."
    },

    {
        name: "김솔음",
        text: "......!"
    },

    {
        name: "???",
        text: "그리 놀랄 일이었는가? 자네도 나에 대해 어느정도는 알고 있는 것 같은데."
    },

    {
        name: "",
        text: "장인석이 모아놓은 스크랩북에는 분명,"
    },

    {
        name: "",
        text: "호랑이와 곶감, 해와 달이 된 오누이를 제외하고도 한 가지가 남아있었다."
    },

    {
        name: "",
        text: "박지원의...... '호질'."
    },

    {
        name: "김솔음",
        text: "......당신이십니까?"
    },

    {
        name: "김솔음",
        text: "이 모든 일의 원흉이자, 인간에게 악의를 품고 있는 영물이."
    },

    {
        name: "???",
        text: "글쎄, 귀가 먹었는지 잘 안 들리네."
    },

    {
        name: "???",
        text: "어디 이리로 오지 않겠는가?"
    },

    {
        name: "김솔음",
        text: "......"

    }

];

let introIndex = 0;


/* ==========================================================
   선택 이후 대사
==========================================================

   두 선택지는 실제 분기가 아니라
   같은 방향으로 진행된다.

   필요하면 각 선택별 문장을 따로 바꿀 수 있음.
========================================================== */

const conversationDialogues = [

    {
        talk: [{
            name: "김솔음",
            text: "오는 길에 여러 기억들을 보았습니다."
        },

        {
            name: "김솔음",
            text: "곶감, 아이 그리고.... '우연'이라는 이름."
        },

        {
            name: "김솔음",
            text: "우연과 당신은.... 막역한 사이였습니까?"
        },
        ],

        ignore: [{
            name: "김솔음",
            text: "……"
        },

        {
            name: "",
            text: "선비는 계속해서 이쪽을 바라보았다."
        },

        {
            name: "",
            text: "무언가 조급하면서도 그런 낌새를 숨기려는 양 갓을 고쳐썼다."
        },
        ],

        response: {
            name: "???",
            text: "거기서 계속 그럴 텐가? 나는 좀 더 가까이서 대화하고 싶네만."
        }
    },

    {
        talk: {
            name: "김솔음",
            text: "......실종된 사람들은 어디에 있습니까."
        },

        ignore: [{
            name: "김솔음",
            text: "……"
        },

        {
            name: "",
            text: "의지와 상관없이 발걸음이 앞으로 옮겨졌다."
        },

        {
            name: "",
            text: "아니, 선비가 내게 다가온다는 표현이 더 옳을 것이다."
        },
        ],


        response: {
            name: "???",
            text: "호기심이 많은 사람은 싫어하지 않지. 다만, 나는 자네와 이야기를 하고 싶은 걸세."
        }
    },

    {
        talk: {
            name: "김솔음",
            text: "......우연이라는 아이는 바쳐진 겁니까?"
        },

        ignore: [{
            name: "김솔음",
            text: "……"
        },

        {
            name: "",
            text: "이곳엔 탈출을 위한 색이 든 물건도, 누군가의 기억도 존재하지 않는다."
        },

        {
            name: "김솔음",
            text: "여태까지 실종자가 보이지 않던 이유는...."
        },

        {
            name: "",
            text: "모두 이곳에 갇혔기 때문이다."
        },
        ],

        response: [{
            name: "???",
            text: "많은 것을 바라진 않네."
        },

        {
            name: "???",
            text: "지금부터 나눌 이야기가 찰나의 순간이 될지, 영원이 될지는 아무도 모르는 게 아닌가."
        }
        ]
    },

    {
        talk: {
            name: "김솔음",
            text: "......당신은 벌을 내리는 영물이십니까?"
        },

        ignore: [{
            name: "",
            text: "더 이상 밀어낼 이유는 없다."
        },

        {
            name: "",
            text: "이미 코앞까지 왔으니."
        },

        {
            name: "김솔음",
            text: "젠장, 다른 방법이...!"
        },
        ],

        response: [{
            name: "???",
            text: "이제야 나를 보러 오는구먼."
        },

        {
            name: "???",
            text: "자네를 기다렸다네."
        }
        ]

    }

];


/* ==========================================================
   본격적인 선비 대화
========================================================== */

const scholarDialogues = [

    {
        name: "???",
        text: "하하, 어찌 내 선물은 마음에 들었는가?"
    },

    {
        name: "???",
        text: "......선물 말입니까?"
    },

    {
        name: "???",
        text: "그래, 내 친히 편지까지 쓰지 않았는가."
    },

    {
        name: "장인석",
        text: "헛된 윤회를 끊어달라고 말이지."
    },

    {
        name: "김솔음",
        text: "......!"
    },

    {
        name: "장인석",
        text: "아아, 걱정말게. 자네를 부른 건 구조 요청 때문이 아니니."
    },

    {
        name: "장인석",
        text: "한 명이라도 내 작품을 보며 즐길 수 있다는 건.... 엄청난 행복이 아닌가?"
    },

    {
        name: "장인석",
        text: "그러니 자네도, 이곳에서 함께합세."
    },

    {
        name: "장인석",
        text: "찰나가 아닌...."
    },

    {
        name: "김솔음",
        text: "......실종자들은 어디에 있습니까."
    },

    {
        name: "장인석",
        text: "그들은 이미 내 예술과 한 몸이 되었지."
    },

    {
        name: "장인석",
        text: "곧 만나게 될 터이니, 그리 찾지 않아도 괜찮네."
    },

    {
        name: "김솔음",
        text: "장인석 씨 당신은 무고한 피해자들을 만들어내고 있는 겁니다."
    },

    {
        name: "김솔음",
        text: "당신의 그 욕심 때문에."
    },

    {
        name: "장인석",
        text: "욕심이라.... 그래, 그 분도 인간은 욕심이 많다는 이야기를 종종 하셨지."
    },

    {
        name: "장인석",
        text: "하지만 이런들 어찌하고 저런들 어찌한가. 내가 지금 행복하다는 사실에는 변함이 없는데."
    },

    {
        name: "김솔음",
        text: "......!"
    },

    {
        name: "장인석",
        text: "그리고 자네도 눈치채지 않았는가?"
    },

    {
        name: "장인석",
        text: "다른 그림들과 다르게 이 곳엔.... 아무것도 없다는 사실을."
    },

    {
        name: "장인석",
        text: "그래! 더 이상 남의 것을 따라 그리지 않아도 난 충분히 재능있는 인물이 되었다네."
    },

    {
        name: "장인석",
        text: "그리고 내가 이 안에 속함으로써 나의 그림은 온전한 것이 되었지."
    },

    {
        name: "장인석",
        text: "참으로 흥미롭고 신이 나는 이야기 아닌가?"
    },

    {
        name: "김솔음",
        text: "당신의 아내도 결국...... 먹히지 않았습니까."
    },

    {
        name: "장인석",
        text: "하하, 그녀도 그 정도의 희생은 용서해줄 것이야."
    },

    {
        name: "장인석",
        text: "말이 길어졌네."
    },

    {
        name: "장인석",
        text: "그 분은 생각보다 참는 걸 못하시니."
    },

    {
        name: "장인석",
        text: "이제 자네와 나의 이야기도 여기서 마무리를 지어야겠지."
    }

];

let scholarIndex = 0;


/* ==========================================================
   타이핑 함수
========================================================== */

function typeText(element, text, speed = 45) {

    clearTimeout(typingTimer);

    element.textContent = "";

    let index = 0;

    isTyping = true;

    currentTypingText = text;

    currentTypingElement = element;


    function typing() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;

            typingTimer =
                setTimeout(
                    typing,
                    speed
                );

        }

        else {

            isTyping = false;

            currentTypingText = "";

            currentTypingElement = null;

        }

    }


    typing();

}


/* ==========================================================
   선비 쪽으로 한 단계 확대
========================================================== */

/* ==========================================================
   선비 쪽으로 한 단계 확대
========================================================== */

function zoomTowardScholar() {

    if (zoomCount >= maxZoomCount) {
        return;
    }

    zoomCount++;

    painting.classList.remove(
        "zoom-1",
        "zoom-2",
        "zoom-3",
        "zoom-4"
    );

    painting.classList.add(
        "zoom-" + zoomCount
    );
}


/* ==========================================================
   대사 출력
========================================================== */

function showDialogue(name, text, shouldZoom = false) {

    dialogueName.textContent =
        name || "";

    if (shouldZoom) {
        zoomTowardScholar();
    }

    typeText(
        dialogueText,
        text
    );

}


/* ==========================================================
   타이핑 즉시 완성
========================================================== */

function finishTyping() {

    if (!isTyping) {
        return false;
    }

    clearTimeout(typingTimer);

    currentTypingElement.textContent =
        currentTypingText;

    isTyping = false;

    currentTypingText = "";

    currentTypingElement = null;

    return true;
}


/* ==========================================================
   초반 스토리 시작
========================================================== */

function startStory() {

    gameMode = "story";

    introIndex = 0;
    zoomCount = 0;
    painting.classList.remove("zoom-1", "zoom-2", "zoom-3", "zoom-4", "zoom-5", "zoom-6", "zoom-7", "zoom-8", "zoom-9", "zoom-10", "zoom-11");

    showDialogue(
        introDialogues[introIndex].name,
        introDialogues[introIndex].text,
        false
    );

    dialogueBox.classList.add("show");

}


/* ==========================================================
   초반 대화창 클릭
========================================================== */

dialogueBox.addEventListener(
    "click",
    async function (event) {

        event.preventDefault();

        /*
            타이핑 중이면 먼저 문장 완성.
        */

        /* ==================================================
   엔딩 독백 대화
================================================== */

        if (gameMode === "endingDialogue") {

            clearTimeout(typingTimer);

            isTyping = false;

            currentTypingText = "";
            currentTypingElement = null;


            dialogueName.textContent = "김솔음";


            typeText(
                dialogueText,
                "이대로라면 피할 수 없다...!"
            );


            gameMode = "endingDialogue2";

            return;
        }

        if (gameMode === "endingBackgroundDialogue") {

            /*
                타이핑 중인 경우
                첫 클릭에서는 문장만 완성한다.
            */

            if (isTyping) {
                finishTyping();
                return;
            }

            /*
                다음 대사
            */

            endingDialogueIndex++;

            /*
                모든 대사가 끝났다면 종료
            */

            if (endingDialogueIndex >= endingDialogues.length) {

                dialogueBox.classList.remove("show");

                await wait(400);

                recordWindow.classList.add("show");

                gameMode = "recordWindow";

                return;
            }

            showEndingDialogue();
            return;
        }

        /* ==================================================
           두 번째 엔딩 대화
        ================================================== */

        if (gameMode === "endingDialogue2") {

            clearTimeout(typingTimer);

            isTyping = false;

            currentTypingText = "";
            currentTypingElement = null;


            /*
                엔딩 대화창 제거
            */

            dialogueBox.classList.remove("show");


            await wait(500);


            /*
                엔딩용 대화창 레이어 해제
            */

            dialogueBox.classList.remove(
                "ending-dialogue"
            );


            /*
                너는 참 버릇이 없구나.
            */

            showRudeLine();

            return;
        }

        /* ==================================================
   홈페이지 닫은 후 이어지는 대화
================================================== */

        if (gameMode === "recordClosed") {

            if (isTyping) {
                finishTyping();
                return;
            }

            recordClosedDialogueIndex++;

            if (recordClosedDialogueIndex >= recordClosedDialogues.length) {

                dialogueBox.classList.remove("show");

                await wait(400);

                showEndingChoices();

                return;
            }

            showRecordClosedDialogue();
            return;
        }

        if (gameMode === "j3Request") {

            if (isTyping) {
                finishTyping();
                return;
            }

            j3DialogueIndex++;

            if (j3DialogueIndex >= j3RequestDialogues.length) {
                dialogueBox.classList.remove("show");
                gameMode = "ending";
                return;
            }

            showJ3RequestDialogue();
            return;
        }

        if (gameMode === "reveal") {

            if (isTyping) {
                finishTyping();
                return;
            }

            revealDialogueIndex++;

            if (revealDialogueIndex >= revealDialogues.length) {

                dialogueBox.classList.remove("show");

                await wait(500);

                revealAnswerBox.classList.remove("hidden");
                revealAnswerInput.value = "";
                revealAnswerMessage.textContent = "";

                gameMode = "revealAnswer";

                revealAnswerInput.focus();

                return;
            }

            showRevealDialogue();
            return;
        }

        if (gameMode === "revealAnswerEnd") {

    if (isTyping) {
        finishTyping();
        return;
    }

    revealAnswerEndDialogueIndex++;

    /*
        아직 남은 대사가 있다면
        다음 대사 출력
    */

    if (
        revealAnswerEndDialogueIndex <
        trueEndDialogues.length
    ) {

        showRevealAnswerEndDialogue();

        return;
    }


    /*
        모든 대사가 끝남
        → True End 그림 + 대사
    */

    trueEndDialogueIndex = 0;


    if (truePainting) {
        truePainting.classList.add("show");
    }


    dialogueBox.classList.add("show");
    dialogueBox.style.pointerEvents = "auto";
    dialogueBox.style.zIndex = "10004";


    gameMode = "trueEnd";

    showTrueEndDialogue();

    return;
}
        if (gameMode === "trueEnd") {

            if (isTyping) {
                finishTyping();
                return;
            }

            trueEndDialogueIndex++;

            if (
                trueEndDialogueIndex >=
                trueEndDialogues.length
            ) {

                dialogueBox.classList.remove("show");

                gameMode = "trueEndFinish";

                return;
            }

            showTrueEndDialogue();
            return;
        }


        /* ==================================================
           일반 대화 타이핑 처리
        ================================================== */

        if (finishTyping()) {
            event.stopImmediatePropagation();
            return;
        }

        if (gameMode === "story") {

            if (
                introIndex <
                introDialogues.length - 1
            ) {

                introIndex++;

                showDialogue(
                    introDialogues[introIndex].name,
                    introDialogues[introIndex].text
                );

                return;

            }


            /*
                초반 대사가 끝나면 선택지.
            */

            gameMode = "choice";

            dialogueName.textContent = "";
            dialogueText.textContent = "";

            choiceBox.classList.remove("hidden");

            return;

        }


        /*
            선택 후 대화는
            선택 버튼에서 직접 처리하므로
            일반 대화창 클릭은 여기서 처리하지 않음.
        */

    }
);

/* ==========================================================
   "너는 참 버릇이 없구나."
========================================================== */

let rudeLineScene = null;


function createRudeLineScene() {

    if (rudeLineScene) {
        return;
    }

    rudeLineScene =
        document.createElement("div");

    rudeLineScene.id =
        "rudeLineScene";

    rudeLineScene.innerHTML = `
        <div id="rudeLineText">
            <em>너는 참 버릇이 없구나.</em>
        </div>
    `;

    document.body.appendChild(
        rudeLineScene
    );

    rudeLineScene.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (gameMode !== "rudeLine") {
                return;
            }

            showEndingBackground();
        }
    );
}


async function showRudeLine() {

    createRudeLineScene();

    gameMode = "rudeLine";

    /*
        독백 화면은 클릭을 받지 않도록 한다.
    */
    if (monologueScene) {
        monologueScene.style.pointerEvents = "none";
    }

    /*
        창귀 대사를 가장 위에 표시
    */
    rudeLineScene.style.zIndex = "10005";
    rudeLineScene.style.pointerEvents = "auto";

    rudeLineScene.classList.add("show");
}

/* ==========================================================
   선택 처리
========================================================== */

function selectConversation(choiceType) {

    if (gameMode !== "choice") return;

    gameMode = "conversation";

    choiceBox.classList.add("hidden");

    conversationDialogueIndex = 0;

    const current =
        conversationDialogues[conversationCount];

    current.selectedChoice = choiceType;

    const selectedDialogues =
        choiceType === "talk"
            ? current.talk
            : current.ignore;

    const firstDialogue =
        Array.isArray(selectedDialogues)
            ? selectedDialogues[0]
            : selectedDialogues;

    showDialogue(
        firstDialogue.name,
        firstDialogue.text
    );
}

function showConversationDialogue() {

    const current =
        conversationDialogues[conversationCount];

    const selectedDialogues =
        current.selectedChoice === "talk"
            ? current.talk
            : current.ignore;

    const dialogue =
        selectedDialogues[conversationDialogueIndex];

    if (!dialogue) return;

    showDialogue(
        dialogue.name,
        dialogue.text
    );
}


/* ==========================================================
   선택 버튼
========================================================== */

talkChoice.addEventListener(
    "click",
    function (event) {

        event.preventDefault();
        event.stopPropagation();

        selectConversation("talk");

    }
);


ignoreChoice.addEventListener(
    "click",
    function (event) {

        event.preventDefault();
        event.stopPropagation();

        selectConversation("ignore");

    }
);


/* ==========================================================
   선택 후 대화창 클릭
========================================================== */

dialogueBox.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        if (gameMode !== "response") {
            return;
        }


        /*
            첫 클릭은 선택 대사를 완성.
        */

        if (finishTyping()) {
            return;
        }


        /*
            선비의 응답.
        */

        const current =
            conversationDialogues[conversationCount];

        showDialogue(
            current.response.name,
            current.response.text
        );

        gameMode = "responseScholar";

    }
);


/* ==========================================================
   선비 응답 이후
========================================================== */

dialogueBox.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        /*
            선택 후 대화 진행
        */

        if (gameMode === "conversation") {

            const current =
                conversationDialogues[conversationCount];

            const selectedDialogues =
                current.selectedChoice === "talk"
                    ? current.talk
                    : current.ignore;


            conversationDialogueIndex++;


            if (
                conversationDialogueIndex <
                selectedDialogues.length
            ) {

                showConversationDialogue();

                return;

            }


            /*
                선택한 대사가 모두 끝남
                → 선비의 응답으로 이동
            */

            conversationDialogueIndex = 0;

            gameMode = "responseScholar";

            const response =
                Array.isArray(current.response)
                    ? current.response
                    : [current.response];


            showDialogue(
                response[0].name,
                response[0].text
            );

            return;
        }


        /*
            선비의 응답 진행
        */

        if (gameMode === "responseScholar") {

            const current =
                conversationDialogues[conversationCount];

            const response =
                Array.isArray(current.response)
                    ? current.response
                    : [current.response];


            conversationDialogueIndex++;


            if (
                conversationDialogueIndex <
                response.length
            ) {

                const nextResponse =
                    response[conversationDialogueIndex];

                showDialogue(
                    nextResponse.name,
                    nextResponse.text
                );

                return;
            }


            /*
                한 번의 대화가 완전히 끝남
            */

            conversationCount++;

            conversationDialogueIndex = 0;

            zoomTowardScholar();


            if (
                conversationCount >=
                maxConversationCount
            ) {

                startFaceReveal();

                return;
            }


            /*
                다음 선택지
            */

            dialogueName.textContent = "";
            dialogueText.textContent = "";

            gameMode = "choice";

            choiceBox.classList.remove("hidden");

        }

    }
);


/* ==========================================================
   얼굴 등장 시작
========================================================== */

async function startFaceReveal() {

    gameMode = "faceReveal";

    choiceBox.classList.add("hidden");

    dialogueBox.classList.remove("show");


    /*
        마지막 확대 단계까지 먼저 진행.
    */

    /*
    마지막 확대 단계에서 잠시 멈춘다.
    이미 zoom-4 상태이므로 다시 확대하지 않는다.
*/

    painting.classList.remove(
        "zoom-1",
        "zoom-2",
        "zoom-3",
        "zoom-4"
    );

    painting.classList.add("zoom-4");


    /*
        확대가 거의 끝난 뒤
        얼굴이 화면 앞으로 튀어나온다.
    */

    await wait(1700);


    faceReveal.classList.add("show");


    await wait(1050);


    /*
        본격적인 대화 장면으로 전환.
    */

    faceReveal.classList.remove("show");

    scholarScene.classList.add("show");

    scholarIndex = 0;

    gameMode = "scholar";

    showScholarDialogue();

}


/* ==========================================================
   본격적인 선비 대화
========================================================== */

function showScholarDialogue() {

    const dialogue =
        scholarDialogues[scholarIndex];


    if (!dialogue) {
        return;
    }


    scholarDialogueName.textContent =
        dialogue.name || "";

    typeText(
        scholarDialogueText,
        dialogue.text
    );

}


/* ==========================================================
   선비 대화창 클릭
========================================================== */

scholarDialogue.addEventListener(
    "click",
    async function (event) {

        event.preventDefault();

        if (gameMode !== "scholar") {
            return;
        }


        /*
            타이핑 중이면
            먼저 현재 문장 완성
        */

        if (finishTyping()) {
            return;
        }


        /*
            「찰나가 아닌 영원을.」
            다음 클릭에서 특수 연출
        */

        if (
            scholarIndex === 8
        ) {

            await showEternityScene();

            return;

        }


        /*
            다음 대사
        */

        if (
            scholarIndex <
            scholarDialogues.length - 1
        ) {

            scholarIndex++;

            showScholarDialogue();

            return;

        }


        /*
            임시 종료
        */

        scholarDialogue.classList.remove("show");

        scholarScene.classList.remove("show");

        await showRitualScene();

        return;


    }
);

/* ==========================================================
   공통 대기 함수
========================================================== */

function wait(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* ==========================================================
   시작
========================================================== */

window.addEventListener(
    "load",
    function () {

        startStory();

    }
);
/* ==========================================================
   창귀 - 제물 이름 호출
========================================================== */

let offeringScene = null;


/*
    방문자 이름

    나중에 실제 방문자 이름으로 교체
*/

const offeringNames = [

    "김솔음",
    "김경원",
    "김승찬",
    "김찬결",
    "정유진",

];


/*
    이름 호출 화면 생성
*/

function createOfferingScene() {

    if (offeringScene) {
        return;
    }


    offeringScene =
        document.createElement("div");

    offeringScene.id =
        "offeringScene";


    offeringScene.innerHTML = `

        <div id="offeringName"></div>

    `;


    document.body.appendChild(
        offeringScene
    );

}


/*
    제물 이름 호출
*/

/* ==========================================================
   창귀 - 제물 이름 호출
========================================================== */

async function showOfferingScene() {

    createOfferingScene();

    gameMode = "offering";


    const name =
        offeringScene.querySelector(
            "#offeringName"
        );


    /*
        초기화
    */

    name.classList.remove("show");

    name.textContent = "";


    /*
        offeringScene도 검은 화면 위에서
        그대로 이어진다.
    */

    offeringScene.classList.add("show");

    await wait(500);


    /*
        방문자 이름을 하나씩 호출
    */

    for (
        const visitorName of offeringNames
    ) {

        /*
            이전 이름 제거
        */

        name.classList.remove("show");

        await wait(400);


        /*
            이름 변경
        */

        name.textContent =
            visitorName;


        /*
            페이드 인
        */

        name.classList.add("show");

        await wait(1500);


        /*
            페이드 아웃
        */

        name.classList.remove("show");

        await wait(500);
    }


    /*
        마지막 이름 이후 잠시 정적
    */

    await wait(800);


    /*
        이름 화면 제거

        단, 검은 화면 자체는 유지
    */

    offeringScene.classList.remove("show");

    await wait(500);


    /*
        다음 독백
    */

    createMonologueScene();

    monologueScene.classList.add("show");

    gameMode = "monologue";

    monologueIndex = 0;

    showMonologueLine();

}
/* ==========================================================
   독백 장면 (대화창 모바일 레이아웃 유지 버전)
========================================================== */

let monologueScene = null;
let monologueIndex = 0;


function createMonologueScene() {

    if (monologueScene) {
        return;
    }

    monologueScene = document.createElement("div");
    monologueScene.id = "monologueScene";

    monologueScene.innerHTML = `
        <div id="monologueText">
            <div class="monologue-line">큰 발톱과 비명이 아우성을 친다.</div>
            <div class="monologue-line">다리로부터 차오르는 떨림.</div>
            <div class="monologue-line">그 끝에 느껴지는 지독한 살의.</div>
            <div class="monologue-line">그리고 그것은 곧,</div>
            <div class="monologue-line">나에게로 떨어졌다.</div>
        </div>
    `;

    document.body.appendChild(monologueScene);


    /* 독백 클릭 진행 */
    monologueScene.addEventListener("click", function (event) {

        event.preventDefault();

        if (gameMode !== "monologue" && gameMode !== "rudeLine") {
            return;
        }

        if (gameMode === "rudeLine") {
            monologueScene.classList.remove("show");
            gameMode = "ending";
            return;
        }

        const lines = monologueScene.querySelectorAll(".monologue-line");

        // 마지막 문장("나에게로 떨어졌다.")인 상태에서 클릭 시 종료
        if (monologueIndex >= lines.length - 1) {
            finishMonologue();
            return;
        }

        monologueIndex++;
        showMonologueLine();

    });

}


/*
    현재 독백 출력
*/
function showMonologueLine() {

    if (monologueScene) {
        monologueScene.classList.add("show");
    }

    const lines = monologueScene.querySelectorAll(".monologue-line");

    lines.forEach(line => {
        line.classList.remove("active");
    });

    if (lines[monologueIndex]) {
        lines[monologueIndex].classList.add("active");
    }

}


/*
    독백 종료 후 대화창 전환
*/
async function finishMonologue() {

    gameMode = "endingDialogue";

    /*
        검은 독백 화면 클릭만 막는다.
    */
    monologueScene.style.pointerEvents = "none";

    /*
        마지막 독백 문장을 먼저 사라지게 한다.
    */
    monologueScene.classList.remove("show");

    await wait(500);

    /*
        기존 모바일 대화창을 화면 위로 올린다.
    */
    dialogueBox.style.zIndex = "10004";
    dialogueBox.style.pointerEvents = "auto";

    dialogueName.textContent = "김솔음";
    dialogueText.textContent = "";

    dialogueBox.classList.add("show");

    typeText(
        dialogueText,
        "......!"
    );
}

const endingBlackout =
    document.querySelector("#endingBlackout");

async function showEndingBackground() {

    gameMode = "endingBackground";

    gameMode = "endingBackground";

    const endingBlackout =
        document.querySelector("#endingBlackout");

    if (endingBlackout) {
        endingBlackout.classList.remove("show");
        endingBlackout.style.opacity = "0";
        endingBlackout.style.pointerEvents = "none";
    }

    if (rudeLineScene) {
        rudeLineScene.classList.remove("show");
        rudeLineScene.style.pointerEvents = "none";
    }

    if (monologueScene) {
        monologueScene.classList.remove("show");
        monologueScene.style.pointerEvents = "none";
    }

    if (offeringScene) {
        offeringScene.classList.remove("show");
    }

    scholarScene.classList.remove("show");
    scholarDialogue.classList.remove("show");


    /* ==================================================
       기존 대화창 잠시 숨김
    ================================================== */

    dialogueBox.classList.remove("show");
    dialogueBox.style.pointerEvents = "none";


    await wait(500);


    /* ==================================================
       선비 그림 상태 초기화
    ================================================== */

    painting.classList.remove(
        "zoom-1",
        "zoom-2",
        "zoom-3",
        "zoom-4",
        "zoom-5",
        "zoom-6",
        "zoom-7",
        "zoom-8",
        "zoom-9",
        "zoom-10",
        "zoom-11"
    );


    /* ==================================================
   마지막 배경 강제 표시
================================================== */

    painting.style.opacity = "0";
    painting.style.visibility = "hidden";

    backgroundPainting.classList.add("show");

    endingDialogueIndex = 0;

    gameMode = "endingBackgroundDialogue";

    dialogueBox.style.zIndex = "10004";
    dialogueBox.style.pointerEvents = "auto";

    dialogueBox.classList.add("show");

    showEndingDialogue();
}

const endingDialogues = [

    { name: "김솔음", text: "……경비반장님?" },

    { name: "김솔음", text: "왜, 여기에 계십니까." },

    { name: "J3", text: "……보안팀 호출이라서요. 이 안에, 정예팀도 같이 들어가있다고 들어서……" },

    { name: "김솔음", text: "……" },

    { name: "J3", text: "음… 어차피 아무것도 못 본 걸로 할 거구…… 실종자만 데리고 나가면 되는 거니까." },

    { name: "김솔음", text: "아, 감사합니다." },

    { name: "J3", text: "이건…… 아…… 저번에도 본 적 있는 거네요. 음… 같은 방식으로…… 처리할 필요는 없는 것 같은데." },

    { name: "김솔음", text: "경비반장님이 처리하실 수 있는 겁니까?" },

    { name: "J3", text: "못 할 건 없는데…… 이렇게 처리하면 업무에…… 지장가는 거 아닌가." },

    { name: "김솔음", text: "……!" },

    { name: "J3", text: "그쪽……상사한테 물어보는 건 어때요?" },

    { name: "J3", text: "퇴마는……백일몽 주식회사 전문도 아니니까……" },

    { name: "김솔음", text: "상사와…… 연락할 방도가 없을 것 같습니다. 보다시피 여기엔 저 혼자 오기도 했고요." },

    { name: "J3", text: "……단독행동?" },

    { name: "김솔음", text: "……어떻게 보면 그럴 수도 있겠네요." },

    { name: "", text: "그야, 이 재난 또한 내가 알고 있는 재난 같으니." }

];

let endingDialogueIndex = 0;

function showEndingDialogue() {

    const dialogue =
        endingDialogues[endingDialogueIndex];

    if (!dialogue) {
        return;
    }

    dialogueName.textContent =
        dialogue.name || "";

    typeText(
        dialogueText,
        dialogue.text
    );
}

recordWindowClose.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    recordWindow.classList.remove("show");

    dialogueBox.classList.add("show");
    dialogueBox.style.pointerEvents = "auto";
    dialogueBox.style.zIndex = "10004";

    recordClosedDialogueIndex = 0;
    gameMode = "recordClosed";

    showRecordClosedDialogue();
});

const recordClosedDialogues = [
    { name: "???", text: "단독행동이라는 건 잘 알고 있나 보네." },
    { name: "류재관", text: "포도 요원." },
    { name: "류재관", text: "필요한 장비가 있을 것 같아 들고 왔습니다." },
    { name: "", text: "청동 요원이 들고 있던 것은... 부적과 붓, 호롱불이었다." },
    { name: "최 요원", text: "아무리 1인 1조가 원칙이라고 해도, 조금은 우리한테 기대주는 게 좋은데 말이야." },
    { name: "김솔음", text: "……" },
    { name: "최 요원", text: "생각하는 게 있어서 그런 거겠지? 그럼, 믿고 따라줘야지 어쩌겠어. 그치, 재관아." },
    { name: "류재관", text: "최소한 저는 포도 요원을 믿습니다." },
    { name: "최 요원", text: "그래그래, 그래서 우리 포도가 물어보고 싶은 게 있는 것 같은데." },
    { name: "김솔음", text: "……요원님들이 계실 줄은 몰랐습니다." },
    { name: "최 요원", text: "이 재난은 우리도 주시하고 있었으니까. 물론, 포도가 선수 칠 줄은 몰랐지만?" },
    { name: "김솔음", text: "언제부터였습니까…?" },
    { name: "최 요원", text: "네가 처음 그림에 들어간 그 순간부터." },
    { name: "최 요원", text: "뭐, 이건 나중에 천천히 이야기하는 걸로 하고. 포도가 알고 싶은 것부터 이야기하자." },
    { name: "최 요원", text: "처리를 어떻게 하면 좋을지." },
    { name: "최 요원", text: "청동이가 설명해줬을 거라고 생각은 하지만…. 여기선 내가 한 번 더 짚어주는 게 나을 것 같다." },
    { name: "최 요원", text: "재난관리국에는 3가지 팀이 있어." },
    { name: "최 요원", text: "백호 1팀, 주작 1팀 그리고… 우리 현무 1팀." },
    { name: "최 요원", text: "하는 일은 조금씩 달라도, 결국 하나야." },
    { name: "최 요원", text: "재난을 파악하고, 더 이상의 희생을 막는 것." },
    { name: "최 요원", text: "그리고 때에 따라서는……" },
    { name: "최 요원", text: "재난의 종결을 의도하는 것." },
    { name: "최 요원", text: "이건 우리가, 가장 잘하는 일이고. 설마, 포도가 잊고 있진 않았겠지요?" },
    { name: "최 요원", text: "보아하니, 이미 답은 알고 있는 것 같네." },
    { name: "최 요원", text: "그러니, 네가 생각한 방식 그대로." },
    { name: "최 요원", text: "끝을 맺어주고 와." },
    { name: "", text: "생각한 방식이라." },
    { name: "", text: "나는……" }
];

let recordClosedDialogueIndex = 0;

function showRecordClosedDialogue() {

    const dialogue =
        recordClosedDialogues[recordClosedDialogueIndex];

    if (!dialogue) return;

    dialogueName.textContent = dialogue.name;
    dialogueText.textContent = "";

    typeText(dialogueText, dialogue.text);
}


function showEndingChoices() {

    endingChoiceBox.classList.remove("hidden");

    gameMode = "endingChoice";
}

askJ3Choice.addEventListener("click", function () {

    endingChoiceBox.classList.add("hidden");

    j3DialogueIndex = 0;

    dialogueBox.classList.add("show");
    dialogueBox.style.pointerEvents = "auto";
    dialogueBox.style.zIndex = "10004";

    gameMode = "j3Request";

    showJ3RequestDialogue();
});

const j3RequestDialogues = [
    {
        name: "김솔음",
        text: "……경비반장님께 부탁드리고 싶습니다."
    },

    {
        name: "J3",
        text: "음, 그래요…… 그럼, 잠시만 눈 감고…… 금방 끝나니까……"
    },

    {
        name: "",
        text: "낮은 으르렁거림이 들렸다."
    },

    {
        name: "",
        text: "이어지는 찢어지는 비명. 무언가를 가르는 소리."
    },

    {
        name: "J3",
        text: "……됐다."
    },

    {
        name: "",
        text: "그렇게 눈을 뜨자, 사방팔방으로 튀어있는 먹물과"
    },

    {
        name: "",
        text: "일그러진 무언가가 보였다."
    },

    {
        name: "",
        text: "더 이상 형체를 갖추지 않은, 범이."
    },

    {
        name: "",
        text: "이걸로 재난은 종결되었다."
    },

    {
        name: "",
        text: "원인을 없앤다는 아주 철저한 논리의 아래."
    },

    {
        name: "",
        text: "다시는 실종자가 생기지도 않겠지."
    },

    {
        name: "",
        text: "그걸로……된 것이다."
    },

    {
        name: "",
        text: "……"
    },

    {
        name: "",
        text: "된 것일까?"
    },

    {
        name: "",
        text: "Normal End [성급한 결론]"
    }


];

let j3DialogueIndex = 0;

function showJ3RequestDialogue() {

    const dialogue =
        j3RequestDialogues[j3DialogueIndex];

    if (!dialogue) return;

    dialogueName.textContent = dialogue.name;
    dialogueText.textContent = "";

    typeText(dialogueText, dialogue.text);
}

const revealDialogues = [
    {
        name: "",
        text: "그림은 혼을 담는다."
    },

    {
        name: "",
        text: "장인석의 그림에 담아있던 ‘숨결'이란 ‘그것'의 혼."
    },

    {
        name: "",
        text: "오랜 시간 이어져 온 분노와 설움이 모여 결국 형체를 잃어버린 안타까운 혼의 망령."
    },

    {
        name: "김솔음",
        text: "……월광유촌의 영물."
    },

    {
        name: "김솔음",
        text: "혹은 사람을 죽이고 잡아먹는 범."
    },

    {
        name: "",
        text: "산을 지키는 것은 본디, 범의 의무. 범은 예로부터 여러 상징으로서 전해 내려와 왔다."
    },

    {
        name: "김솔음",
        text: "사람을 무참히 찢어 죽이는 짐승으로서, 때로는 무언가를 지키는 산신령으로서."
    },

    {
        name: "김솔음",
        text: "그것을 정하는 것 또한 저희의 임무였다고 생각합니다."
    },

    {
        name: "",
        text: "베껴 그린 그림이 그 생김새를 담아낼 순 있어도, 작가의 숨결 마저 담아낼 수는 없었다."
    },

    {
        name: "김솔음",
        text: "그렇기에 깃들었던 거겠지."
    },

    {
        name: "",
        text: "빈 자리를 차지해서라도 자신의 이야기를 알리고 싶었던 어떤 처절한 괴이가."
    },

    {
        name: "",
        text: "한 번이라도 자신의 존재를 증명하고 싶었던, 무언가가."
    },

    {
        name: "",
        text: "그리고 그 괴이의 이름은……"
    }
];

let revealDialogueIndex = 0;

function showRevealDialogue() {

    const dialogue =
        revealDialogues[revealDialogueIndex];

    if (!dialogue) return;

    dialogueName.textContent = dialogue.name;
    dialogueText.textContent = "";

    typeText(dialogueText, dialogue.text);
}


revealChoice.addEventListener("click", function () {

    endingChoiceBox.classList.add("hidden");

    revealDialogueIndex = 0;

    dialogueBox.classList.add("show");
    dialogueBox.style.pointerEvents = "auto";
    dialogueBox.style.zIndex = "10004";

    gameMode = "reveal";

    showRevealDialogue();
});

const trueEndDialogues = [
    {
        name: "",
        text: "부적 위로 한 획을 그을 때마다 그림 속의 범은 시시각각 모습을 바꾸었다."
    },
    {
        name: "",
        text: "사람의 형상으로, 식물의 형태로,"
    },
    {
        name: "",
        text: "그 끝에 다다라 호랑이의 모습으로."
    },
    {
        name: "김솔음",
        text: "그것이 당신의 이름입니다."
    },
    {
        name: "",
        text: "부적 위에 마지막 획을 그었다."
    },
    {
        name: "",
        text: "이윽고, 완전한 행을 갖춘 그것의 아래. 찬란한 불꽃이 피어올랐다."
    },
    {
        name: "",
        text: "그것은 한 줌의 재가 되었다."
    },
    {
        name: "",
        text: "잠시나마 자신의 존재를 과시하듯 흩날리더니 이내 흐려져 사라졌다."
    },
    {
        name: "",
        text: "방 안에는 타버린 부적과"
    },
    {
        name: "",
        text: "아무것도 그려지지 않은 빈 종이만이 남았다."
    },
    {
        name: "",
        text: "나는 한동안 그 자리를 바라보았다."
    },
    {
        name: "김솔음",
        text: "……이제야, 당신의 이야기를 들었습니다."
    },
    {
        name: "",
        text: "자신의 이름마저 잃어버렸던 혼."
    },
    {
        name: "",
        text: "그러나 마지막에는"
    },
    {
        name: "",
        text: "자신의 이름으로 기억될 수 있었다."
    },
    {
        name: "",
        text: "True End [호시탐탐]"
    }
];

let trueEndDialogueIndex = 0;

let revealAnswerEndDialogueIndex = 0;

function showRevealAnswerEndDialogue() {

    const dialogue =
        revealAnswerEndDialogues[revealAnswerEndDialogueIndex];

    if (!dialogue) return;

    dialogueName.textContent = dialogue.name;
    dialogueText.textContent = "";

    typeText(
        dialogueText,
        dialogue.text
    );
}

revealAnswerButton.addEventListener("click", function () {

    const answer =
        revealAnswerInput.value.trim();

    if (answer === "서호연") {

        revealAnswerMessage.textContent = "";

        revealAnswerBox.classList.add("hidden");

        trueEndDialogueIndex = 0;

if (truePainting) {
    truePainting.classList.add("show");
}

dialogueBox.classList.add("show");
dialogueBox.style.pointerEvents = "auto";
dialogueBox.style.zIndex = "10004";

gameMode = "trueEnd";

showTrueEndDialogue();

        return;
    }

    revealAnswerMessage.textContent =
        "잘못된 답입니다.";
});

revealAnswerInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        revealAnswerButton.click();
    }

});

function showTrueEndDialogue() {

    const dialogue =
        trueEndDialogues[trueEndDialogueIndex];

    if (!dialogue) return;

    dialogueName.textContent = dialogue.name;
    dialogueText.textContent = "";

    typeText(
        dialogueText,
        dialogue.text
    );
}