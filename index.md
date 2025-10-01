### `index.json` (首頁的 JSON 配置檔)

這個檔案定義了首頁的版面配置和各區塊的內容來源。

```json
{
  "page_title": "文章列表 - 你的部落格",
  "layout": {
    "header": {
      "component": "navigation",
      "data_source": "navigation.json",
      "description": "頁面頂部的導覽列，數據來源於共用的導覽設定檔。"
    },
    "main_content": {
      "component": "two_column_layout",
      "description": "頁面主要內容區，採用左右雙欄佈局。",
      "left_column": {
        "component": "author_info_block",
        "data_source": "author.json",
        "description": "左側欄位，顯示作者的個人資訊和部落格摘要，數據來源於共用的作者設定檔。"
      },
      "right_column": {
        "component": "articles_list_section",
        "description": "右側欄位，用於顯示從API獲取的文章列表。",
        "pagination_component": "pagination_block",
        "description_pagination": "文章列表下方的分頁區塊。"
      }
    },
    "footer": {
      "component": "footer",
      "data_source": "footer.json",
      "description": "頁面最下方的頁腳，數據來源於共用的頁腳設定檔。"
    }
  }
}
```

-----

### `index.md` (首頁的資料文檔)

本文件詳細說明了首頁的各項功能與開發細節，特別是與資料互動的部分。

#### 頁面功能與數據流

首頁（文章列表）的功能是透過向後端 API 發送請求，取得文章列表並動態呈現。

1.  **頁面載入**：當頁面首次載入時，會執行一個 **POST** 請求到指定的 API URL。
2.  **API 請求**：表單送出的目標 URL 應從 `api-endpoints.json` 中讀取 `post_url` 欄位的值。
3.  **表單資料**：這個 POST 請求會包含以下兩個隱藏欄位：
      * `actiontype`: 固定的字串值，用於告訴後端本次操作是「取得文章列表」，他的值為"列表"兩個字。
      * `nowpg`: 當前頁碼，用於分頁。初次載入時，此值應為 `1`。如果網址中存在 `?page=X` 的 GET 參數，則 `nowpg` 應讀取該值。

#### 後端 API 返回格式

成功發送請求後，預期後端會返回一個 JSON 物件，其格式如下：

```json
{
  "totalArticles": 50,
  "articles": [
    {
      "id": "12345",
      "title": "...",
      "summary": "...",
      "date": "..."
    }
  ]
}
```

#### 前端處理與呈現

  * **文章列表**：取得 `articles` 陣列後，使用 JavaScript 動態生成文章列表的 HTML。每一篇文章都應包含標題、摘要和發布日期。
  * **連結規則**：點擊每篇文章的標題，應導向文章內頁。連結格式為 `/post.html?id={{article_id}}`，其中 `{{article_id}}` 是從 JSON 數據中讀取的文章編號。
  * **分頁區塊**：根據 `totalArticles` 總數計算總頁數，並生成相應的分頁連結。每個分頁連結都應包含 `?page=X` 的 GET 參數。

#### 區塊數據來源說明

  * **導覽列**：數據源自 `navigation.json`。
  * **作者資訊**：數據源自 `author.json`。
  * **頁腳**：數據源自 `footer.json`。
