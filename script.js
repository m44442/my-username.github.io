document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 60;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // アクティブなナビゲーションリンクの更新
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');

            // モバイルメニューを閉じる
            if (window.innerWidth <= 768) {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    });

    // スクロール時のナビゲーションハイライト
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelector('nav a[href="#' + sectionId + '"]').classList.add('active');
            } else {
                document.querySelector('nav a[href="#' + sectionId + '"]').classList.remove('active');
            }
        });
    });

    // スキルタグのアニメーション
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        skill.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // プロジェクトカードのアニメーション
    const projectCards = document.querySelectorAll('.project-card');
    function checkScroll() {
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初期表示時にもチェック

    // タイピングアニメーション（オプション）
    const typingElement = document.querySelector('#home h1');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }
});