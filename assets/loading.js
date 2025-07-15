// page-loader.js

// 初始化加载动画
function initPageLoader() {
  // 创建加载动画元素
  const loaderContainer = document.createElement("div");
  loaderContainer.id = "page-loader";
  loaderContainer.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-white";
  loaderContainer.innerHTML = `
      <div class="text-center">
          <div class="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full loader-spin mb-4"></div>
          <p class="text-xl font-medium text-primary">加载中...</p>
          <p class="text-sm text-gray-500 mt-2">请稍候，页面正在加载</p>
      </div>
  `;

  // 创建样式元素
  const styleElement = document.createElement("style");
  styleElement.type = "text/tailwindcss";
  styleElement.innerHTML = `
      @layer utilities {
          .loader-spin {
              animation: spin 1.5s linear infinite;
          }
          .loader-fade {
              animation: fadeOut 0.5s ease-out forwards;
          }
          .page-fade {
              animation: fadeIn 0.8s ease-out forwards;
          }
      }

      @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeOut {
          0% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
      }
      
      @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
      }
  `;

  // 添加基本 Tailwind 配置
  const tailwindConfig = document.createElement("script");
  tailwindConfig.innerHTML = `
      tailwind.config = {
          theme: {
              extend: {
                  colors: {
                      primary: '#3B82F6',
                      secondary: '#1E40AF',
                  },
              }
          }
      }
  `;

  // 将元素添加到文档中
  document.head.appendChild(tailwindConfig);
  document.head.appendChild(styleElement);
  document.body.appendChild(loaderContainer);

  // 隐藏页面内容
  document.body.style.visibility = "hidden";

  // 页面加载完成后执行
  window.addEventListener("load", function () {
    const loader = document.getElementById("page-loader");

    // 为加载动画添加淡出动画
    loader.classList.add("loader-fade");

    // 延迟一点时间后隐藏加载动画并显示主内容
    setTimeout(() => {
      loader.style.display = "none";
      document.body.style.visibility = "visible";
      document.body.classList.add("page-fade");
    }, 500);
  });
}

// 自动初始化加载动画
initPageLoader();
