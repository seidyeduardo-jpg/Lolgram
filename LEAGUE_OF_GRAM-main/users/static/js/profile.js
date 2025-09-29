document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const avatarInput = document.getElementById('id_avatar');
    const previewAvatar = document.getElementById('preview-avatar');
    const fileName = document.getElementById('file-name');
    const fileNameContainer = document.querySelector('.selected-file-name');
    const messageArea = document.getElementById('message-area');
    const saveButton = document.getElementById('save-button');
    let imageSelected = false;

    // functon clearimage
    function clearImage() {
        const emptyImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        const currentSrc = previewAvatar.getAttribute('src');
        if (!currentSrc || currentSrc === 'None' || currentSrc === '') {
            previewAvatar.src = emptyImg;
            previewAvatar.style.background = 'rgba(0, 0, 0, 0.1)';
            previewAvatar.style.display = 'flex';
            previewAvatar.style.alignItems = 'center';
            previewAvatar.style.justifyContent = 'center';
            if (fileName) fileName.textContent = '';
            if (fileNameContainer) fileNameContainer.style.display = 'none';
            imageSelected = false;
        } else {
            imageSelected = true;
        }
    }

    // clear image
    clearImage();

    function handleImagePreview(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewAvatar.src = e.target.result;
                previewAvatar.style.background = '';
                
                fileName.textContent = input.files[0].name;
                fileNameContainer.style.display = 'block';
                imageSelected = true;
                
                // verification usernameInput
                const usernameInput = document.querySelector('input[name="username"]');
                if (usernameInput && usernameInput.value.length >= 6) {
                    saveButton.innerHTML = '<i class="fas fa-check mr-2"></i>保存中...';
                    saveButton.style.backgroundColor = '#4CAF50';
                    setTimeout(() => {
                        submitForm();
                    }, 500);
                } else {
                    addErrorMessage('ユーザー名は6文字以上である必要があります。');
                    usernameInput.classList.add('is-invalid');
                    usernameInput.focus();
                }
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    // function validateform
    function validateForm() {
        //clean old image
        messageArea.innerHTML = '';
        
        let isValid = true;
        
        // Validation for image
        const currentSrc = previewAvatar.getAttribute('src');
        if (!imageSelected && (!currentSrc || currentSrc === 'None' || currentSrc === '' || 
            currentSrc === 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
            isValid = false;
            addErrorMessage('画像を選択してください。');
        }
        
        // validation a name
        const usernameInput = document.querySelector('input[name="username"]');
        if (usernameInput && usernameInput.value.length < 6) {
            isValid = false;
            addErrorMessage('ユーザー名は6文字以上である必要があります。');
            usernameInput.classList.add('is-invalid');
        } else if (usernameInput) {
            usernameInput.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // error message
    function addErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = message;
        messageArea.appendChild(errorDiv);
    }

    async function submitForm() {
        // 確認動作
        if (!validateForm()) {
            return; 
        }
        
        const formData = new FormData(profileForm);
        
        try {
            saveButton.disabled = true;
            saveButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>保存中...';
            
            const response = await fetch(profileForm.action || window.location.href, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                }
            });
            
            if (!response.ok) {
                // エラーがるか
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    if (data.errors) {
                        Object.entries(data.errors).forEach(([field, errors]) => {
                            errors.forEach(error => addErrorMessage(error));
                        });
                        throw new Error('入力エラーがあります');
                    }
                }
                throw new Error('保存に失敗しました');
            }
            
            window.location.replace('/');
            
        } catch (error) {
            saveButton.disabled = false;
            saveButton.innerHTML = '<i class="fas fa-save mr-2"></i>変更を保存';
            
            if (messageArea.children.length === 0) {
                alert(error.message);
            }
        }
    }

    // function handleformsubmit
    function handleFormSubmit(e) {
        e.preventDefault();
        submitForm();
    }
    
    if (avatarInput) {
        avatarInput.addEventListener('change', function() {
            handleImagePreview(this);
        });
    }
    
    if (profileForm) {
        profileForm.addEventListener('submit', handleFormSubmit);
    }
});