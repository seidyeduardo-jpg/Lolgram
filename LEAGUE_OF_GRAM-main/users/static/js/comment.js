// Const
const MAX_IMAGE_WIDTH = 1200;
const MAX_IMAGE_HEIGHT = 1200;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

const USERS = [
    { name: "正弘秀", avatar: "/static/image/icone01.jpg" },
    { name: "鈴木梓", avatar: "/static/image/icone02.jpg" },
    { name: "篠田あゆみ", avatar: "/static/image/icone03.jpg" },
    { name: "山の守", avatar: "/static/image/icone04.jpg" },
    { name: "雨の詩", avatar: "/static/image/icone05.jpg" },
    { name: "太陽の子", avatar: "/static/image/icone06.jpg" },
    { name: "夢の旅人", avatar: "/static/image/icone07.jpg" },
    { name: "星の光", avatar: "/static/image/icone08.jpg" },
    { name: "森の精", avatar: "/static/image/icone09.jpg" },
    { name: "川の声", avatar: "/static/image/icone10.jpg" },
];

const COMMENTS = [
    "素晴らしい投稿！",
    "これは面白いですね。",
    "デザインがとてもいい",
    "素敵な写真/動画です。",
    "共感できます！",
    "素晴らしいアイデアです。",
    "もっと詳しく教えてください。",
    "すごいです！",
    "興味深い投稿です。",
    "最高の投稿！"
];

// const USERS_PROFILE
const USERS_PROFILE = [
    {
        name: "正弘秀",
        avatar: "/static/image/icone01.jpg",
        age: 28,
        birthYear: 1996,
        birthPlace: "東京",
        profileName: "マスターデベロッパー"
    },
    {
        name: "鈴木梓",
        avatar: "/static/image/icone02.jpg",
        age: 35,
        birthYear: 1989,
        birthPlace: "大阪",
        profileName: "クリエイティブディレクター"
    },
    {
        name: "篠田あゆみ",
        avatar: "/static/image/icone03.jpg",
        age: 24,
        birthYear: 2000,
        birthPlace: "京都",
        profileName: "アートデザイナー"
    },
    {
        name: "山の守",
        avatar: "/static/image/icone04.jpg",
        age: 40,
        birthYear: 1984,
        birthPlace: "北海道",
        profileName: "ネイチャーガイド"
    },
    {
        name: "雨の詩",
        avatar: "/static/image/icone05.jpg",
        age: 29,
        birthYear: 1995,
        birthPlace: "広島",
        profileName: "ポエットライター"
    },
    {
        name: "太陽の子",
        avatar: "/static/image/icone06.jpg",
        age: 22,
        birthYear: 2002,
        birthPlace: "沖縄",
        profileName: "サーファー"
    },
    {
        name: "夢の旅人",
        avatar: "/static/image/icone07.jpg",
        age: 36,
        birthYear: 1988,
        birthPlace: "福岡",
        profileName: "トラベルブロガー"
    },
    {
        name: "星の光",
        avatar: "/static/image/icone08.jpg",
        age: 31,
        birthYear: 1993,
        birthPlace: "神戸",
        profileName: "天文学者"
    },
    {
        name: "森の精",
        avatar: "/static/image/icone09.jpg",
        age: 27,
        birthYear: 1997,
        birthPlace: "長野",
        profileName: "エコロジスト"
    },
    {
        name: "川の声",
        avatar: "/static/image/icone10.jpg",
        age: 33,
        birthYear: 1991,
        birthPlace: "新潟",
        profileName: "ミュージシャン"
    },
    {
        name: "田中聖治",
        avatar: "/static/image/game.jpeg",
        age: 32,
        birthYear: 1992,
        birthPlace: "神奈川",
        profileName: "ゲームデザイナー"
    },
    {
        name: "ブライアン",
        avatar: "/static/image/game2.jpg",
        age: 25,
        birthYear: 1999,
        birthPlace: "アメリカ",
        profileName: "インターナショナルプレイヤー"
    }
];

// Global
let mediaFile = null;
let currentUserIndex = 0;

// CSS Styles
const styleElement = document.createElement('style');
styleElement.textContent = `
    /* Comentários */
    .comment {
        margin-bottom: 0;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    
    .comment-btn {
        margin-left: 8px;
        padding: 2px 6px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.2s;
    }
    
    .comment-btn:hover {
        background-color: #e0e0e0;
    }
    
    .comments-container {
        margin-top: 10px;
        border-top: 1px solid rgba(0,0,0,0.1);
        padding-top: 5px;
    }
    
    .comment-content p {
        margin: 5px 0;
    }
    
    .comment-input-section {
        margin-bottom: 10px;
    }
    
    .comment-form {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .comment-input {
        flex-grow: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .post-btn {
        padding: 6px 12px;
        background-color: #ff1493;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .post-btn:hover {
        background-color: #ff1493;
    }
    
    /* Botão de perfil e cabeçalho do post */
    .post-user-top {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
    }
    
    .profile-btn {
        padding: 2px 6px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.2s;
    }
    
    .profile-btn:hover {
        background-color: #e0e0e0;
    }
    
    .post-header {
        display: flex;
        align-items: flex-start;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    
    .post-user-info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    
    .post-username {
        font-weight: bold;
        font-size: 14px;
    }
    
    .post-time {
        font-size: 12px;
        color: #666;
    }
    
    /* Avatares clicáveis */
    .post-avatar, .comment-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid transparent;
        position: relative;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    }
    
    .post-avatar:hover, .comment-avatar:hover {
        transform: scale(1.05);
        border-color: #ff0000 !important;
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
    }
    
    .post-avatar::after, .comment-avatar::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle, rgba(255,0,0,0) 70%, rgba(255,0,0,0.3) 100%);
        opacity: 0;
        border-radius: 50%;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .post-avatar:hover::after, .comment-avatar:hover::after {
        opacity: 1;
    }
    
    .post-avatar:active, .comment-avatar:active {
        transform: scale(0.95);
        border-color: #e00000 !important;
    }
`;

//fuction formatPostTime
function formatPostTime(date) {
    const now = new Date();
    const diff = now - date;

    if (diff < 60 * 1000) {
        const seconds = Math.floor(diff / 1000);
        return `${seconds}秒前`;
    }

    if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes}分前`;
    }

    if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours}時間前`;
    }

    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

function updatePostTimes() {
    const timeElements = document.querySelectorAll('.post-time, .comment-time');
    timeElements.forEach(element => {
        const timestamp = parseInt(element.getAttribute('data-timestamp'));
        if (timestamp) {
            element.textContent = formatPostTime(new Date(timestamp));
        }
    });
}

// User functions
function getCurrentUser() {
    const user = USERS[currentUserIndex];
    currentUserIndex = (currentUserIndex + 1) % USERS.length;
    return user;
}

function getRandomUserExcept(excludeUser) {
    let randomUser;
    do {
        randomUser = USERS[Math.floor(Math.random() * USERS.length)];
    } while (randomUser.name === excludeUser.name);
    return randomUser;
}

// Media handling functions
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        let processedFile = file;

        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            await new Promise((resolve) => {
                img.onload = () => {
                    if (img.width > MAX_IMAGE_WIDTH || img.height > MAX_IMAGE_HEIGHT || file.size > MAX_IMAGE_SIZE) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                };
            }).then(async (needsResize) => {
                if (needsResize) {
                    processedFile = await resizeImage(file);
                    if (processedFile.size > MAX_IMAGE_SIZE) {
                        throw new Error('画像サイズが大きすぎます。画質を下げて再度お試しください。');
                    }
                }
            });
        }

        mediaFile = processedFile;
        const preview = document.getElementById('media-preview');
        preview.innerHTML = `
            <div class="media-preview-container">
                <img src="${URL.createObjectURL(processedFile)}" alt="Preview">
                <button onclick="deleteMediaPreview()" class="delete-media-btn">❌</button>
                <div class="image-info">
                    ${processedFile !== file ? '(画像のサイズを自動調整しました)' : ''}
                    サイズ: ${(processedFile.size / (1024 * 1024)).toFixed(2)}MB
                </div>
            </div>`;
    } catch (error) {
        alert(error.message || '画像のアップロードに失敗しました。');
        event.target.value = '';
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_VIDEO_SIZE) {
        alert('動画サイズが大きすぎます。50MB以下の動画を選択してください。');
        event.target.value = '';
        return;
    }

    mediaFile = file;
    const preview = document.getElementById('media-preview');
    preview.innerHTML = `
        <div class="media-preview-container">
            <video src="${URL.createObjectURL(file)}" controls></video>
            <button onclick="deleteMediaPreview()" class="delete-media-btn">❌</button>
            <div class="video-info">
                サイズ: ${(file.size / (1024 * 1024)).toFixed(2)}MB
            </div>
        </div>`;
}

function deleteMediaPreview() {
    mediaFile = null;
    const preview = document.getElementById('media-preview');
    preview.innerHTML = '';

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
}

function createMediaElement() {
    if (!mediaFile) return '';

    const containerHtml = `
        <div class="media-container">
            ${mediaFile.type.startsWith('image/')
            ? `<img src="${URL.createObjectURL(mediaFile)}" alt="Post image">`
            : `<video src="${URL.createObjectURL(mediaFile)}" controls></video>`}
            <div class="media-actions">
                <button onclick="deletePostMedia(this)" class="delete-media-btn">削除❌</button>
            </div>
        </div>`;

    return containerHtml;
}

function deletePostMedia(button) {
    const mediaContainer = button.closest('.media-container');
    if (mediaContainer) {
        mediaContainer.remove();
    }
}

function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > MAX_IMAGE_WIDTH || height > MAX_IMAGE_HEIGHT) {
                if (width > height) {
                    height *= MAX_IMAGE_WIDTH / width;
                    width = MAX_IMAGE_WIDTH;
                } else {
                    width *= MAX_IMAGE_HEIGHT / height;
                    height = MAX_IMAGE_HEIGHT;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                resolve(new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                }));
            }, 'image/jpeg', 0.85);
        };

        img.onerror = reject;
    });
}

// Profile
function createProfileModal(user) {
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.style.color = 'white';
    modal.style.textAlign = 'center';
    modal.style.padding = '20px';
    modal.style.boxSizing = 'border-box';

    modal.innerHTML = `
        <div style="background-color: rgba(255,255,255,0.2); padding: 30px; border-radius: 15px; max-width: 400px; width: 90%; position: relative;">
            <img src="${user.avatar}" alt="${user.name}" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 4px solid white;">
            <h2 style="margin-bottom: 15px; font-size: 24px;">${user.name}</h2>
            <div style="text-align: left; padding: 0 20px;">
                <p><strong>:</strong> ${user.profileName}</p>
                <p><strong>年齢:</strong> ${user.age}歳</p>
                <p><strong>生年:</strong> ${user.birthYear}年</p>
                <p><strong>出身地:</strong> ${user.birthPlace}</p>
            </div>
            <button id="back-btn" style="margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">戻る</button>
        </div>
    `;

    document.body.appendChild(modal);

    const backBtn = modal.querySelector('#back-btn');
    backBtn.addEventListener('click', () => {
        modal.remove();
        window.location.href = '/champ';
    });
}

function handleAvatarClick(event) {
    event.stopPropagation();

    const avatar = event.currentTarget;
    let usernameElement = null;

    if (avatar.classList.contains('post-avatar')) {
        usernameElement = avatar.closest('.post-header')?.querySelector('.post-username');
    }
    else if (avatar.classList.contains('comment-avatar')) {
        usernameElement = avatar.closest('.comment')?.querySelector('.comment-username');
    }

    if (usernameElement) {
        const username = usernameElement.textContent;
        const userProfile = USERS_PROFILE.find(user => user.name === username);

        if (userProfile) {
            avatar.style.borderColor = '#ff0000';
            setTimeout(() => {
                avatar.style.borderColor = 'transparent';
                createProfileModal(userProfile);
            }, 150);
        }
    }
}

function showPostUserProfile(button) {
    const postHeader = button.closest('.post-header');
    if (postHeader) {
        const usernameElement = postHeader.querySelector('.post-username');
        if (usernameElement) {
            const username = usernameElement.textContent;
            const userProfile = USERS_PROFILE.find(user => user.name === username);

            if (userProfile) {
                createProfileModal(userProfile);
            }
        }
    }
}

function addProfileButtonsToExistingPosts() {
    const postHeaders = document.querySelectorAll('.post-header');

    postHeaders.forEach(header => {
        const usernameElement = header.querySelector('.post-username');
        const userInfoElement = header.querySelector('.post-user-info');

        if (usernameElement && !header.querySelector('.post-user-top')) {
            const timeElement = userInfoElement.querySelector('.post-time');

            const userTopDiv = document.createElement('div');
            userTopDiv.className = 'post-user-top';
            userTopDiv.appendChild(usernameElement.cloneNode(true));

            const profileButton = document.createElement('button');
            profileButton.textContent = 'プロフィール';
            profileButton.className = 'profile-btn';
            profileButton.onclick = function () { showPostUserProfile(this); };
            userTopDiv.appendChild(profileButton);

            userInfoElement.innerHTML = '';
            userInfoElement.appendChild(userTopDiv);

            if (timeElement) {
                userInfoElement.appendChild(timeElement.cloneNode(true));
            }
        }
    });
}

function setupAvatarHandlers() {
    const avatars = document.querySelectorAll('.post-avatar, .comment-avatar');
    avatars.forEach(avatar => {
        avatar.removeEventListener('click', handleAvatarClick);
        avatar.addEventListener('click', handleAvatarClick);
    });
}

function removeProfileButtonsFromComments() {
    const commentButtons = document.querySelectorAll('.comment-actions .comment-btn');
    commentButtons.forEach(button => {
        if (button.textContent === '') {
            button.remove();
        }
    });
}

// Comment and post functions
function generateRandomComments() {
    const commentCount = Math.floor(Math.random() * 10) + 1;
    let commentsHtml = '';

    for (let i = 0; i < commentCount; i++) {
        const commentUser = getRandomUserExcept(getCurrentUser());
        const commentText = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
        const randomTime = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));

        commentsHtml += `
            <div class="comment">
                <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar">
                <div class="comment-content">
                    <span class="comment-username">${commentUser.name}</span>
                    <p>${commentText}</p>
                    <span class="comment-time" data-timestamp="${randomTime.getTime()}">${formatPostTime(randomTime)}</span>
                    <div class="comment-actions">
                        <button onclick="likeComment(this)">👍 <span>0</span></button>
                        <button onclick="deleteComment(this)" class="comment-btn">削除❌</button>
                    </div>
                </div>
            </div>
        `;
    }

    return commentsHtml;
}

function submitComment(event, form) {
    event.preventDefault();

    const commentInput = form.querySelector('.comment-input');
    const commentText = commentInput.value.trim();

    if (!commentText) return;

    const commentInputSection = form.closest('.comment-input-section');
    const commentUser = getRandomUserExcept(getCurrentUser());
    const commentTime = new Date();

    const commentHtml = `
        <div class="comment">
            <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar">
            <div class="comment-content">
                <span class="comment-username">${commentUser.name}</span>
                <p>${commentText}</p>
                <span class="comment-time" data-timestamp="${commentTime.getTime()}">${formatPostTime(commentTime)}</span>
                <div class="comment-actions">
                    <button onclick="likeComment(this)">👍 <span>0</span></button>
                    <button onclick="deleteComment(this)" class="comment-btn">削除❌</button>
                </div>
            </div>
        </div>
    `;

    commentInputSection.insertAdjacentHTML('afterend', commentHtml);
    commentInput.value = '';

    const newComment = commentInputSection.nextElementSibling;
    const newAvatar = newComment.querySelector('.comment-avatar');
    if (newAvatar) {
        newAvatar.addEventListener('click', handleAvatarClick);
    }
}

function createPost() {
    const container = document.querySelector('.posts-container');
    const input = document.querySelector('.post-input');
    const text = input.value.trim();

    if (text || mediaFile) {
        const currentUser = getCurrentUser();
        const postTime = new Date();

        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <div class="post-header">
                <img src="${currentUser.avatar}" alt="User" class="post-avatar">
                <div class="post-user-info">
                    <div class="post-user-top">
                        <span class="post-username">${currentUser.name}</span>
                    </div>
                    <span class="post-time" data-timestamp="${postTime.getTime()}">${formatPostTime(postTime)}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${text}</p>
                <div class="post-media">
                    ${mediaFile ? createMediaElement() : ''}
                </div>
            </div>
            <div class="post-actions">
                <div class="comments-container">
                    <div class="comment-input-section">
                        <form class="comment-form" onsubmit="submitComment(event, this)">
                            <input type="text" class="comment-input" name="comment_text" placeholder="コメントを追加">
                            <button type="submit" class="post-btn">コメント</button>
                        </form>
                    </div>
                    ${generateRandomComments()}
                </div>
            </div>
        `;

        container.insertBefore(post, container.firstChild);
        input.value = '';
        deleteMediaPreview();
        updatePostTimes();

        const newAvatars = post.querySelectorAll('.post-avatar, .comment-avatar');
        newAvatars.forEach(avatar => {
            avatar.addEventListener('click', handleAvatarClick);
        });
    }
}

// Interaction handlers
function likeComment(button) {
    const span = button.querySelector('span');
    let likes = parseInt(span.textContent);
    span.textContent = likes + 1;
}

function deleteComment(button) {
    const comment = button.closest('.comment');
    if (comment) {
        comment.remove();
    }
}

function likePost(button) {
    const span = button.querySelector('span');
    let likes = parseInt(span.textContent);
    span.textContent = likes + 1;
}

// Setup DOM mutations observer
function setupObserver() {
    const observer = new MutationObserver(mutations => {
        let needsAvatarUpdate = false;
        let needsButtonRemoval = false;

        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.querySelector('.post-avatar, .comment-avatar')) {
                            needsAvatarUpdate = true;
                        }
                        if (node.querySelector('.comment-actions')) {
                            needsButtonRemoval = true;
                        }
                    }
                });
            }
        });

        if (needsAvatarUpdate) {
            setupAvatarHandlers();
        }

        if (needsButtonRemoval) {
            removeProfileButtonsFromComments();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return observer;
}

document.addEventListener('DOMContentLoaded', () => {

    document.head.appendChild(styleElement);

    setupAvatarHandlers();

    removeProfileButtonsFromComments();

    addProfileButtonsToExistingPosts();

    setupObserver();

    setInterval(updatePostTimes, 1000);

    setInterval(() => {
        setupAvatarHandlers();
        removeProfileButtonsFromComments();
    }, 10000);
});

function generateRandomComments() {
    const commentCount = Math.floor(Math.random() * 10) + 1;
    let commentsHtml = '';

    for (let i = 0; i < commentCount; i++) {
        const commentUser = getRandomUserExcept(getCurrentUser());
        const commentText = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
        const randomTime = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));

        commentsHtml += `
            <div class="comment">
                <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar">
                <div class="comment-content">
                    <span class="comment-username">${commentUser.name}</span>
                    <p>${commentText}</p>
                    <span class="comment-time" data-timestamp="${randomTime.getTime()}">${formatPostTime(randomTime)}</span>
                    <div class="comment-actions">
                        <button onclick="likeComment(this)">👍 <span>0</span></button>
                        <button onclick="deleteComment(this)" class="comment-btn">削除❌</button>
                    </div>
                </div>
            </div>
        `;
    }

    return commentsHtml;
}

// submitcomment
function submitComment(event, form) {
    event.preventDefault();

    const commentInput = form.querySelector('.comment-input');
    const commentText = commentInput.value.trim();

    if (!commentText) return;

    const commentInputSection = form.closest('.comment-input-section');
    const commentUser = getRandomUserExcept(getCurrentUser());
    const commentTime = new Date();

    const commentHtml = `
        <div class="comment">
            <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar">
            <div class="comment-content">
                <span class="comment-username">${commentUser.name}</span>
                <p>${commentText}</p>
                <span class="comment-time" data-timestamp="${commentTime.getTime()}">${formatPostTime(commentTime)}</span>
                <div class="comment-actions">
                    <button onclick="likeComment(this)">👍 <span>0</span></button>
                    <button onclick="deleteComment(this)" class="comment-btn">削除❌</button>
                </div>
            </div>
        </div>
    `;

    commentInputSection.insertAdjacentHTML('afterend', commentHtml);
    commentInput.value = '';

    const newComment = commentInputSection.nextElementSibling;
    const newAvatar = newComment.querySelector('.comment-avatar');
    if (newAvatar) {
        newAvatar.addEventListener('click', handleAvatarClick);
    }
}

// 削除
function removeProfileButtonsFromComments() {
    const commentButtons = document.querySelectorAll('.comment-actions .comment-btn');
    commentButtons.forEach(button => {
        if (button.textContent === 'プロフィール') {
            button.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.head.appendChild(styleElement);


    setupAvatarHandlers();

    removeProfileButtonsFromComments();

    addProfileButtonsToExistingPosts();

    setupObserver();

    // 時間表示
    setInterval(updatePostTimes, 1000);

    //削除削除
    setInterval(() => {
        setupAvatarHandlers();
        removeProfileButtonsFromComments();
    }, 10000);
});
// コメントと投稿の続き
function submitComment(event, form) {
    event.preventDefault();

    const commentInput = form.querySelector('.comment-input');
    const commentText = commentInput.value.trim();

    if (!commentText) return;

    const commentInputSection = form.closest('.comment-input-section');
    const commentUser = getRandomUserExcept(getCurrentUser());
    const commentTime = new Date();

    const commentHtml = `
        <div class="comment">
            <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar">
            <div class="comment-content">
                <span class="comment-username">${commentUser.name}</span>
                <p>${commentText}</p>
                <span class="comment-time" data-timestamp="${commentTime.getTime()}">${formatPostTime(commentTime)}</span>
                <div class="comment-actions">
                    <button onclick="likeComment(this)">👍 <span>0</span></button>
                    <button onclick="deleteComment(this)" class="comment-btn">削除❌</button>
                </div>
            </div>
        </div>
    `;

    commentInputSection.insertAdjacentHTML('afterend', commentHtml);
    commentInput.value = '';

    const newComment = commentInputSection.nextElementSibling;
    const newAvatar = newComment.querySelector('.comment-avatar');
    if (newAvatar) {
        newAvatar.addEventListener('click', handleAvatarClick);
    }
}

function createPost() {
    const container = document.querySelector('.posts-container');
    const input = document.querySelector('.post-input');
    const text = input.value.trim();

    if (text || mediaFile) {
        const currentUser = getCurrentUser();
        const postTime = new Date();

        // 特殊ユーザーの判定
        const isSpecialUser = currentUser.name === "田中聖治" || currentUser.name === "ブライアン";

        // ヘッダーのHTML生成
        let headerHtml;
        if (isSpecialUser) {
            // 田中聖治 または ブライアンの場合、プロフィールボタンなし
            headerHtml = `
                <div class="post-header">
                    <img src="${currentUser.avatar}" alt="User" class="post-avatar">
                    <div class="post-user-info">
                        <span class="post-username">${currentUser.name}</span>
                        <span class="post-time" data-timestamp="${postTime.getTime()}">${formatPostTime(postTime)}</span>
                    </div>
                </div>
            `;
        } else {
            // その他のユーザーはプロフィールボタンあり
            headerHtml = `
                <div class="post-header">
                    <img src="${currentUser.avatar}" alt="User" class="post-avatar">
                    <div class="post-user-info">
                        <div class="post-user-top">
                            <span class="post-username">${currentUser.name}</span>
                        </div>
                        <span class="post-time" data-timestamp="${postTime.getTime()}">${formatPostTime(postTime)}</span>
                    </div>
                </div>
            `;
        }

        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            ${headerHtml}
            <div class="post-content">
                <p>${text}</p>
                <div class="post-media">
                    ${mediaFile ? createMediaElement() : ''}
                </div>
            </div>
            <div class="post-actions">
                <div class="comments-container">
                    <div class="comment-input-section">
                        <form class="comment-form" onsubmit="submitComment(event, this)">
                            <input type="text" class="comment-input" name="comment_text" placeholder="コメントを追加">
                            <button type="submit" class="post-btn">コメント</button>
                        </form>
                    </div>
                    ${generateRandomComments()}
                </div>
            </div>
        `;

        container.insertBefore(post, container.firstChild);
        input.value = '';
        deleteMediaPreview();
        updatePostTimes();

        const newAvatars = post.querySelectorAll('.post-avatar, .comment-avatar');
        newAvatars.forEach(avatar => {
            avatar.addEventListener('click', handleAvatarClick);
        });
    }
}

// インタラクションハンドラー
function likeComment(button) {
    const span = button.querySelector('span');
    let likes = parseInt(span.textContent);
    span.textContent = likes + 1;
}

function deleteComment(button) {
    const comment = button.closest('.comment');
    if (comment) {
        comment.remove();
    }
}

function likePost(button) {
    const span = button.querySelector('span');
    let likes = parseInt(span.textContent);
    span.textContent = likes + 1;
}

// アバターとプロフィール関連の関数
function handleAvatarClick(event) {
    event.stopPropagation();

    const avatar = event.currentTarget;
    let usernameElement = null;

    if (avatar.classList.contains('post-avatar')) {
        usernameElement = avatar.closest('.post-header')?.querySelector('.post-username');
    }
    else if (avatar.classList.contains('comment-avatar')) {
        usernameElement = avatar.closest('.comment')?.querySelector('.comment-username');
    }

    if (usernameElement) {
        const username = usernameElement.textContent;
        const userProfile = USERS_PROFILE.find(user => user.name === username);

        if (userProfile) {
            avatar.style.borderColor = '#ff0000';
            setTimeout(() => {
                avatar.style.borderColor = 'transparent';
                createProfileModal(userProfile);
            }, 150);
        }
    }
}

function createProfileModal(user) {
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.style.color = 'white';
    modal.style.textAlign = 'center';
    modal.style.padding = '20px';
    modal.style.boxSizing = 'border-box';

    modal.innerHTML = `
        <div style="background-color: rgba(255,255,255,0.2); padding: 30px; border-radius: 15px; max-width: 400px; width: 90%; position: relative;">
            <img src="${user.avatar}" alt="${user.name}" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 4px solid white;">
            <h2 style="margin-bottom: 15px; font-size: 24px;">${user.name}</h2>
            <div style="text-align: left; padding: 0 20px;">
                <p><strong>プロフィール名:</strong> ${user.profileName}</p>
                <p><strong>年齢:</strong> ${user.age}歳</p>
                <p><strong>生年:</strong> ${user.birthYear}年</p>
                <p><strong>出身地:</strong> ${user.birthPlace}</p>
            </div>
            <button id="back-btn" style="margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">戻る</button>
        </div>
    `;

    document.body.appendChild(modal);

    const backBtn = modal.querySelector('#back-btn');
    backBtn.addEventListener('click', () => {
        modal.remove();
    });
}

function showPostUserProfile(button) {
    const postHeader = button.closest('.post-header');
    if (postHeader) {
        const usernameElement = postHeader.querySelector('.post-username');
        if (usernameElement) {
            const username = usernameElement.textContent;
            const userProfile = USERS_PROFILE.find(user => user.name === username);

            if (userProfile) {
                createProfileModal(userProfile);
            }
        }
    }
}

// 既存の投稿にプロフィールボタンを追加
function addProfileButtonsToExistingPosts() {
    const postHeaders = document.querySelectorAll('.post-header');

    postHeaders.forEach(header => {
        const usernameElement = header.querySelector('.post-username');

        // 特殊ユーザーをチェック
        if (usernameElement) {
            const username = usernameElement.textContent;
            if (username === "田中聖治" || username === "ブライアン") {
                // 特殊ユーザーにはプロフィールボタンを追加しない
                return;
            }
        }

        const userInfoElement = header.querySelector('.post-user-info');

        if (usernameElement && !header.querySelector('.post-user-top')) {
            const timeElement = userInfoElement.querySelector('.post-time');

            const userTopDiv = document.createElement('div');
            userTopDiv.className = 'post-user-top';
            userTopDiv.appendChild(usernameElement.cloneNode(true));

            const profileButton = document.createElement('button');
            profileButton.textContent = 'プロフィール';
            profileButton.className = 'profile-btn';
            profileButton.onclick = function () { showPostUserProfile(this); };
            userTopDiv.appendChild(profileButton);

            userInfoElement.innerHTML = '';
            userInfoElement.appendChild(userTopDiv);

            if (timeElement) {
                userInfoElement.appendChild(timeElement.cloneNode(true));
            }
        }
    });
}

// ミューテーション監視
function setupObserver() {
    const observer = new MutationObserver(mutations => {
        let needsAvatarUpdate = false;
        let needsButtonRemoval = false;

        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // 要素ノード
                        if (node.querySelector('.post-avatar, .comment-avatar')) {
                            needsAvatarUpdate = true;
                        }
                        if (node.querySelector('.comment-actions')) {
                            needsButtonRemoval = true;
                        }
                    }
                });
            }
        });

        if (needsAvatarUpdate) {
            setupAvatarHandlers();
        }

        if (needsButtonRemoval) {
            removeProfileButtonsFromComments();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return observer;
}

function setupAvatarHandlers() {
    const avatars = document.querySelectorAll('.post-avatar, .comment-avatar');
    avatars.forEach(avatar => {
        avatar.removeEventListener('click', handleAvatarClick);
        avatar.addEventListener('click', handleAvatarClick);
    });
}

function removeProfileButtonsFromComments() {
    const commentButtons = document.querySelectorAll('.comment-actions .comment-btn');
    commentButtons.forEach(button => {
        if (button.textContent === 'プロフィール') {
            button.remove();
        }
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // スタイルの追加
    document.head.appendChild(styleElement);

    // アバターハンドラーの設定
    setupAvatarHandlers();

    // コメントからプロフィールボタンを削除
    removeProfileButtonsFromComments();

    // 既存の投稿にプロフィールボタンを追加
    addProfileButtonsToExistingPosts();

    // オブザーバーの設定
    setupObserver();

    // 投稿時間を定期的に更新
    setInterval(updatePostTimes, 1000);

    // アバターハンドラーとボタン削除の定期的なチェック
    setInterval(() => {
        setupAvatarHandlers();
        removeProfileButtonsFromComments();
    }, 10000);
});