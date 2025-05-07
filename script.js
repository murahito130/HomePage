document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinksPC = document.querySelectorAll('nav a');
    const navLinksBottom = document.querySelectorAll('.bottom-nav a');
    const scheduleIframe = document.getElementById("schedule-iframe");
    const scheduleToggle = document.querySelector("#schedule > button.schedule-toggle"); // 親要素を指定してボタンを取得
    const gmScenarioIframe = document.getElementById("gm-scenario-iframe");
    const gmScenarioToggle = document.getElementById("gm-scenario-toggle");
    const passedScenarioIframe = document.getElementById("passed-scenario-iframe");
    const passedScenarioToggle = document.getElementById("passed-scenario-toggle");
    const navElement = document.querySelector('nav');
    const navHeight = navElement ? navElement.offsetHeight : 0;

    // ページ読み込み時に最初のセクションをアクティブにする
    if (sections.length > 0) {
        const firstSectionId = sections[0].getAttribute('id');
        navLinksPC.forEach(link => link.classList.remove('active'));
        navLinksBottom.forEach(link => link.classList.remove('active'));
        document.querySelector(`nav a[href="#${firstSectionId}"]`)?.classList.add('active');
        document.querySelector(`.bottom-nav a[href="#${firstSectionId}"]`)?.classList.add('active');
        sections[0].classList.add('visible'); // 最初のセクションを最初から表示
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

                const id = entry.target.getAttribute('id');
                navLinksPC.forEach(link => link.classList.remove('active'));
                navLinksBottom.forEach(link => link.classList.remove('active'));
                document.querySelector(`nav a[href="#${id}"]`)?.classList.add('active');
                document.querySelector(`.bottom-nav a[href="#${id}"]`)?.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    navLinksPC.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    navLinksBottom.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スケジュールiframeの表示・非表示処理
    if (scheduleToggle && scheduleIframe) {
        scheduleToggle.addEventListener("click", function () {
            scheduleIframe.classList.toggle("show");
            scheduleToggle.textContent = scheduleIframe.classList.contains("show") ? "スケジュールを非表示" : "スケジュールを表示";
        });
    }

    // GM可能なシナリオiframeの表示・非表示処理
    if (gmScenarioToggle && gmScenarioIframe) {
        gmScenarioToggle.addEventListener("click", function () {
            gmScenarioIframe.classList.toggle("show");
            gmScenarioToggle.textContent = gmScenarioIframe.classList.contains("show") ? "GM可能なシナリオを非表示" : "GM可能なシナリオを表示";
        });
    }

    // 通過済み・予定シナリオiframeの表示・非表示処理
    if (passedScenarioToggle && passedScenarioIframe) {
        passedScenarioToggle.addEventListener("click", function () {
            passedScenarioIframe.classList.toggle("show");
            passedScenarioToggle.textContent = passedScenarioIframe.classList.contains("show") ? "通過済み・予定シナリオを非表示" : "通過済み・予定シナリオを表示";
        });
    }
});