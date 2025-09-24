### **開發原則與設計理念**

**網站風格總覽**：本網站的視覺風格基於**極簡主義**，色彩僅限於**純白至灰階**，並透過精確的**間距與排版**來創造視覺層次感，避免頁面顯得空洞。

**開發核心原則**：

1.  **嚴格依據設計標記**: 所有的顏色、字體、間距、圓角等數值，**必須且只能**從 `Design Tokens` 區塊引用。**嚴禁**使用任何硬編碼（Hard-coded）的數值。
2.  **元件化思維**: 每個頁面都應被視為由預先定義好的**元件 (Components)** 組成。開發的核心任務是將這些元件根據頁面配置檔案（如 `index.json` 或 `post.json`）的要求，精確地組裝到正確的佈局中。
3.  **無須自行設計**: 所有元素的視覺樣式、尺寸、互動效果都已在以下文件中詳細定義。**禁止**添加任何未經規範的樣式、陰影或過渡效果。頁面的任務是**執行藍圖**，而非創造。

本文件旨在作為 AI 進行開發時的唯一、絕對的參考來源。任何與此規範不符的頁面，都將被視為風格錯誤並需要重新開發。

### 網站 UI 設計規則 (原子級別 - 最終版)

這份文件為您的部落格網站提供了絕對的視覺藍圖，所有元件都將從最基礎的設計標記開始構建。

#### 1. 設計標記 (Design Tokens)

所有數值都已預先定義，不可隨意更改。

* **色彩**:
    * `--color-surface-100`: `#FFFFFF`
    * `--color-surface-200`: `#F8F8F8`
    * `--color-border`: `#EBEBEB`
    * `--color-text-primary`: `#424242`
    * `--color-text-secondary`: `#9E9E9E`
    * `--color-text-link`: `#424242`
    * `--color-interactive`: `#212121`
    * `--color-on-interactive`: `#FFFFFF`
    * `--color-quote`: `#616161` (引言文字)
    * `--color-code-bg`: `#FAFAFA` (程式碼背景)

* **間距**:
    * `--spacing-xxs`: `4px`
    * `--spacing-xs`: `8px`
    * `--spacing-sm`: `12px`
    * `--spacing-md`: `16px`
    * `--spacing-lg`: `24px`
    * `--spacing-xl`: `32px`
    * `--spacing-2xl`: `48px`
    * `--spacing-3xl`: `64px`
    * `--spacing-4xl`: `80px`

* **字體**:
    * `--font-family-sans`: `"Helvetica Neue", Arial, sans-serif`
    * `--font-weight-regular`: `400`
    * `--font-weight-medium`: `500`
    * `--font-weight-bold`: `700`
    * `--line-height-base`: `1.6`
    * `--font-size-base`: `16px`
    * `--font-size-h1`: `38px`
    * `--font-size-h2`: `28px`
    * `--font-size-h3`: `22px`
    * `--font-size-h4`: `18px`
    * `--font-size-meta`: `14px`
    * `--font-size-code`: `15px`

* **圓角**:
    * `--border-radius-base`: `4px`
    * `--border-radius-circle`: `50%`

#### 2. 文章與內容區塊規則 (Article & Content Block Rules)

這部分規範了您在 `index.json` 和 `post.json` 中使用的核心區塊。

##### A. 文章列表區塊 (`.articles-list-section`)

此區塊包含多個文章摘要，應以乾淨、間隔一致的方式呈現。

* **容器樣式**：
    * **底部外距**：`margin-bottom: var(--spacing-4xl)`
* **單篇文章摘要 (`.article-summary-block`)**：
    * **內距**：`padding-top: var(--spacing-xl)`, `padding-bottom: var(--spacing-xl)`
    * **底部邊框**：`border-bottom: 1px solid var(--color-border)`
* **文章標題 (`.article-title`)**：
    * **字號**：`font-size: var(--font-size-h3)`
    * **字重**：`font-weight: var(--font-weight-bold)`
    * **顏色**：`color: var(--color-text-primary)`
    * **底部外距**：`margin-bottom: var(--spacing-xxs)`
* **摘要文字 (`.article-excerpt`)**：
    * **字號**：`font-size: var(--font-size-base)`
    * **顏色**：`color: var(--color-text-secondary)`
    * **行高**：`line-height: var(--line-height-base)`
    * **底部外距**：`margin-bottom: var(--spacing-md)`
* **發布日期 (`.article-meta`)**：
    * **字號**：`font-size: var(--font-size-meta)`
    * **顏色**：`color: var(--color-text-secondary)`

##### B. 文章內頁區塊 (`.article-content-section`)

此區塊包含文章的所有內容，必須為所有可能出現的 HTML 元素定義樣式。

* **頁面標題 (`h1`)**：
    * **字號**：`font-size: var(--font-size-h1)`
    * **字重**：`font-weight: var(--font-weight-bold)`
    * **底部外距**：`margin-bottom: var(--spacing-xl)`
* **章節標題 (`h2`)**：
    * **字號**：`font-size: var(--font-size-h2)`
    * **字重**：`font-weight: var(--font-weight-bold)`
    * **上外距**：`margin-top: var(--spacing-3xl)`
    * **底部外距**：`margin-bottom: var(--spacing-md)`
* **小節標題 (`h3`)**：
    * **字號**：`font-size: var(--font-size-h3)`
    * **字重**：`font-weight: var(--font-weight-bold)`
    * **上外距**：`margin-top: var(--spacing-2xl)`
    * **底部外距**：`margin-bottom: var(--spacing-sm)`
* **內文段落 (`p`)**：
    * **字號**：`font-size: var(--font-size-base)`
    * **顏色**：`color: var(--color-text-primary)`
    * **行高**：`line-height: var(--line-height-base)`
    * **底部外距**：`margin-bottom: var(--spacing-lg)`
* **引言區塊 (`blockquote`)**：
    * **內距**：`padding-left: var(--spacing-md)`
    * **左邊框**：`border-left: 4px solid var(--color-border)`
    * **文字色**：`color: var(--color-quote)`
    * **字體樣式**：`font-style: italic`
* **程式碼區塊 (`pre`)**：
    * **內距**：`padding: var(--spacing-lg)`
    * **背景色**：`background-color: var(--color-code-bg)`
    * **文字色**：`color: var(--color-text-primary)`
    * **字體**：`font-family: 'Courier New', monospace`
    * **邊框**：`border-radius: var(--border-radius-base)`
    * **字號**：`font-size: var(--font-size-code)`
    * **上/下外距**：`margin-top: var(--spacing-md)`, `margin-bottom: var(--spacing-md)`
* **行內程式碼 (`code`)**：
    * **內距**：`padding: var(--spacing-xxs)`
    * **背景色**：`background-color: var(--color-code-bg)`
    * **文字色**：`color: var(--color-text-primary)`
    * **邊框**：`border-radius: var(--border-radius-base)`
    * **字號**：`font-size: var(--font-size-code)`
* **無序列表 (`ul`) / 有序列表 (`ol`)**：
    * **底部外距**：`margin-bottom: var(--spacing-md)`
    * **列表項目 (`li`) 底部外距**：`margin-bottom: var(--spacing-xxs)`
* **圖片 (`img`)**：
    * **寬度**：`width: 100%` (佔滿容器)
    * **顯示**：`display: block`
    * **上/下外距**：`margin-top: var(--spacing-md)`, `margin-bottom: var(--spacing-md)`

- 這份全面的規則提供了所有必要的細節，確保 AI 在處理任何頁面內容時，都能遵循一致的視覺和排版標準。