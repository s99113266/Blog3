// 全局變數
let currentDeleteId = null;

// 頁面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化頁面
    initializePage();
    
    // 初始化刪除彈窗
    initializeDeleteModal();
});

// 初始化頁面
function initializePage() {
    // 載入導覽列
    loadNavigation();
    
    // 載入作者資訊
    loadAuthorInfo();
    
    // 載入頁腳
    loadFooter();
    
    // 載入文章列表
    loadArticles();
}

// 載入導覽列
function loadNavigation() {
    fetch('../navigation.json')
        .then(response => response.json())
        .then(data => {
            const navigationElement = document.getElementById('navigation-links');
            navigationElement.innerHTML = '';
            
            data.links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.name;
                li.appendChild(a);
                navigationElement.appendChild(li);
            });
        })
        .catch(error => {
            console.error('載入導覽列失敗:', error);
        });
}

// 載入作者資訊
function loadAuthorInfo() {
    fetch('../author.json')
        .then(response => response.json())
        .then(data => {
            const authorElement = document.getElementById('author-info');
            
            // 創建作者資訊 HTML
            authorElement.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.nickname}" class="author-avatar">
                <h2 class="author-nickname">${data.nickname}</h2>
                <div class="author-bio">${data.blog_summary}</div>
                <div class="author-social-links">
                    ${data.social_links.map(link => `
                        <a href="${link.url}" title="${link.name}" target="_blank" rel="noopener noreferrer">
                            ${getSocialIcon(link.name)}
                        </a>
                    `).join('')}
                </div>
            `;
        })
        .catch(error => {
            console.error('載入作者資訊失敗:', error);
        });
}

// 獲取社群圖標
function getSocialIcon(platform) {
    const icons = {
        'Facebook': 'f',
        'Twitter': 't',
        'LinkedIn': 'in'
    };
    return icons[platform] || platform.charAt(0);
}

// 載入頁腳
function loadFooter() {
    fetch('../footer.json')
        .then(response => response.json())
        .then(data => {
            const footerElement = document.getElementById('footer');
            footerElement.innerHTML = `<p>${data.copyright}</p>`;
        })
        .catch(error => {
            console.error('載入頁腳失敗:', error);
        });
}

// 載入文章列表
function loadArticles() {
    // 獲取當前頁碼
    const currentPage = getCurrentPage();
    
    // 從 API 端點獲取 URL
    fetch('../api-endpoints.json')
        .then(response => response.json())
        .then(apiData => {
            // 準備 POST 請求數據
            const formData = new FormData();
            formData.append('actiontype', '列表');
            formData.append('nowpg', currentPage);
            
            // 發送 POST 請求
            return fetch(apiData.post_url, {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(data => {
            // 顯示文章列表
            displayArticles(data.articles);
            
            // 顯示分頁
            displayPagination(data.totalArticles, currentPage);
        })
        .catch(error => {
            console.error('載入文章列表失敗:', error);
            displayError('載入文章列表失敗，請稍後再試。');
        });
}

// 獲取當前頁碼
function getCurrentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page') || 1;
}

// 顯示文章列表
function displayArticles(articles) {
    const articlesManagementElement = document.getElementById('articles-management');
    
    if (!articles || articles.length === 0) {
        articlesManagementElement.innerHTML = '<p class="error">暫無文章</p>';
        return;
    }
    
    // 清除加載中狀態
    articlesManagementElement.innerHTML = '';
    
    // 創建文章列表 HTML
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-management-block';
        articleElement.innerHTML = `
            <a href="/admin/new-post.html?id=${article.id}" class="article-title">${article.title}</a>
            <p class="article-excerpt">${article.summary}</p>
            <div class="article-meta">${article.date}</div>
            <div class="article-actions">
                <button class="delete-button" data-id="${article.id}">刪除</button>
            </div>
        `;
        articlesManagementElement.appendChild(articleElement);
    });
    
    // 為所有刪除按鈕添加事件監聽器
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');
            showDeleteModal(articleId);
        });
    });
}

// 顯示分頁
function displayPagination(totalArticles, currentPage) {
    const paginationElement = document.getElementById('pagination');
    
    // 計算總頁數（假設每頁 10 篇文章）
    const articlesPerPage = 10;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    if (totalPages <= 1) {
        paginationElement.innerHTML = '';
        return;
    }
    
    paginationElement.innerHTML = '';
    
    // 生成分頁連結
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = `/?page=${i}`;
        pageLink.className = 'pagination-link';
        pageLink.textContent = i;
        
        if (i === parseInt(currentPage)) {
            pageLink.classList.add('active');
        }
        
        paginationElement.appendChild(pageLink);
    }
}

// 初始化刪除彈窗
function initializeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    const form = document.getElementById('delete-form');
    const cancelBtn = document.getElementById('cancel-delete');
    
    // 取消按鈕事件
    cancelBtn.addEventListener('click', hideDeleteModal);
    
    // 點擊彈窗外部關閉
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideDeleteModal();
        }
    });
    
    // 表單提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        confirmDelete();
    });
}

// 顯示刪除彈窗
function showDeleteModal(articleId) {
    currentDeleteId = articleId;
    const modal = document.getElementById('delete-modal');
    modal.classList.add('active');
    
    // 清空密碼輸入框
    document.getElementById('admin-pwd').value = '';
}

// 隱藏刪除彈窗
function hideDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('active');
    currentDeleteId = null;
}

// 確認刪除
function confirmDelete() {
    if (!currentDeleteId) return;
    
    const adminPwd = document.getElementById('admin-pwd').value;
    
    // 從 API 端點獲取 URL
    fetch('../api-endpoints.json')
        .then(response => response.json())
        .then(apiData => {
            // 準備刪除請求數據
            const formData = new FormData();
            formData.append('actiontype', '刪除');
            formData.append('pwd', adminPwd);
            formData.append('id', currentDeleteId);
            
            // 發送刪除請求
            return fetch(apiData.post_url, {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(data => {
            // 隱藏彈窗
            hideDeleteModal();
            
            // 重新載入文章列表
            loadArticles();
        })
        .catch(error => {
            console.error('刪除文章失敗:', error);
            hideDeleteModal();
            loadArticles(); // 即使失敗也重新載入列表
        });
}

// 顯示錯誤信息
function displayError(message) {
    const articlesManagementElement = document.getElementById('articles-management');
    articlesManagementElement.innerHTML = `<p class="error">${message}</p>`;
}