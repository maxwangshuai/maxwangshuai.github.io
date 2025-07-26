// 主题切换功能
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // 设置初始主题
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, iconElement) {
    iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 幻灯片功能
class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 4000; // 4秒自动切换
        
        this.init();
    }
    
    init() {
        // 绑定指示器点击事件
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });
        
        // 开始自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        const container = document.querySelector('.slideshow-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoPlay());
            container.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // 设置新的活动幻灯片
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// 平滑滚动功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initTheme();
    
    // 初始化幻灯片
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        new Slideshow();
    }
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const heroLinks = document.querySelectorAll('.hero-cta a[href^="#"]');
    
    [...navLinks, ...heroLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 应用卡片悬停效果增强
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 页面加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加初始样式和观察
    const animatedElements = document.querySelectorAll('.app-card, .section-title, .about-text');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 移动端菜单切换（为未来扩展准备）
    const navMenu = document.querySelector('.nav-menu');
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 如果有打开的模态框或菜单，关闭它们
            document.activeElement.blur();
        }
    });
    
    // 表单验证（为联系表单准备）
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // 工具函数：节流
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 移除视差效果，让英雄区域保持静态显示
    
    // 初始化语言功能
    initLanguage();
    
    // 初始化logo动画
    initLogoAnimation();
    
    console.log('个人开发者网站已加载完成！');
    
    // 初始化截图轮播和模态框
    initializeScreenshotCarousel();
    initializeImageModal();
});

// 截图轮播功能
function initializeScreenshotCarousel() {
    const carousel = document.querySelector('.screenshot-carousel');
    if (!carousel) return;
    
    const track = document.getElementById('screenshotsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let itemsPerView = 4;
    let totalItems = 0;
    let maxIndex = 0;
    
    function updateItemsPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
            itemsPerView = 1;
        } else if (screenWidth <= 768) {
            itemsPerView = 2;
        } else if (screenWidth <= 1024) {
            itemsPerView = 3;
        } else {
            itemsPerView = 4;
        }
    }
    
    function updateCarousel() {
        const items = track.querySelectorAll('.screenshot-item:not([style*="display: none"])');
        totalItems = items.length;
        maxIndex = Math.max(0, totalItems - itemsPerView);
        
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        const translateX = -(currentIndex * (100 / itemsPerView));
        track.style.transform = `translateX(${translateX}%)`;
        
        // 更新按钮状态
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        // 更新指示器
        updateIndicators();
    }
    
    function updateIndicators() {
        if (!indicatorsContainer) return;
        
        const totalPages = Math.ceil(totalItems / itemsPerView);
        const currentPage = Math.floor(currentIndex / itemsPerView);
        
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === currentPage ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                currentIndex = i * itemsPerView;
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                updateCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - itemsPerView);
            updateCarousel();
        }
    }
    
    function goToNext() {
        if (currentIndex < maxIndex) {
            currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
            updateCarousel();
        }
    }
    
    // 事件监听
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    // 响应式更新
    window.addEventListener('resize', () => {
        updateItemsPerView();
        updateCarousel();
    });
    
    // 初始化
    updateItemsPerView();
    updateCarousel();
    
    // 监听语言切换，重新计算可见项目
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', () => {
            setTimeout(() => {
                updateCarousel();
            }, 100);
        });
    }
}

// 图片放大模态框功能
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    if (!modal || !modalImage) return;
    
    let currentImageIndex = 0;
    let allImages = [];
    
    function updateImageList() {
        allImages = Array.from(document.querySelectorAll('.screenshot-img:not([style*="display: none"])'));
    }
    
    function openModal(imageSrc, imageIndex) {
        updateImageList();
        currentImageIndex = imageIndex;
        modalImage.src = imageSrc;
        modalImage.alt = allImages[imageIndex]?.alt || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 更新导航按钮状态
        if (modalPrev) modalPrev.style.display = currentImageIndex > 0 ? 'flex' : 'none';
        if (modalNext) modalNext.style.display = currentImageIndex < allImages.length - 1 ? 'flex' : 'none';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            modalImage.src = allImages[currentImageIndex].src;
            modalImage.alt = allImages[currentImageIndex].alt;
            
            // 更新导航按钮状态
            if (modalPrev) modalPrev.style.display = currentImageIndex > 0 ? 'flex' : 'none';
            if (modalNext) modalNext.style.display = 'flex';
        }
    }
    
    function showNextImage() {
        if (currentImageIndex < allImages.length - 1) {
            currentImageIndex++;
            modalImage.src = allImages[currentImageIndex].src;
            modalImage.alt = allImages[currentImageIndex].alt;
            
            // 更新导航按钮状态
            if (modalPrev) modalPrev.style.display = 'flex';
            if (modalNext) modalNext.style.display = currentImageIndex < allImages.length - 1 ? 'flex' : 'none';
        }
    }
    
    // 为所有截图添加点击事件
    function attachImageClickEvents() {
        updateImageList();
        allImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                openModal(img.src, index);
            });
        });
    }
    
    // 事件监听
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', showPrevImage);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', showNextImage);
    }
    
    // 键盘事件
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // 初始化图片点击事件
    attachImageClickEvents();
    
    // 监听语言切换，重新绑定事件
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', () => {
            setTimeout(() => {
                attachImageClickEvents();
            }, 100);
        });
    }
}

// 语言切换功能
function initLanguage() {
    const languageSelector = document.getElementById('languageSelector');
    
    // 检测用户IP地址并设置默认语言
    detectUserLocation().then(language => {
        const savedLanguage = localStorage.getItem('language') || language;
        setLanguage(savedLanguage);
        languageSelector.value = savedLanguage;
    });
    
    // 语言切换事件
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        setLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    });
}

// 检测用户位置
async function detectUserLocation() {
    try {
        // 使用免费的IP地理位置API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // 如果是中国，返回中文，否则返回英文
        return data.country_code === 'CN' ? 'zh' : 'en';
    } catch (error) {
        console.log('无法检测用户位置，使用默认语言');
        // 如果API调用失败，默认使用中文
        return 'zh';
    }
}

// 设置语言
function setLanguage(language) {
    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-CN' : 'en');
    
    // 更新页面文本内容
    const translations = getTranslations();
    
    Object.keys(translations[language]).forEach(key => {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        });
    });
    
    // 更新页面标题
    if (translations[language]['page-title']) {
        document.title = translations[language]['page-title'];
    }
    
    // 更新App Store下载链接
    updateAppStoreLinks(language);
    
    // 更新截图路径
    updateScreenshotPaths(language);
}

// 根据语言更新App Store下载链接
function updateAppStoreLinks(language) {
    const translations = getTranslations();
    const appStoreLinks = document.querySelectorAll('a[href*="apps.apple.com"]');
    
    // 从翻译数据中获取对应语言的下载链接
    const downloadUrl = translations[language]['download-url'];
    
    if (downloadUrl) {
        appStoreLinks.forEach(link => {
            link.href = downloadUrl;
        });
    }
}

// 根据语言更新截图路径
function updateScreenshotPaths(language) {
    const screenshotImages = document.querySelectorAll('.screenshot-img');
    
    // 特殊处理第10张截图的显示/隐藏
    const screenshot10 = document.getElementById('screenshot-10');
    if (screenshot10) {
        if (language === 'en') {
            screenshot10.style.display = 'block';
        } else {
            screenshot10.style.display = 'none';
        }
    }
    
    screenshotImages.forEach((img, index) => {
        const currentSrc = img.src;
        
        // 检查是否是截图路径
        if (currentSrc.includes('/screenshots/')) {
            // 提取应用名称和文件名
            const pathParts = currentSrc.split('/screenshots/');
            if (pathParts.length === 2) {
                const [basePath, remainingPath] = pathParts;
                const pathSegments = remainingPath.split('/');
                
                if (pathSegments.length >= 2) {
                    const appName = pathSegments[0]; // app1, app2, app3等
                    const fileName = pathSegments[pathSegments.length - 1]; // 当前文件名
                    
                    let newFileName;
                    // 根据应用名称使用不同的文件命名规则
                    if (appName === 'app1') {
                        // app1使用0x0ss-数字.png格式
                        if (fileName.includes('0x0ss-')) {
                            newFileName = fileName;
                        } else {
                            // 如果是旧格式，转换为新格式
                            const match = fileName.match(/screenshot(\d+)/);
                            if (match) {
                                newFileName = `0x0ss-${match[1]}.png`;
                            } else {
                                newFileName = fileName.replace('.svg', '.png');
                            }
                        }
                    } else {
                        // app2和app3使用screenshot数字.png格式
                        newFileName = fileName.replace('.svg', '.png');
                    }
                    
                    const newSrc = `${basePath}/screenshots/${appName}/${language}/${newFileName}`;
                    img.src = newSrc;
                }
            }
        }
    });
}

// 翻译文本数据
function getTranslations() {
    return {
        zh: {
            'page-title': '蜗牛的成长工具',
            'nav-brand': '蜗牛的成长工具',
            'nav-home': '首页',
            'nav-apps': '我的应用',
            'nav-about': '关于我',
            'nav-contact': '联系方式',
            'hero-title': '✨ 喜欢小而美 ✨',
            'hero-subtitle': '🎨 热爱生活、提升效率、享受生活 📱',
            'hero-cta-primary': '🔍 精选产品',
            'hero-cta-secondary': '💬 联系我',
            'apps-title': '🎯 精品应用 ✨',
            'apps-subtitle': '🌟 深度聚焦生活方式、效率工具与影视摄影，每一款产品都精心打造。 🎨',
            'featured-title': '⭐ 精选',
            'all-apps-title': '📱 全部应用',
            'about-title': '👨‍💻 关于开发者 ✨',
            'learn-more': '📖 详细了解',
            'more-info': '🔗 了解更多',
            // 产品信息
            'app1-title': '场记板 Pro',
            'app1-subtitle': '影视拍摄必备工具',
            'app1-description': '如果您是一名电影或电视剧制作人员，场记板App可以帮助您更加高效地完成场记工作。场记板 Pro App让您可以通过iPhone或者iPad轻松打板，无需再携带传统的场记板了。',
            'app2-title': '简单时间',
            'app2-subtitle': '微光护眼多彩主题全屏时钟',
            'app2-description': '让时间更有温度。支持多种主题色彩、护眼模式、全屏显示，为您的生活空间增添美感，是桌面装饰和时间管理的完美结合。',
            'app3-title': '计分板',
            'app3-subtitle': '简单直观的计分板应用，适用于各种体育活动和游戏竞赛',
            // 标签
            'tag-filmmaking': '影视制作',
            'tag-productivity': '效率工具',
            'tag-lifestyle': '生活方式',
            'tag-desktop': '桌面工具',
            'tag-sports': '体育',
            'tag-utility': '实用工具',
            'tag-sports': '体育',
            'tag-coming-soon': '敬请期待',
            // 关于开发者
            'about-description-1': '🚀 我是一名专注于生活方式、效率工具和影视摄影领域的独立开发者，致力于通过技术提升人们的生活品质和工作效率。',
            'about-description-2': '💡 深耕移动应用开发十余年，现在专注于打造兼具美学设计与实用功能的产品。从生活方式到专业创作工具，每一款应用都承载着对用户体验的极致追求和对生活美学的深度理解。 🎨',
            'contact-email-label': '📧 联系邮箱:',
            'contact-wechat-label': '💬 微信:',
            // App1详情页面
            'app1-detail-title': '场记板 Pro - 详细介绍',
            'badge-pro': '专业版',
            'download-appstore': 'App Store 下载',
            'screenshots-title': '应用截图',
            'features-title': '主要特性',
            'feature1-title': '多种样式选择',
            'feature1-desc': '提供六种不同的场记板样式，适应不同拍摄需求和场景。',
            'feature2-title': '便捷打板操作',
            'feature2-desc': '支持点击板头或摇晃设备快速打板，操作简单直观。',
            'feature3-title': '自动计时功能',
            'feature3-desc': '具有自动计时器功能，确保您的时间记录准确无误。',
            'feature4-title': '场记单管理',
            'feature4-desc': '打板完成后自动整理信息到场记单，支持PDF导出和打印分享。',
            'about-app-title': '关于这个应用',
            'about-app-desc1': '场记板 Pro App让您可以通过iPhone或者iPad轻松打板，无需再携带传统的场记板了。您可以选择六种不同的样式来适应不同的需求，通过点击板头或者摇晃设备来快速打板。',
            'about-app-desc2': '该应用程序具有简单易用的操作界面，您的输入内容不会自动消失，以便下次修改。具有自动计时器功能，确保您的时间记录准确无误。打板完成后自动将信息整理到场记单中，方便你随时导出PDF和打印成纸质内容在团队间分享。',
            'main-features-title': '主要功能包括：',
            'feature-list-1': '设置片名、卷号、场号、镜号、次数等参数',
            'feature-list-2': '记录导演、摄影、机位、帧率（fps）等信息',
            'feature-list-3': '支持Day/Night、Int/Ext、Mos/Sync等场景参数',
            'feature-list-4': '自动生成场记单，支持PDF导出和打印',
            'feature-list-5': '简单易用的操作界面，输入内容不会自动消失',
            'updates-title': '最新更新',
            'update-v120-title': '场记功能更新',
            'update-v120-desc': '更新了场记单功能，你可以编辑场记信息、打印和导出PDF，支持了iCloud设备信息同步（内购）。',
            'update-v112-title': '输入优化',
            'update-v112-desc': '优化了输入的问题。',
            'update-v111-title': '帧率设置优化',
            'update-v111-desc': '- 添加了帧率的设置项目，确保打板和音效同步，快去试试吧！',
            'update-v110-title': '音效和反馈优化',
            'update-v110-desc1': '- 添加了更多音频效果。',
            'update-v110-desc2': '- 欢迎您的建议和反馈。',
            'download-url': 'https://apps.apple.com/cn/app/%E5%9C%BA%E8%AE%B0%E6%9D%BF-pro-%E5%BD%B1%E8%A7%86%E6%8B%8D%E6%91%84%E5%BF%85%E5%A4%87/id6445955423',
            'footer-copyright': '© 2025 蜗牛的成长工具. 保留所有权利.',
            
            // App2 页面翻译
            'app2-detail-title': '简单时间 - 详细介绍',
            'app2-title': '简单时间',
            'app2-subtitle': '微光护眼多彩主题全屏时钟',
            'app2-screenshots-title': '应用截图',
            'app2-screenshot-1': '主界面',
            'app2-screenshot-2': '时钟界面',
            'app2-screenshot-3': '设置界面',
            'app2-screenshot-4': '主题选择',
            'app2-features-title': '应用特色',
            'app2-feature1-title': '简单易用',
            'app2-feature1-desc': '直观的操作方式，无需复杂的学习过程，老少皆宜。',
            'app2-feature2-title': '护眼模式',
            'app2-feature2-desc': '微光护眼设计，长时间使用也不会疲劳，保护您的视力。',
            'app2-feature3-title': '多彩主题',
            'app2-feature3-desc': '丰富的主题色彩选择，让时钟界面更符合您的个人喜好。',
            'app2-feature4-title': '全屏显示',
            'app2-feature4-desc': '支持全屏时钟显示，为您的桌面增添美感和实用性。',
            'app2-about-title': '关于这款应用',
            'app2-about-desc1': '简单时间是一款专为追求简洁美观的用户设计的时钟应用。应用采用清晰易读的字体和舒适的色彩搭配，让您在任何环境下都能轻松查看时间。',
            'app2-about-desc2': '应用提供了多种主题和显示模式，支持全屏时钟显示，特别适合作为桌面时钟使用。护眼模式的设计让您长时间使用也不会感到疲劳。',
            'app2-highlights-title': '应用亮点：',
            'app2-highlight-1': '极简设计风格，界面清爽美观',
            'app2-highlight-2': '多种主题色彩，个性化定制',
            'app2-highlight-3': '护眼模式设计，保护视力健康',
            'app2-highlight-4': '全屏显示支持，专业时钟体验',
            'app2-highlight-5': '轻量级应用，占用资源极少',
            'app2-updates-title': '版本更新',
            'app2-version-latest': 'v1.2.0',
            'app2-update-date-latest': '2024年1月20日',
            'app2-update-title-latest': '新功能上线',
            'app2-update-1': '新增夜间模式主题',
            'app2-update-2': '优化时钟显示精度',
            'app2-update-3': '修复已知显示问题',
            'app2-update-4': '增加更多字体选择',
            'app2-version-prev': 'v1.1.0',
            'app2-update-date-prev': '2023年05月25日',
            'app2-update-title-prev': '功能优化',
            'app2-update-prev-1': '改进时钟显示效果',
            'app2-update-prev-2': '新增多彩主题选择',
            'app2-update-prev-3': '支持全屏显示模式',
            
            // App3 页面翻译
            'app3-detail-title': '计分板 - 详细介绍',
            'app3-title': '计分板',
            'app3-subtitle': '比赛记分工具，支持2到6个参赛者',
            'app3-screenshots-title': '应用截图',
            'app3-screenshot-1': '简单记分',
            'app3-screenshot-2': '多选手支持',
            'app3-screenshot-3': '支持计时',
            'app3-screenshot-4': '多种主题',
            'app3-features-title': '应用特色',
            'app3-feature1-title': '得分调整功能',
            'app3-feature1-desc': '通过简单的"+"和"-"按钮调整分数，支持自定义分数增减量以适应不同游戏规则。',
            'app3-feature2-title': '计时器功能',
            'app3-feature2-desc': '支持倒计时和正计时模式，可根据不同活动的时间规则灵活设置。',
            'app3-feature3-title': '自定义团队名称',
            'app3-feature3-desc': '轻触默认团队名称即可编辑，可选择是否显示名称，提供个性化体验。',
            'app3-feature4-title': '分数重置选项',
            'app3-feature4-desc': '一键重置所有分数为零，便于开始新的游戏或比赛。',
            'app3-feature5-title': '持久数据存储',
            'app3-feature5-desc': '本地存储团队名称、分数和用户偏好设置，下次访问时轻松恢复之前的设置。',
            'app3-feature6-title': '主题选择',
            'app3-feature6-desc': '支持多种主题，用户可根据个人喜好或活动需求自由切换视觉风格。',
            'app3-feature7-title': '屏幕镜像',
            'app3-feature7-desc': '借助iOS系统镜像功能，将得分实时镜像到更大屏幕，让更多观众共享精彩瞬间。',
            'app3-about-title': '关于这款应用',
            'app3-about-desc1': '计分板 App 是一款简单直观的计分板应用程序，专门设计用于跟踪各种体育、活动的得分。它拥有一个用户友好的界面，让用户能够轻松地管理团队名称和分数，非常适合于篮球比赛、智力竞赛、桌面游戏聚会等多种场合。',
            'app3-about-desc2': '计分板 App 是每个活动组织者和参与者的理想选择，它不仅提高了游戏和比赛的互动性，还增添了竞赛的乐趣。无论是家庭聚会、朋友间的小型竞赛还是正式的体育赛事，Score Board 都能让得分记录变得轻松而愉快。',
            'app3-highlights-title': '核心功能：',
            'app3-highlight-1': '得分调整功能：通过"+"和"-"按钮调整分数，支持自定义增减量',
            'app3-highlight-2': '计时器功能：支持倒计时和正计时模式，灵活设置时间规则',
            'app3-highlight-3': '自定义团队名称：轻触即可编辑，可选择是否显示名称',
            'app3-highlight-4': '分数重置选项：一键重置所有分数，便于开始新游戏',
            'app3-highlight-5': '持久数据存储：本地保存设置，支持"全部擦除"功能',
            'app3-highlight-6': '主题选择：多种主题风格，适应不同活动需求',
            'app3-highlight-7': '屏幕镜像：支持iOS镜像功能，实时投屏到大屏幕',
            'app3-updates-title': '更新日志',
            'app3-version-latest': 'v1.3.0',
            'app3-update-date-latest': '2024年1月25日',
            'app3-update-title-latest': '重要更新',
            'app3-update-1': '新增6人比赛模式',
            'app3-update-2': '优化计时器精度',
            'app3-update-3': '增加比赛历史记录',
            'app3-update-4': '支持自定义选手名称',
            'app3-update-5': '修复已知显示问题',
            'app3-version-prev': 'v1.2.0',
            'app3-update-date-prev': '2023年12月20日',
            'app3-update-title-prev': '功能增强',
            'app3-update-prev-1': '改进记分界面设计',
            'app3-update-prev-2': '新增多种主题选择',
            'app3-update-prev-3': '优化应用性能',
            'app3-update-prev-4': '增加计时器功能'
        },
        en: {
            'page-title': 'Snail\'s Growth Tools',
            'nav-brand': 'Snail\'s Growth Tools',
            'nav-home': 'Home',
            'nav-apps': 'My Apps',
            'nav-about': 'About',
            'nav-contact': 'Contact',
            'hero-title': '✨ Love Small & Beautiful ✨',
            'hero-subtitle': '🎨 Love Life, Boost Efficiency, Enjoy Living 📱',
            'hero-cta-primary': '🔍 Featured Products',
            'hero-cta-secondary': '💬 Contact Me',
            'apps-title': '🎯 Premium Apps ✨',
            'apps-subtitle': '🌟 Deeply focused on lifestyle, productivity tools and film photography, every product is carefully crafted. 🎨',
            'featured-title': '⭐ Featured',
            'all-apps-title': '📱 All Apps',
            'about-title': '👨‍💻 About Developer ✨',
            'learn-more': '📖 Learn More',
            'more-info': '🔗 More Info',
            // Product information
            'app1-title': 'Clapperboard Pro',
            'app1-subtitle': 'Essential Tool for Film Production',
            'app1-description': 'If you are a film or TV production professional, the Clapperboard App can help you complete slate work more efficiently. Clapperboard Pro App allows you to easily slate using your iPhone or iPad, eliminating the need to carry traditional clapperboards.',
            'app2-title': 'Simple Time',
            'app2-subtitle': 'Eye-Care Colorful Theme Fullscreen Clock',
            'app2-description': 'Make time more meaningful. Supports multiple theme colors, eye-care mode, and fullscreen display, adding beauty to your living space - the perfect combination of desktop decoration and time management.',
            'app3-title': 'Scoreboard',
            'app3-subtitle': 'Simple and Intuitive Scoreboard App for Various Sports and Gaming Competitions',
            // Tags
            'tag-filmmaking': 'Filmmaking',
            'tag-productivity': 'Productivity',
            'tag-lifestyle': 'Lifestyle',
            'tag-desktop': 'Desktop',
            'tag-sports': 'Sports',
            'tag-utility': 'Utility',
            'tag-coming-soon': 'Coming Soon',
            // About developer
            'about-description-1': '🚀 I am an independent developer focused on lifestyle, productivity tools, and film photography, dedicated to improving people\'s quality of life and work efficiency through technology.',
            'about-description-2': '💡 With over a decade of experience in mobile app development, I now focus on creating products that combine aesthetic design with practical functionality. From lifestyle to professional creative tools, every app embodies the ultimate pursuit of user experience and deep understanding of life aesthetics. 🎨',
            'contact-email-label': '📧 Email:',
            'contact-wechat-label': '💬 WeChat:',
            // App1 detail page
            'app1-detail-title': 'Clapperboard Pro - Detailed Introduction',
            'badge-pro': 'Pro',
            'download-appstore': 'Download on App Store',
            'screenshots-title': 'Screenshots',
            'features-title': 'Key Features',
            'feature1-title': 'Multiple Style Options',
            'feature1-desc': 'Provides six different clapperboard styles to adapt to different shooting needs and scenarios.',
            'feature2-title': 'Convenient Slate Operation',
            'feature2-desc': 'Supports quick slating by tapping the slate head or shaking the device, simple and intuitive operation.',
            'feature3-title': 'Automatic Timer Function',
            'feature3-desc': 'Features automatic timer functionality to ensure your time recording is accurate and error-free.',
            'feature4-title': 'Slate Sheet Management',
            'feature4-desc': 'Automatically organizes information into slate sheets after slating, supports PDF export and print sharing.',
            'about-app-title': 'About This App',
            'about-app-desc1': 'Clapperboard Pro App allows you to easily slate using your iPhone or iPad, eliminating the need to carry traditional clapperboards. You can choose from six different styles to adapt to different needs, and quickly slate by tapping the slate head or shaking the device.',
            'about-app-desc2': 'The application features a simple and easy-to-use interface where your input content will not automatically disappear for easy modification next time. It has automatic timer functionality to ensure accurate time recording. After slating, information is automatically organized into slate sheets for easy PDF export and printing for team sharing.',
            'main-features-title': 'Main features include:',
            'feature-list-1': 'Set parameters like film title, roll number, scene number, shot number, take number',
            'feature-list-2': 'Record director, cinematographer, camera position, frame rate (fps) information',
            'feature-list-3': 'Support Day/Night, Int/Ext, Mos/Sync and other scene parameters',
            'feature-list-4': 'Automatically generate slate sheets, support PDF export and printing',
            'feature-list-5': 'Simple and easy-to-use interface, input content will not automatically disappear',
            'updates-title': 'Latest Updates',
            'update-v120-title': 'Slate Function Update',
            'update-v120-desc': 'Updated the slate sheet function, you can edit slate information, print and export PDF, supports iCloud device information sync (in-app purchase).',
            'update-v112-title': 'Input Optimization',
            'update-v112-desc': 'Optimized input issues.',
            'update-v111-title': 'Frame Rate Setting Optimization',
            'update-v111-desc': '- Added frame rate setting options to ensure slate and sound sync, go try it out!',
            'update-v110-title': 'Sound Effects and Feedback Optimization',
            'update-v110-desc1': '- Added more audio effects.',
            'update-v110-desc2': '- Welcome your suggestions and feedback.',
            'download-url': 'https://apps.apple.com/us/app/clapperboard-scene-tracker/id6445955423',
            'footer-copyright': '© 2025 Snail\'s Growth Tools. All rights reserved.',
            
            // App2 page translations
            'app2-detail-title': 'Simple Time - Detailed Introduction',
            'app2-title': 'Simple Time',
            'app2-subtitle': 'Eye-Care Colorful Theme Fullscreen Clock',
            'app2-screenshots-title': 'Screenshots',
            'app2-screenshot-1': 'Main Interface',
            'app2-screenshot-2': 'Clock Interface',
            'app2-screenshot-3': 'Settings Interface',
            'app2-screenshot-4': 'Theme Selection',
            'app2-features-title': 'App Features',
            'app2-feature1-title': 'Simple & Easy',
            'app2-feature1-desc': 'Intuitive operation without complex learning process, suitable for all ages.',
            'app2-feature2-title': 'Eye Protection',
            'app2-feature2-desc': 'Soft light eye-care design, no fatigue even with long-term use, protecting your vision.',
            'app2-feature3-title': 'Colorful Themes',
            'app2-feature3-desc': 'Rich theme color choices to make the clock interface match your personal preferences.',
            'app2-feature4-title': 'Fullscreen Display',
            'app2-feature4-desc': 'Supports fullscreen clock display, adding beauty and practicality to your desktop.',
            'app2-about-title': 'About This App',
            'app2-about-desc1': 'Simple Time is a clock application designed specifically for users who pursue simplicity and beauty. The app uses clear and readable fonts with comfortable color combinations, allowing you to easily check the time in any environment.',
            'app2-about-desc2': 'The app provides multiple themes and display modes, supports fullscreen clock display, and is especially suitable for use as a desktop clock. The eye-care mode design ensures you won\'t feel tired even with long-term use.',
            'app2-highlights-title': 'App Highlights:',
            'app2-highlight-1': 'Minimalist design style with clean and beautiful interface',
            'app2-highlight-2': 'Multiple theme colors for personalized customization',
            'app2-highlight-3': 'Eye-care mode design to protect vision health',
            'app2-highlight-4': 'Fullscreen display support for professional clock experience',
            'app2-highlight-5': 'Lightweight app with minimal resource usage',
            'app2-updates-title': 'Version Updates',
            'app2-version-latest': 'v1.2.0',
            'app2-update-date-latest': 'January 20, 2024',
            'app2-update-title-latest': 'New Features Released',
            'app2-update-1': 'Added night mode theme',
            'app2-update-2': 'Optimized clock display precision',
            'app2-update-3': 'Fixed known display issues',
            'app2-update-4': 'Added more font choices',
            'app2-version-prev': 'v1.1.0',
            'app2-update-date-prev': 'December 15, 2023',
            'app2-update-title-prev': 'Feature Optimization',
            'app2-update-prev-1': 'Improved clock display effects',
            'app2-update-prev-2': 'Added colorful theme selection',
            'app2-update-prev-3': 'Support for fullscreen display mode',
            
            // App3 page translations
            'app3-detail-title': 'Scoreboard - Detailed Introduction',
            'app3-title': 'Scoreboard',
            'app3-subtitle': 'Competition Scoring Tool for 2-6 Players',
            'app3-screenshots-title': 'Screenshots',
            'app3-screenshot-1': 'Simple Scoring',
            'app3-screenshot-2': 'Multi-Player Support',
            'app3-screenshot-3': 'Timer Support',
            'app3-screenshot-4': 'Multiple Themes',
            'app3-features-title': 'App Features',
            'app3-feature1-title': 'Score Adjustment Function',
            'app3-feature1-desc': 'Adjust scores through simple "+" and "-" buttons, supports custom score increments to adapt to different game rules.',
            'app3-feature2-title': 'Timer Function',
            'app3-feature2-desc': 'Supports countdown and count-up modes, flexible time rule settings for different activities.',
            'app3-feature3-title': 'Custom Team Names',
            'app3-feature3-desc': 'Simply tap default team names to edit, option to show or hide names for personalized experience.',
            'app3-feature4-title': 'Score Reset Option',
            'app3-feature4-desc': 'One-click reset all scores to zero, convenient for starting new games or competitions.',
            'app3-feature5-title': 'Persistent Data Storage',
            'app3-feature5-desc': 'Local storage of team names, scores and user preferences, easily restore previous settings on next access.',
            'app3-feature6-title': 'Theme Selection',
            'app3-feature6-desc': 'Multiple themes supported, users can freely switch visual styles based on personal preferences or activity needs.',
            'app3-feature7-title': 'Screen Mirroring',
            'app3-feature7-desc': 'Leverage iOS system mirroring to display scores in real-time on larger screens for more viewers to share exciting moments.',
            'app3-about-title': 'About This App',
            'app3-about-desc1': 'Scoreboard App is a simple and intuitive scoreboard application specifically designed for tracking scores in various sports and activities. It features a user-friendly interface that allows users to easily manage team names and scores, perfect for basketball games, quiz competitions, tabletop game gatherings, and many other occasions.',
            'app3-about-desc2': 'Scoreboard App is the ideal choice for every event organizer and participant. It not only enhances the interactivity of games and competitions but also adds fun to contests. Whether it\'s family gatherings, small competitions among friends, or formal sports events, Score Board makes score recording easy and enjoyable.',
            'app3-highlights-title': 'Core Features:',
            'app3-highlight-1': 'Score Adjustment Function: Adjust scores via "+" and "-" buttons, supports custom increments',
            'app3-highlight-2': 'Timer Function: Supports countdown and count-up modes, flexible time rule settings',
            'app3-highlight-3': 'Custom Team Names: Tap to edit, option to show or hide names',
            'app3-highlight-4': 'Score Reset Option: One-click reset all scores for new games',
            'app3-highlight-5': 'Persistent Data Storage: Local settings storage with "Clear All" function',
            'app3-highlight-6': 'Theme Selection: Multiple theme styles to suit different activity needs',
            'app3-highlight-7': 'Screen Mirroring: iOS mirroring support for real-time display on large screens',
            'app3-updates-title': 'Update Log',
            'app3-version-latest': 'v1.3.0',
            'app3-update-date-latest': 'January 25, 2024',
            'app3-update-title-latest': 'Important Update',
            'app3-update-1': 'Added 6-player competition mode',
            'app3-update-2': 'Optimized timer precision',
            'app3-update-3': 'Added competition history records',
            'app3-update-4': 'Support for custom player names',
            'app3-update-5': 'Fixed known display issues',
            'app3-version-prev': 'v1.2.0',
            'app3-update-date-prev': 'December 20, 2023',
            'app3-update-title-prev': 'Feature Enhancement',
            'app3-update-prev-1': 'Improved scoring interface design',
            'app3-update-prev-2': 'Added multiple theme choices',
            'app3-update-prev-3': 'Optimized app performance',
            'app3-update-prev-4': 'Added timer function'
        }
    };
}

// Logo动画控制
function initLogoAnimation() {
    const brandLogo = document.querySelector('.brand-logo');
    const logoVideo = document.querySelector('.logo-video');
    
    console.log('初始化Logo动画:', { brandLogo, logoVideo });
    
    if (brandLogo && logoVideo) {
        // 设置视频属性
        logoVideo.muted = true;
        logoVideo.playsInline = true;
        
        // 视频加载事件
        logoVideo.addEventListener('loadeddata', function() {
            console.log('视频加载完成');
        });
        
        logoVideo.addEventListener('error', function(e) {
            console.error('视频加载错误:', e);
        });
        
        // 鼠标悬浮时播放视频
        brandLogo.addEventListener('mouseenter', function() {
            console.log('鼠标悬浮，尝试播放视频');
            logoVideo.currentTime = 0;
            const playPromise = logoVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('视频播放成功');
                }).catch(e => {
                    console.error('视频播放失败:', e);
                });
            }
        });
        
        // 鼠标离开时暂停视频
        brandLogo.addEventListener('mouseleave', function() {
            console.log('鼠标离开，暂停视频');
            logoVideo.pause();
            logoVideo.currentTime = 0;
        });
    } else {
        console.error('找不到logo元素:', { brandLogo, logoVideo });
    }
}