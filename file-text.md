### 檔案文本

這份 Markdown 文件旨在作為整個部落格網站的檔案規劃總覽，明確定義各頁面檔案、JSON 配置檔與資料文本之間的關係。

#### 檔案命名與對應規則

所有頁面檔案都將採用相同的命名和路徑，以確保人與機器都能清楚地理解其對應關係：

  * **HTML 檔案**：作為網頁的主體結構，其內容在開發階段可以保持空白，由前端框架或模板引擎動態載入資料。
  * **JSON 配置檔**：與對應的 HTML 檔案同名，用來定義頁面的排版、佈局，以及連結到相應的資料文本。
  * **Markdown 資料文本**：與對應的 HTML 檔案同名，用於提供除佈局以外的頁面配置細節，例如表單欄位、行為設定等。

-----

### 網站頁面與檔案配置

以下為所有頁面及其對應的檔案配置：

#### 根目錄 (`/`)

  * **文章列表 (首頁)**

      * **網頁檔案**：`index.html`
      * **頁面配置**：`index.json`
      * **資料文本**：`index.md`

  * **文章內頁**

      * **網頁檔案**：`post.html`
      * **頁面配置**：`post.json`
      * **資料文本**：`post.md`

  * **關於我的頁面**

      * **網頁檔案**：`about.html`
      * **頁面配置**：`about.json`
      * **資料文本**：`about.md`

#### 管理目錄 (`/admin`)

  * **文章管理頁**

      * **網頁檔案**：`admin/posts.html`
      * **頁面配置**：`admin/posts.json`
      * **資料文本**：`admin/posts.md`

  * **新增文章**

      * **網頁檔案**：`admin/new-post.html`
      * **頁面配置**：`admin/new-post.json`
      * **資料文本**：`admin/new-post.md`

-----

### 共用檔案配置

以下為全網站通用的 JSON 配置檔，這些檔案將獨立存在於根目錄下，供各頁面調用。

#### 1\. 文章創作者的 JSON 設定檔 (`author.json`)

  * **功能**：儲存網站作者的相關資訊，如頭像、暱稱、社群連結和個人簡介等。
  * **參考內容**：
    ```json
    {
      "avatar_url": "https://example.com/images/author-avatar.jpg",
      "nickname": "你的暱稱",
      "social_links": [
        {
          "name": "Facebook",
          "url": "https://www.facebook.com/your-profile"
        },
        {
          "name": "Twitter",
          "url": "https://twitter.com/your-handle"
        },
        {
          "name": "LinkedIn",
          "url": "https://www.linkedin.com/in/your-profile"
        }
      ],
      "blog_summary": "這裡可以寫一些關於部落格的簡短摘要，例如：一個分享程式設計、生活經驗與學習心得的個人部落格。",
      "bio": "我是一位熱愛寫作與技術的開發者。本部落格記錄了我的學習歷程、專案分享，以及一些個人的見解與生活點滴。"
    }
    ```

#### 2\. 導覽列的 JSON 設定檔 (`navigation.json`)

  * **功能**：定義網站導覽列的連結項目，提供統一的導覽結構。
  * **參考內容**：
    ```json
    {
      "links": [
        {
          "name": "文章列表",
          "url": "/"
        },
        {
          "name": "關於我",
          "url": "/about.html"
        },
        {
          "name": "文章管理",
          "url": "/admin/posts.html"
        }
      ]
    }
    ```

#### 3\. 頁腳的 JSON 設定檔 (`footer.json`)

  * **功能**：提供頁面底部的版權資訊或簡單說明。
  * **參考內容**：
    ```json
    {
      "copyright": "© 2025 部落格名稱. All Rights Reserved."
    }
    ```

### 4\. 表單設定規則
* 表單必須使用AJAX把資料POST到API URL
* 表單POST的資料，禁止發送JSON格式
* 每個頁面都有 actiontype 這個隱藏欄位

-----

### 執行命令

`請生成所有 HTML 檔案（index.html, post.html, about.html, admin/posts.html, admin/new-post.html），並保持檔案內容為空。同時，請為共用設定檔生成 JSON 檔案（author.json, navigation.json, footer.json），並使用上述提供的參考內容。`