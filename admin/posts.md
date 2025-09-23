### `admin/posts.json` (文章管理頁的 JSON 配置檔)

這個檔案定義了文章管理頁面的版面配置與各區塊的數據來源。

```json
{
  "page_title": "文章管理 - 你的部落格",
  "layout": {
    "header": {
      "component": "navigation",
      "data_source": "../navigation.json",
      "description": "頁面頂部的導覽列，數據來源於根目錄下的共用導覽設定檔。"
    },
    "main_content": {
      "component": "two_column_layout",
      "description": "頁面主要內容區，採用左右雙欄佈局。",
      "left_column": {
        "component": "author_info_block",
        "data_source": "../author.json",
        "description": "左側欄位，顯示作者的個人資訊和部落格摘要，數據來源於根目錄下的共用作者設定檔。"
      },
      "right_column": {
        "component": "articles_management_section",
        "description": "右側欄位，用於顯示從API獲取的文章列表，並提供管理功能。",
        "features": [
          "delete_button",
          "pagination"
        ],
        "pagination_component": "pagination_block",
        "description_pagination": "文章列表下方的分頁區塊。"
      }
    },
    "footer": {
      "component": "footer",
      "data_source": "../footer.json",
      "description": "頁面最下方的頁腳，數據來源於根目錄下的共用頁腳設定檔。"
    }
  }
}
```

-----

### `admin/posts.md` (文章管理頁的資料文檔)

本文件詳細說明了文章管理頁面的功能與開發細節，特別是與刪除功能和頁面跳轉相關的流程。

#### 頁面功能與數據流

「文章管理」頁面的核心功能是讓管理員能夠查看、編輯和刪除文章。

1.  **頁面載入**：與首頁相同，頁面載入時會發送一個 **POST** 請求到 `api-endpoints.json` 指定的 API URL，表單隱藏欄位 `actiontype` 設定為 `"列表"`，`nowpg` 則根據網址 GET 參數或預設為 `1`。
2.  **API 返回**：預期後端返回的 JSON 格式與文章列表頁面完全相同。

#### 特殊功能：文章刪除

文章刪除是一個需要二次確認的流程，以確保操作的安全性。

1.  **觸發刪除**：點擊文章列表中的「刪除」按鈕，會觸發一個彈出視窗。
2.  **彈出視窗**：視窗中包含一個表單，要求使用者輸入管理員密碼，欄位名稱為 `pwd`。
3.  **確認刪除**：點擊「確認刪除」按鈕，會發送一個新的 **POST** 請求到 API URL，表單中包含以下三個隱藏欄位：
      * `actiontype`: 變更為 `"刪除"`。
      * `pwd`: 填入使用者輸入的管理員密碼。
      * `id`: 填入該篇文章的文章編號。
4.  **重新載入列表**：刪除請求成功送出後（無論後端返回成功或失敗），前端都必須**重新發送一次取得文章列表的請求**。此時，`actiontype` 會再次變更回 `"列表"`，並搭配當前的 `nowpg` 頁碼一起送出，以刷新文章列表。

#### 連結規則

  * **文章標題連結**：與文章列表頁面不同，點擊文章標題將會導向**新增文章頁面**以進行編輯。連結格式為 `/admin/new-post.html?id={{article_id}}`，其中 `{{article_id}}` 是從 JSON 數據中讀取的文章編號。

#### 區塊數據來源說明

  * **導覽列**：數據源自 `../navigation.json`。
  * **作者資訊**：數據源自 `../author.json`。
  * **頁腳**：數據源自 `../footer.json`。