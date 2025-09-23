### `post.json` (文章內頁的 JSON 配置檔)

這個檔案定義了文章內頁的版面配置與各區塊的數據來源。

```json
{
  "page_title": "文章內頁 - 你的部落格",
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
        "component": "article_content_section",
        "description": "右側欄位，用於顯示從API獲取的單篇文章內容。"
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

### `post.md` (文章內頁的資料文檔)

本文件詳細說明了「文章內頁」的功能與數據處理流程。

#### 頁面功能與數據流

文章內頁的主要功能是從後端 API 請求並顯示單篇文章的詳細內容。

1.  **頁面載入**：當頁面首次載入時，會自動讀取網址中的 GET 參數 `id`，並發送一個 **POST** 請求到 `api-endpoints.json` 指定的 API URL。
2.  **API 請求**：表單中的隱藏欄位包含：
      * `actiontype`: 值為 `"內容"`，用於告訴後端本次操作是「取得單篇文章內容」。
      * `id`: 值為從網址 `?id=...` 讀取到的文章編號。
3.  **後端返回**：預期後端會返回包含該篇文章標題、內容和發布日期的 JSON 資料，例如：
    ```json
    {
      "id": "12345",
      "title": "如何設計一個簡單又實用的JSON格式",
      "text": "這篇文章介紹了設計JSON格式的基本原則...",
      "date": "2025-09-23"
    }
    ```
4.  **前端呈現**：接收到資料後，前端應將 `title`、`text` 和 `date` 內容，分別呈現在頁面的對應位置。

#### 區塊數據來源說明

  * **導覽列**：數據源自 `navigation.json`。
  * **左側欄作者資訊**：數據源自 `author.json`。
  * **頁腳**：數據源自 `footer.json`。