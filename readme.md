NTNU Money 記帳系統
專案簡介
這是一個基於 HTML、CSS 和 JavaScript 的記帳系統，支援記帳、帳單提醒、預算設定、理財目標、消費分析和圖表功能。所有資料儲存在瀏覽器的 localStorage 中，無需後端。
功能

首頁與歡迎頁面
使用者登入與註冊
記帳（新增、編輯、刪除）
個人資訊管理
分類與標籤管理
帳單提醒
預算設定
理財目標
消費分析
圖表分析
匯出 Excel

檔案結構

index.html: 主頁面，包含所有 UI 結構。
css/styles.css: 全域樣式。
js/main.js: 共用函數（儲存、表格更新等）。
js/login.js: 登入與註冊邏輯。
js/transactions.js: 記帳功能。
js/profile.js: 個人資訊管理。
js/categories.js: 分類與標籤管理。
js/bills.js: 帳單提醒。
js/budget.js: 預算設定。
js/goals.js: 理財目標。
js/analysis.js: 消費分析。
js/charts.js: 圖表分析。
js/export.js: 匯出 Excel。
assets/logo.png: 應用程式標誌（可選）。

依賴

Chart.js: 用於圖表分析。
XLSX: 用於匯出 Excel。
Font Awesome: 提供圖標。

安裝與運行

將所有檔案複製到一個資料夾（例如 ntnu-money）。
確保資料夾結構正確（見上）。
在 assets/ 中放入一張 logo.png（可選）。
用瀏覽器打開 index.html。
註冊一個帳號，然後開始使用！

使用方法

註冊/登入：在歡迎頁面點「進入系統」，註冊或登入帳號。
記帳：點側邊欄「記帳」，輸入金額、日期等，點「新增記帳」。
帳單提醒：點「帳單提醒」，新增帳單並設定到期日。
預算設定：點「預算設定」，輸入本月預算。
理財目標：點「理財目標」，設定目標金額和日期。
消費分析：點「消費分析」，查看分類消費或圖表。
匯出：點「匯出 Excel」，下載記帳紀錄。

注意事項

所有資料儲存在瀏覽器的 localStorage，清除瀏覽器資料會導致資料丟失。
若頁面無法顯示，按 F12 檢查「Console」錯誤，並確認檔案路徑正確。

問題反饋
如果遇到問題（例如功能無法使用），請記下錯誤訊息並聯繫開發者。
