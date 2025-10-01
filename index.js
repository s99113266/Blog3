// 頁面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化頁面
    initializePage();
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
    fetch('navigation.json')
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
    fetch('author.json')
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
    fetch('footer.json')
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
    fetch('api-endpoints.json')
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
    const articlesListElement = document.getElementById('articles-list');
    
    if (!articles || articles.length === 0) {
        articlesListElement.innerHTML = '<p class="error">暫無文章</p>';
        return;
    }
    
    // 清除加載中狀態
    articlesListElement.innerHTML = '';
    
    // 創建文章列表 HTML
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-summary-block';
        articleElement.innerHTML = `
            <a href="/post.html?id=${article.id}" class="article-title">${article.title}</a>
            <p class="article-excerpt">${article.summary}</p>
            <div class="article-meta">${article.date}</div>
        `;
        articlesListElement.appendChild(articleElement);
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

// 顯示錯誤信息
function displayError(message) {
    const articlesListElement = document.getElementById('articles-list');
    articlesListElement.innerHTML = `<p class="error">${message}</p>`;
}