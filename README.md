## 開發前操作
先到 **MAKE** 平台裡面，找到場景的Webhook模組，並將webhook url複製，並接到 **api-endpoints.json** 的 post_url 欄位裡面。

## 檔案說明

### admin/new-post.html
**功能**：新增/編輯文章頁面
**描述**：提供文章編輯功能，支援新增和編輯模式，包含 TinyMCE 富文本編輯器
**引用檔案**：
- CSS：`admin/new-post.css` - 頁面樣式
- JavaScript：`admin/new-post.js` - 頁面互動功能
- 外部資源：TinyMCE 編輯器 CDN

### admin/new-post.css
**功能**：新增/編輯文章頁面樣式
**描述**：包含所有設計標記和頁面樣式，遵循 design-tokens.md 的規範
**引用檔案**：無（獨立 CSS 檔案）

### admin/new-post.js
**功能**：新增/編輯文章頁面互動功能
**描述**：處理表單提交、頁面初始化、TinyMCE 編輯器初始化等功能
**引用檔案**：
- 依賴：`admin/new-post.html` 中的 DOM 元素
- 依賴：`../navigation.json` - 導覽列資料
- 依賴：`../footer.json` - 頁腳資料
- 依賴：`../api-endpoints.json` - API 端點資訊

### about.html
**功能**：關於我頁面
**描述**：展示作者個人資訊、簡介和社群連結的靜態頁面
**引用檔案**：
- CSS：`about.css` - 頁面樣式
- JavaScript：`about.js` - 頁面互動功能
- 依賴：`navigation.json` - 導覽列資料
- 依賴：`author.json` - 作者資料
- 依賴：`footer.json` - 頁腳資料

### about.css
**功能**：關於我頁面樣式
**描述**：包含所有設計標記和頁面樣式，遵循 design-tokens.md 的規範，實現雙欄佈局
**引用檔案**：無（獨立 CSS 檔案）

### about.js
**功能**：關於我頁面互動功能
**描述**：處理頁面初始化、動態載入導覽列、作者資訊、作者自介和頁腳等功能
**引用檔案**：
- 依賴：`about.html` 中的 DOM 元素
- 依賴：`navigation.json` - 導覽列資料
- 依賴：`author.json` - 作者資料
- 依賴：`footer.json` - 頁腳資料

### index.html
**功能**：首頁（文章列表頁面）
**描述**：展示部落格文章列表，包含導覽列、作者資訊和分頁功能
**引用檔案**：
- CSS：`index.css` - 頁面樣式
- JavaScript：`index.js` - 頁面互動功能
- 依賴：`navigation.json` - 導覽列資料
- 依賴：`author.json` - 作者資料
- 依賴：`footer.json` - 頁腳資料
- 依賴：`api-endpoints.json` - API 端點資訊

### index.css
**功能**：首頁樣式
**描述**：包含所有設計標記和頁面樣式，遵循 design-tokens.md 的規範，實現雙欄佈局
**引用檔案**：無（獨立 CSS 檔案）

### index.js
**功能**：首頁互動功能
**描述**：處理頁面初始化、動態載入導覽列、作者資訊、文章列表和分頁等功能
**引用檔案**：
- 依賴：`index.html` 中的 DOM 元素
- 依賴：`navigation.json` - 導覽列資料
- 依賴：`author.json` - 作者資料
- 依賴：`footer.json` - 頁腳資料
- 依賴：`api-endpoints.json` - API 端點資訊

### admin/posts.html
**功能**：文章管理頁面
**描述**：展示部落格文章列表，提供刪除和管理功能，包含導覽列、作者資訊和分頁功能
**引用檔案**：
- CSS：`posts.css` - 頁面樣式
- JavaScript：`posts.js` - 頁面互動功能
- 依賴：`../navigation.json` - 導覽列資料
- 依賴：`../author.json` - 作者資料
- 依賴：`../footer.json` - 頁腳資料
- 依賴：`../api-endpoints.json` - API 端點資訊

### admin/posts.css
**功能**：文章管理頁面樣式
**描述**：包含所有設計標記和頁面樣式，遵循 design-tokens.md 的規範，實現雙欄佈局和刪除彈窗
**引用檔案**：無（獨立 CSS 檔案）

### admin/posts.js
**功能**：文章管理頁面互動功能
**描述**：處理頁面初始化、動態載入導覽列、作者資訊、文章列表、分頁和刪除功能
**引用檔案**：
- 依賴：`posts.html` 中的 DOM 元素
- 依賴：`../navigation.json` - 導覽列資料
- 依賴：`../author.json` - 作者資料
- 依賴：`../footer.json` - 頁腳資料
- 依賴：`../api-endpoints.json` - API 端點資訊

### post.html
**功能**：文章內頁
**描述**：展示單篇文章的完整內容，包含導覽列、作者資訊和文章內容區塊
**引用檔案**：
- CSS：`post.css` - 頁面樣式
- JavaScript：`post.js` - 頁面互動功能
- 依賴：`navigation.json` - 導覽列資料
- 依賴：`author.json` - 作者資料
- 依賴：`footer.json` - 頁腳資料
- 依賴：`api-endpoints.json` - API 端點資訊

### post.css
**功能**：文章內頁樣式
**描述**：包含所有設計標記和頁面樣式，遵循 design-tokens.md 的規範，實現雙欄佈局和文章內容樣式
**引用檔案**：無（獨立 CSS 檔案）

### post.js
**功能**：文章內頁互動功能
**描述**：處理頁面初始化、動態載入導覽列、作者資訊和文章內容，從 API 獲取單篇文章數據
**引用檔案**：
- 依賴：`post.html` 中的 DOM 元素
- 依賴：`navigation.json` - 導覽列資料
- 依賴：`author.json` - 作者資料
- 依賴：`footer.json` - 頁腳資料
- 依賴：`api-endpoints.json` - API 端點資訊
