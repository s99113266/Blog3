// 新增文章頁面 JavaScript 功能
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadNavigation();
    loadFooter();
    checkEditMode();
    
    // 延遲初始化 TinyMCE 和表單處理器，確保編輯器完全載入
    setTimeout(function() {
        initializeTinyMCE();
        setupFormHandlers();
    }, 500);
});

// 初始化頁面
function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        document.getElementById('id').value = articleId;
        document.getElementById('actiontype').value = '內容';
        loadArticleContent(articleId);
    }
}

// 載入導覽列
function loadNavigation() {
    fetch('../navigation.json')
        .then(response => response.json())
        .then(data => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.innerHTML = '';
            
            data.links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.name;
                li.appendChild(a);
                navLinks.appendChild(li);
            });
        })
        .catch(error => {
            console.error('載入導覽列失敗:', error);
            // 可以選擇顯示錯誤訊息，但這裡先保持靜默
        });
}

// 載入頁腳
function loadFooter() {
    fetch('../footer.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('footerText').textContent = data.copyright;
        })
        .catch(error => {
            console.error('載入頁腳失敗:', error);
            // 可以選擇顯示錯誤訊息，但這裡先保持靜默
        });
}

// 初始化 TinyMCE 編輯器
function initializeTinyMCE() {
    console.log('開始初始化 TinyMCE 編輯器');
    
    // 檢查 TinyMCE 是否已載入
    if (typeof tinymce === 'undefined') {
        console.error('TinyMCE 未載入');
        return;
    }
    
    tinymce.init({
        selector: '#text',
        height: 400,
        menubar: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | \
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help',
        content_style: 'body { font-family: var(--font-family-sans); font-size: var(--font-size-base); }',
        setup: function(editor) {
            // 編輯器初始化完成後的回調
            editor.on('init', function() {
                console.log('TinyMCE 編輯器初始化完成');
                
                // 檢查編輯器實例是否存在
                if (tinymce.get('text')) {
                    console.log('TinyMCE 編輯器實例存在');
                    
                    // 禁用原始 textarea 的 required 屬性，因為 TinyMCE 已經處理驗證
                    const textarea = document.getElementById('text');
                    if (textarea) {
                        textarea.removeAttribute('required');
                        console.log('已移除原始 textarea 的 required 屬性');
                    }
                } else {
                    console.error('TinyMCE 編輯器實例不存在');
                }
            });
            
            // 在內容變化時更新原始 textarea 的值
            editor.on('change', function() {
                const textarea = document.getElementById('text');
                if (textarea) {
                    textarea.value = editor.getContent();
                }
            });
        }
    });
}

// 檢查編輯模式
function checkEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        document.title = '編輯文章 - 你的部落格';
        document.querySelector('.section-title').textContent = '編輯文章';
        document.querySelector('button[type="submit"]').textContent = '更新文章';
    }
}

// 載入文章內容（編輯模式）
function loadArticleContent(articleId) {
    showLoading();
    
    // 從 api-endpoints.json 獲取 API URL
    fetch('../api-endpoints.json')
        .then(response => response.json())
        .then(apiData => {
            const formData = new FormData();
            formData.append('actiontype', '內容');
            formData.append('id', articleId);
            
            return fetch(apiData.post_url, {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.title && data.text) {
                document.getElementById('title').value = data.title;
                tinymce.get('text').setContent(data.text);
            } else {
                showError('載入文章內容失敗：無效的數據格式');
            }
            hideLoading();
        })
        .catch(error => {
            console.error('載入文章內容失敗:', error);
            showError('載入文章內容失敗，請檢查網路連接或稍後再試');
            hideLoading();
        });
}

// 設置表單處理器
function setupFormHandlers() {
    const form = document.getElementById('articleForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    console.log('設置表單處理器');
    
    // 表單提交
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('表單提交事件觸發');
        
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        // 設置 actiontype
        if (articleId) {
            document.getElementById('actiontype').value = '編輯';
            console.log('設置為編輯模式');
        } else {
            document.getElementById('actiontype').value = '新增';
            console.log('設置為新增模式');
        }
        
        // 獲取 TinyMCE 內容並更新到 textarea
        const editor = tinymce.get('text');
        if (editor) {
            const content = editor.getContent();
            document.getElementById('text').value = content;
            console.log('TinyMCE 內容已更新');
            
            // 驗證 TinyMCE 內容是否為空
            if (!content || content.trim() === '' || content === '<p></p>' || content === '<p><br data-mce-bogus="1"></p>') {
                e.preventDefault();
                showError('文章內容不能為空');
                return;
            }
        } else {
            console.error('TinyMCE 編輯器未找到');
            e.preventDefault();
            showError('編輯器載入失敗，請重新整理頁面');
            return;
        }
        
        // 驗證標題
        const title = document.getElementById('title').value.trim();
        if (!title) {
            e.preventDefault();
            showError('文章標題不能為空');
            return;
        }
        
        // 驗證密碼
        const password = document.getElementById('pwd').value.trim();
        if (!password) {
            e.preventDefault();
            showError('管理員密碼不能為空');
            return;
        }
        
        // 提交表單
        console.log('準備提交表單');
        submitForm();
    });
    
    // 取消按鈕
    cancelBtn.addEventListener('click', function() {
        if (confirm('確定要取消編輯嗎？未儲存的變更將會遺失。')) {
            window.history.back();
        }
    });
}

// 提交表單
function submitForm() {
    console.log('開始提交表單');
    showLoading();
    
    // 從 api-endpoints.json 獲取 API URL
    fetch('../api-endpoints.json')
        .then(response => {
            console.log('API 端點響應:', response);
            return response.json();
        })
        .then(apiData => {
            console.log('API 端點數據:', apiData);
            
            // 創建新的 FormData 對象
            const form = document.getElementById('articleForm');
            const formData = new FormData(form);
            
            // 確保 TinyMCE 內容已更新
            const editor = tinymce.get('text');
            if (editor) {
                const content = editor.getContent();
                formData.set('text', content);
                console.log('TinyMCE 內容已更新到 FormData');
            }
            
            console.log('表單數據:', formData);
            
            return fetch(apiData.post_url, {
                method: 'POST',
                body: formData
            });
        })
        .then(response => {
            console.log('API 請求響應:', response);
            return response.json();
        })
        .then(data => {
            console.log('API 返回數據:', data);
            if (data.state === 0) {
                showSuccess('文章發布成功！');
                setTimeout(() => {
                    window.location.href = '/admin/posts.html';
                }, 2000);
            } else if (data.state === 1) {
                showError('發布失敗，請檢查輸入內容');
            } else {
                showError('操作失敗，請稍後再試');
            }
            hideLoading();
        })
        .catch(error => {
            console.error('提交表單失敗:', error);
            showError('提交失敗，請檢查網路連接或稍後再試');
            hideLoading();
        });
}

// 顯示加載指示器
function showLoading() {
    document.getElementById('loading').classList.add('active');
}

// 隱藏加載指示器
function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}

// 顯示錯誤訊息
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('active');
    
    setTimeout(() => {
        errorElement.classList.remove('active');
    }, 5000);
}

// 顯示成功訊息
function showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = message;
    successElement.classList.add('active');
}