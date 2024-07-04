// 插入標籤管理區塊
function injectLabelUI() {
    console.log('injectLabelUI');
    // 檢查是否在 Repository 頁面
    const repoMeta = document.querySelector("meta[property='og:title']");
    console.log(repoMeta);
    if (!repoMeta) return;

    const repoName = repoMeta.getAttribute('content'); // 獲取 Repository 名稱

    // 確保只插入一次
    if (document.querySelector('#custom-label-container')) return;

    // 建立標籤管理的 UI
    const labelContainer = document.createElement('div');
    labelContainer.id = 'custom-label-container';
    labelContainer.style.margin = '10px 0';
    labelContainer.style.padding = '10px';
    labelContainer.style.border = '1px solid #ddd';
    labelContainer.style.borderRadius = '5px';
    labelContainer.style.backgroundColor = '#f9f9f9';

    labelContainer.innerHTML = `
      <strong>分類標籤：</strong>
      <select id="repo-label">
        <option value="">選擇分類</option>
        <option value="work">工作</option>
        <option value="study">學習</option>
        <option value="personal">個人項目</option>
      </select>
      <button id="save-label">儲存</button>
      <div id="label-status" style="margin-top: 5px; color: green;"></div>
    `;

    // 將標籤管理區塊插入到 Repository 的標題下方
    const repoHeader = document.querySelector('.Layout-main .d-flex');
    if (repoHeader) {
        repoHeader.parentElement.insertBefore(labelContainer, repoHeader.nextSibling);
    }

    // 綁定事件
    document.getElementById('save-label').addEventListener('click', () => {
        const label = document.getElementById('repo-label').value;
        if (!label) {
            alert('請選擇一個分類！');
            return;
        }

        // 儲存到 chrome.storage
        chrome.storage.sync.set({ [repoName]: label }, () => {
            document.getElementById('label-status').textContent = '分類儲存成功！';
            setTimeout(() => {
                document.getElementById('label-status').textContent = '';
            }, 3000);
        });
    });

    // 頁面載入時顯示已儲存的分類
    chrome.storage.sync.get(repoName, (data) => {
        if (data[repoName]) {
            document.getElementById('repo-label').value = data[repoName];
        }
    });
}

// 執行插入功能
injectLabelUI();
