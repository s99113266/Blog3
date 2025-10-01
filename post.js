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
    
    // 載入文章內容
    loadArticleContent();
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

// 載入文章內容
function loadArticleContent() {
    // 從 URL 中讀取文章 ID
    const articleId = getArticleId();
    
    if (!articleId) {
        displayError('未找到文章 ID');
        return;
    }
    
    // 從 API 端點獲取 URL
    fetch('api-endpoints.json')
        .then(response => response.json())
        .then(apiData => {
            // 準備 POST 請求數據
            const formData = new FormData();
            formData.append('actiontype', '內容');
            formData.append('id', articleId);
            
            // 發送 POST 請求
            return fetch(apiData.post_url, {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(data => {
            // 顯示文章內容
            displayArticleContent(data);
        })
        .catch(error => {
            console.error('載入文章內容失敗:', error);
            displayError('載入文章內容失敗，請稍後再試。');
        });
}

// 從 URL 中獲取文章 ID
function getArticleId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// 顯示文章內容
function displayArticleContent(article) {
    const articleContentElement = document.getElementById('article-content');
    
    if (!article) {
        articleContentElement.innerHTML = '<p class="error">未找到文章內容</p>';
        return;
    }
    
    // 清除加載中狀態
    articleContentElement.innerHTML = '';
    
    // 創建文章內容 HTML
    articleContentElement.innerHTML = `
        <h1 class="article-title">${article.title}</h1>
        <div class="article-date">${article.date}</div>
        <div class="article-text">${article.text}</div>
    `;
    
    // 處理文章內容中的 HTML 元素
    processArticleContent();
}

// 處理文章內容中的 HTML 元素
function processArticleContent() {
    const articleTextElement = document.querySelector('.article-text');
    
    // 將文本中的 HTML 標籤轉換為實際的 HTML 元素
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = articleTextElement.innerHTML;
    
    // 處理標題
    const headings = tempDiv.querySelectorAll('h2, h3, h4');
    headings.forEach(heading => {
        heading.style.marginTop = heading.tagName === 'H2' ? 'var(--spacing-3xl)' : 'var(--spacing-2xl)';
        heading.style.marginBottom = 'var(--spacing-md)';
        heading.style.color = 'var(--color-text-primary)';
        heading.style.fontWeight = 'var(--font-weight-bold)';
        
        if (heading.tagName === 'H2') {
            heading.style.fontSize = 'var(--font-size-h2)';
        } else if (heading.tagName === 'H3') {
            heading.style.fontSize = 'var(--font-size-h3)';
        } else if (heading.tagName === 'H4') {
            heading.style.fontSize = 'var(--font-size-h4)';
        }
    });
    
    // 處理段落
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.marginBottom = 'var(--spacing-lg)';
        p.style.fontSize = 'var(--font-size-base)';
        p.style.color = 'var(--color-text-primary)';
        p.style.lineHeight = 'var(--line-height-base)';
    });
    
    // 處理引言
    const blockquotes = tempDiv.querySelectorAll('blockquote');
    blockquotes.forEach(blockquote => {
        blockquote.style.paddingLeft = 'var(--spacing-md)';
        blockquote.style.borderLeft = '4px solid var(--color-border)';
        blockquote.style.color = 'var(--color-quote)';
        blockquote.style.fontStyle = 'italic';
        blockquote.style.marginBottom = 'var(--spacing-lg)';
    });
    
    // 處理程式碼區塊
    const codeBlocks = tempDiv.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
        pre.style.padding = 'var(--spacing-lg)';
        pre.style.backgroundColor = 'var(--color-code-bg)';
        pre.style.color = 'var(--color-text-primary)';
        pre.style.fontFamily = "'Courier New', monospace";
        pre.style.borderRadius = 'var(--border-radius-base)';
        pre.style.fontSize = 'var(--font-size-code)';
        pre.style.marginTop = 'var(--spacing-md)';
        pre.style.marginBottom = 'var(--spacing-md)';
        pre.style.overflowX = 'auto';
    });
    
    // 處理行內程式碼
    const inlineCodes = tempDiv.querySelectorAll('code');
    inlineCodes.forEach(code => {
        code.style.padding = 'var(--spacing-xxs)';
        code.style.backgroundColor = 'var(--color-code-bg)';
        code.style.color = 'var(--color-text-primary)';
        code.style.borderRadius = 'var(--border-radius-base)';
        code.style.fontSize = 'var(--font-size-code)';
    });
    
    // 處理無序列表
    const unorderedLists = tempDiv.querySelectorAll('ul');
    unorderedLists.forEach(ul => {
        ul.style.marginBottom = 'var(--spacing-md)';
    });
    
    // 處理有序列表
    const orderedLists = tempDiv.querySelectorAll('ol');
    orderedLists.forEach(ol => {
        ol.style.marginBottom = 'var(--spacing-md)';
    });
    
    // 處理列表項目
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach(li => {
        li.style.marginBottom = 'var(--spacing-xxs)';
    });
    
    // 處理圖片
    const images = tempDiv.querySelectorAll('img');
    images.forEach(img => {
        img.style.width = '100%';
        img.style.display = 'block';
        img.style.marginTop = 'var(--spacing-md)';
        img.style.marginBottom = 'var(--spacing-md)';
        img.style.borderRadius = 'var(--border-radius-base)';
    });
    
    // 將處理後的內容替換原文
    articleTextElement.innerHTML = tempDiv.innerHTML;
}

// 顯示錯誤信息
function displayError(message) {
    const articleContentElement = document.getElementById('article-content');
    articleContentElement.innerHTML = `<p class="error">${message}</p>`;
}