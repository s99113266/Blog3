### `about.json` (關於我的 JSON 配置檔)

這個檔案定義了「關於我」頁面的版面配置與各區塊的數據來源。

```json
{
  "page_title": "關於我 - 你的部落格",
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
        "description": "左側欄位，顯示作者的個人資訊，數據來源於共用的作者設定檔。此處會展示頭像與簡介。"
      },
      "right_column": {
        "component": "author_bio_block",
        "data_source": "author.json",
        "description": "右側欄位，專門用於顯示作者的自介和社群連結，數據同樣來源於作者設定檔。"
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

### `about.md` (關於我的資料文檔)

本文件詳細說明了「關於我」頁面的功能與數據呈現細節。

#### 頁面功能與數據流

「關於我」頁面主要是一個靜態頁面，用於展示作者的相關資訊。

  * **數據來源**：所有內容皆從根目錄下的 `author.json` 檔案中讀取。
  * **無需表單**：此頁面**不會**發送任何表單或與後端 API 進行互動。

#### 區塊內容與呈現

  * **左側欄位**：
      * **資料來源**：`author.json`。
      * **呈現內容**：主要顯示作者的頭像 (`avatar_url`)。
  * **右側欄位**：
      * **資料來源**：`author.json`。
      * **呈現內容**：
          * **作者簡介**：顯示 `bio` 欄位中的詳細自介內容。
          * **社群連結**：根據 `social_links` 陣列，動態生成各個社群的連結，顯示 `name` 和 `url`。

#### 區塊數據來源說明

  * **導覽列**：數據源自 `navigation.json`。
  * **頁腳**：數據源自 `footer.json`。