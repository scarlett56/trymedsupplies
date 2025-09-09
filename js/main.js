// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initCarousel();
    initMessageBoard();
    initAnimations();
});

// 导航栏功能
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow');
        } else {
            navbar.classList.remove('bg-white', 'shadow');
        }
    });
    
    // 移动端菜单关闭
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // 自动播放
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }
}

// 留言板功能
function initMessageBoard() {
    const messageForm = document.getElementById('messageForm');
    const messageList = document.getElementById('messageList');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitMessage();
        });
    }
    
    // 加载现有留言
    loadMessages();
}

// 提交留言
function submitMessage() {
    const form = document.getElementById('messageForm');
    const formData = new FormData(form);
    
    // 显示加载状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> 提交中...';
    submitBtn.disabled = true;
    
    // 模拟提交过程
    setTimeout(() => {
        // 创建新留言
        const message = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toLocaleString('zh-CN'),
            id: Date.now()
        };
        
        // 保存到本地存储
        saveMessage(message);
        
        // 显示留言
        displayMessage(message);
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // 显示成功消息
        showAlert('留言提交成功！', 'success');
    }, 1000);
}

// 保存留言到本地存储
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.unshift(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// 加载留言
function loadMessages() {
    const messageList = document.getElementById('messageList');
    if (!messageList) return;
    
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messageList.innerHTML = '';
    
    if (messages.length === 0) {
        messageList.innerHTML = '<p class="text-muted text-center">暂无留言，成为第一个留言的人吧！</p>';
        return;
    }
    
    messages.forEach(message => {
        displayMessage(message);
    });
}

// 显示留言
function displayMessage(message) {
    const messageList = document.getElementById('messageList');
    if (!messageList) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item fade-in';
    messageElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="mb-0 text-primary">${message.name}</h6>
            <small class="text-muted">${message.date}</small>
        </div>
        <p class="mb-2">${message.message}</p>
        <small class="text-muted">${message.email}</small>
        <button class="btn btn-sm btn-outline-danger float-end" onclick="deleteMessage(${message.id})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    messageList.insertBefore(messageElement, messageList.firstChild);
}

// 删除留言
function deleteMessage(id) {
    if (confirm('确定要删除这条留言吗？')) {
        let messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages = messages.filter(msg => msg.id !== id);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
        showAlert('留言已删除', 'info');
    }
}

// 显示提示消息
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // 自动消失
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// 动画效果
function initAnimations() {
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.card, .feature-box, .product-card').forEach(el => {
        observer.observe(el);
    });
}

// 平滑滚动
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 返回顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});

// 表单验证
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// 产品搜索功能
function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    productCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
