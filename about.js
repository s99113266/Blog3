// 關於我頁面的JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 載入導覽列
    loadNavigation();
    
    // 載入作者資訊
    loadAuthorInfo();
    
    // 載入作者自介
    loadAuthorBio();
    
    // 載入頁腳
    loadFooter();
});

// 載入導覽列
function loadNavigation() {
    fetch('navigation.json')
        .then(response => response.json())
        .then(data => {
            const navLinks = document.getElementById('navLinks');
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
        });
}

// 載入作者資訊
function loadAuthorInfo() {
    fetch('author.json')
        .then(response => response.json())
        .then(data => {
            const authorInfoBlock = document.getElementById('authorInfoBlock');
            authorInfoBlock.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.nickname}" class="author-avatar">
                <h2 class="author-nickname">${data.nickname}</h2>
                <p class="author-summary">${data.blog_summary}</p>
            `;
        })
        .catch(error => {
            console.error('載入作者資訊失敗:', error);
        });
}

// 載入作者自介
function loadAuthorBio() {
    fetch('author.json')
        .then(response => response.json())
        .then(data => {
            const authorBioBlock = document.getElementById('authorBioBlock');
            authorBioBlock.innerHTML = `
                <h3 class="bio-title">關於我</h3>
                <p class="bio-content">${data.bio}</p>
                <div class="social-links">
                    <h4 class="social-links-title">社群連結</h4>
                    <ul class="social-links-list">
                        ${data.social_links.map(link => `
                            <li>
                                <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                                    ${link.name}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        })
        .catch(error => {
            console.error('載入作者自介失敗:', error);
        });
}

// 載入頁腳
function loadFooter() {
    fetch('footer.json')
        .then(response => response.json())
        .then(data => {
            const footerText = document.getElementById('footerText');
            footerText.textContent = data.copyright;
        })
        .catch(error => {
            console.error('載入頁腳失敗:', error);
        });
}