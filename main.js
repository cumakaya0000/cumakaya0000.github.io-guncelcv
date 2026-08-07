let currentLanguage = 'tr';
        
        function changeLanguage(lang) {
            currentLanguage = lang;
            
            // Tüm çevirilebilir elementleri bul ve güncelle
            const elements = document.querySelectorAll('[data-' + currentLanguage + ']');
            elements.forEach(element => {
                const translation = element.getAttribute('data-' + currentLanguage);
                if (translation) {
                    element.textContent = translation;
                }
            });
            
            // Dil tercihini kaydet
            localStorage.setItem('language', currentLanguage);
        }
        
        // Sayfa yüklendiğinde kaydedilmiş dili uygula
        window.addEventListener('DOMContentLoaded', () => {
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage) {
                currentLanguage = savedLanguage;
                document.querySelector('.language-select').value = currentLanguage;
                changeLanguage(currentLanguage);
            } else { // Varsayılan olarak Türkçe ayarla
                currentLanguage = 'tr';
                document.querySelector('.language-select').value = currentLanguage;
                changeLanguage(currentLanguage);
            }
        });

        const experiences = [
            {
                date: 'HAZİRAN 2023 - EYLÜL 2023',
                title: 'Stajyer Yazılım Geliştirici',
                company: 'Ardahan Üniversitesi Bilgi İşlem Daire Başkanlığı',
                description: 'Ardahan Üniversitesi Bilgi İşlem Daire Başkanlığı bünyesinde gerçekleştirdiğim staj döneminde, kurum içi donanım arızalarının tespiti ve tamiri süreçlerinde aktif rol aldım. Ayrıca üniversitenin kurum içi web sitelerinin bakımı, içerik güncellemeleri ve teknik iyileştirmeleri üzerinde çalışmalar yürüttüm.',
                image: 'https://via.placeholder.com/800x400?text=Ardahan+Uni+Staj'
            },
            {
                date: '2022 - 2023',
                title: 'Freelance Web Tasarımcı',
                company: 'Serbest Çalışma',
                description: 'Küçük işletmeler ve bireysel müşteriler için web sitesi tasarımı ve geliştirme. Müşteri iletişimi, proje yönetimi ve deadline\'lara uygun teslimat konularında deneyim. 15+ proje tamamladım ve müşteri memnuniyeti %95 üzerinde seyrettiği için referanslarla sürekli yeni projeler aldım.',
                image: 'https://via.placeholder.com/800x400?text=Freelance+Tasarimci'
            }
        ];

        let currentExperienceIndex = 0;

        function openExperienceModal(index) {
            currentExperienceIndex = index;
            updateExperienceModal();
            const modal = document.getElementById('experienceModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeExperienceModal() {
            const modal = document.getElementById('experienceModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function navigateExperience(direction) {
            currentExperienceIndex += direction;
            if (currentExperienceIndex < 0) currentExperienceIndex = 0;
            if (currentExperienceIndex >= experiences.length) currentExperienceIndex = experiences.length - 1;
            updateExperienceModal();
        }

        function updateExperienceModal() {
            const exp = experiences[currentExperienceIndex];
            document.getElementById('experienceImage').src = exp.image;
            document.getElementById('experienceDate').textContent = exp.date;
            document.getElementById('experienceTitle').textContent = exp.title;
            document.getElementById('experienceCompany').textContent = exp.company;
            document.getElementById('experienceDescription').textContent = exp.description;

            // Navigation butonlarını güncelle
            document.getElementById('prevExpBtn').disabled = currentExperienceIndex === 0;
            document.getElementById('nextExpBtn').disabled = currentExperienceIndex === experiences.length - 1;
        }
        
        function openHobbyModal(icon, title, description) {
            const modal = document.getElementById('hobbyModal');
            const modalIcon = document.getElementById('modalIcon');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            modalIcon.textContent = icon;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeHobbyModal() {
            const modal = document.getElementById('hobbyModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Modal dışına tıklandığında kapat
        window.onclick = function(event) {
            const hobbyModal = document.getElementById('hobbyModal');
            const experienceModal = document.getElementById('experienceModal');
            if (event.target === hobbyModal) {
                closeHobbyModal();
            }
            if (event.target === experienceModal) {
                closeExperienceModal();
            }
        }
        
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');
            const themeCheckbox = document.getElementById('theme-checkbox');
            
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                themeIcon.textContent = '🌙';
                if(themeText) {
                    themeText.textContent = themeText.getAttribute('data-' + currentLanguage) === 'KOYU' ? 'KOYU' : 'KOYU'; // Default to show what you can switch to
                    // Wait, usually buttons show CURRENT state or ACTION. 
                    // User said "ilk açıldığında açık tema". So if it's light, button should probably say "DARK" to switch.
                    updateThemeButtonText('light');
                }
                if(themeCheckbox) themeCheckbox.checked = false; // light is unchecked in my logic now
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.textContent = '☀️';
                updateThemeButtonText('dark');
                if(themeCheckbox) themeCheckbox.checked = true;
                localStorage.setItem('theme', 'dark');
            }
        }

        function updateThemeButtonText(theme) {
            const themeText = document.getElementById('theme-text');
            const themeIcon = document.getElementById('theme-icon');
            if(!themeText) return;

            if (theme === 'light') {
                themeIcon.textContent = '☀️';
                const translations = { tr: 'AÇIK TEMA', en: 'LIGHT MODE', de: 'HELLER MODUS' };
                themeText.textContent = translations[currentLanguage] || 'AÇIK TEMA';
            } else {
                themeIcon.textContent = '🌙';
                const translations = { tr: 'KOYU TEMA', en: 'DARK MODE', de: 'DUNKLER MODUS' };
                themeText.textContent = translations[currentLanguage] || 'KOYU TEMA';
            }
        }

        // Sayfa yüklendiğinde tema tercihini ve profil resmini kontrol et
        window.addEventListener('DOMContentLoaded', () => {
            let savedTheme = localStorage.getItem('theme');
            const themeCheckbox = document.getElementById('theme-checkbox');
            
            // İlk açılışta açık tema olsun istendi
            if (!savedTheme) {
                savedTheme = 'light';
            }

            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                updateThemeButtonText('light');
                if(themeCheckbox) themeCheckbox.checked = false;
            } else {
                document.body.classList.remove('light-theme');
                updateThemeButtonText('dark');
                if(themeCheckbox) themeCheckbox.checked = true;
            }
        });
        
        // Sayfa geçiş fonksiyonu
        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            document.getElementById(sectionId).classList.add('active');
            // `event` nesnesi `onclick` tarafından otomatik olarak sağlanır.
            // Eğer `showSection` başka bir yerden çağrılırsa, `event` argümanını alması gerekir.
            // Bu durumda, `event` her zaman var olmayabilir.
            // Güvenli hale getirmek için kontrol ekleyelim.
            if (typeof event !== 'undefined' && event.target) {
                event.target.classList.add('active');
            }
        }

        const educationData = [
            {
                tr: {
                    title: "Bilgisayar Programcılığı - Ön Lisans",
                    school: "Ardahan Üniversitesi",
                    date: "2024 - 2026",
                    details: ["Web Programlama", "Veritabanı Yönetimi", "Algoritma ve Programlama", "Mobil Uygulama Geliştirme"],
                    description: "Modern programlama dillerini ve teknolojilerini öğrenerek yazılım geliştirme alanında kendimi geliştiriyorum. Teorik bilgiyi pratik projelerle pekiştirerek sektöre hazırlanıyorum."
                },
                en: {
                    title: "Computer Programming - Associate Degree",
                    school: "Ardahan University",
                    date: "2024 - 2026",
                    details: ["Web Programming", "Database Management", "Algorithm and Programming", "Mobile Application Development"],
                    description: "I am improving myself in software development by learning modern programming languages and technologies. I prepare for the industry by reinforcing theoretical knowledge with practical projects."
                },
                de: {
                    title: "Computerprogrammierung - Associate Degree",
                    school: "Ardahan Universität",
                    date: "2024 - 2026",
                    details: ["Webprogrammierung", "Datenbankverwaltung", "Algorithmus und Programmierung", "Mobile Anwendungsentwicklung"],
                    description: "Ich verbessere mich in der Softwareentwicklung, indem ich moderne Programmiersprachen und Technologien lerne. Ich bereite mich auf die Branche vor, indem ich theoretisches Wissen mit praktischen Projekten verstärke."
                }
            }
        ];
        
        function openEducationModal(index) {
            const modal = document.getElementById('educationModal');
            const data = educationData[index][currentLanguage];
            
            document.getElementById('educationModalTitle').textContent = data.title;
            document.getElementById('educationModalSchool').textContent = data.school;
            document.getElementById('educationModalDate').textContent = data.date;
            document.getElementById('educationModalDescription').textContent = data.description;
            
            const detailsList = document.getElementById('educationModalDetails');
            detailsList.innerHTML = '';
            data.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                detailsList.appendChild(li);
            });
            
            modal.classList.add('active');
        }
        
        function closeEducationModal() {
            document.getElementById('educationModal').classList.remove('active');
        }

                        const workData = [
            {
                image: "https://picsum.photos/700/300?random=10",
                tr: {
                    title: " Binance Arbitraj Botu",
                    description: "Binance API entegrasyonu ile kripto para piyasalarını anlık takip eden, fiyat farklarını yakalayıp otomatik arbitraj ve alım-satım işlemleri gerçekleştirebilen C# tabanlı işlem botu.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["C#","Binance API","Arbitrage"]
                },
                en: {
                    title: " Binance Arbitrage Bot",
                    description: "A C#-based trading bot integrated with the Binance API to monitor crypto markets, detect price differences, and execute automated arbitrage trades.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["C#","Binance API","Arbitrage"]
                },
                de: {
                    title: " Binance-Arbitrage-Bot",
                    description: "Ein in C# entwickelter Trading-Bot mit Binance API-Integration zur Marktüberwachung, Erkennung von Preisdifferenzen und automatischen Arbitrage-Trades.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["C#","Binance API","Arbitrage"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=11",
                tr: {
                    title: "️ Whisper Ses Deşifre Uygulaması",
                    description: "Python ve Whisper modeli entegrasyonu kullanılarak ses dosyalarını (MP3/WAV) otomatik ve yüksek doğrulukla yazılı metne dönüştüren yapay zeka deşifre uygulaması.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["Python","Whisper AI","Speech-to-Text"]
                },
                en: {
                    title: "️ Whisper Audio Transcription",
                    description: "An AI-powered audio transcription application built with Python and Whisper model integration to convert audio files (MP3/WAV) into text with high accuracy.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["Python","Whisper AI","Speech-to-Text"]
                },
                de: {
                    title: "️ Whisper-Audio-Transkription",
                    description: "Eine KI-gestützte Audio-Transkriptionsanwendung auf Python-Basis mit Whisper-Modell-Integration zur präzisen Umwandlung von Audiodateien in Text.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["Python","Whisper AI","Speech-to-Text"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=12",
                tr: {
                    title: "️ Gerçek Zamanlı El Takip Sistemi",
                    description: "Web kamerası aracılığıyla kullanıcının el hareketlerini, parmak eklemlerini ve koordinatlarını gerçek zamanlı analiz eden yapay zeka destekli bilgisayarlı görü uygulaması.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["JavaScript","MediaPipe","Computer Vision"]
                },
                en: {
                    title: "️ Real-time Hand Tracking",
                    description: "An AI-powered computer vision web application that uses a webcam to analyze and track hand gestures, finger joints, and coordinates in real-time.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["JavaScript","MediaPipe","Computer Vision"]
                },
                de: {
                    title: "️ Echtzeit-Hand-Tracking",
                    description: "Eine KI-gestützte Webanwendung für Computer Vision, die über eine Webcam Handgesten, Fingergelenke und Koordinaten in Echtzeit analysiert und verfolgt.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["JavaScript","MediaPipe","Computer Vision"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=13",
                tr: {
                    title: " Akademik Rehber & Fakülte Portalı",
                    description: "Üniversite fakülteleri, bölümleri ve akademisyen bilgileri için barkod/karekod tarama entegrasyonu ile hızlı bilgi erişimi sunan akademik rehber portalı.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Responsive"]
                },
                en: {
                    title: " Academic Guide Portal",
                    description: "A comprehensive academic portal providing quick access to university faculty, department, and academic staff info via barcode/QR code scanning integration.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Responsive"]
                },
                de: {
                    title: " Akademischer Führer",
                    description: "Ein akademisches Portal für schnellen Zugriff auf Fakultäts- und Mitarbeiterinformationen über Barcode-/QR-Code-Scanning-Integrationen.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Responsive"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=14",
                tr: {
                    title: "️ Anlık Hava Durumu Portalı",
                    description: "Hava durumu API'leri ile entegre, dünya genelinde şehir arama, 5 günlük detaylı hava tahmini, nem, rüzgar hızı ve sıcaklık grafikleri sunan duyarlı web uygulaması.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["JavaScript","Weather API","CSS3","Fetch API"]
                },
                en: {
                    title: "️ Real-time Weather App",
                    description: "A responsive weather forecast web app using weather APIs to provide global city searches, 5-day forecasts, humidity, wind speed, and temperature charts.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["JavaScript","Weather API","CSS3","Fetch API"]
                },
                de: {
                    title: "️ Echtzeit-Wetter-App",
                    description: "Eine responsive Wettervorhersage-Web-App mit API-Anbindung für weltweite Stadtsuche, 5-Tage-Vorhersagen und detaillierte Wetterwerte.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["JavaScript","Weather API","CSS3","Fetch API"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=15",
                tr: {
                    title: " İnteraktif Tabu Oyunu",
                    description: "Modern arayüz tasarımı, geniş kelime haznesi, skor takibi ve dinamik zamanlayıcı özellikleri barındıran, tarayıcı üzerinden oynanabilen etkileşimli Tabu oyunu.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript"]
                },
                en: {
                    title: " Interactive Taboo Game",
                    description: "An interactive browser-based Taboo word game featuring a modern UI design, large vocabulary database, score tracking, and dynamic countdown timers.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript"]
                },
                de: {
                    title: " Interaktives Tabu-Spiel",
                    description: "Ein interaktives browserbasiertes Tabu-Wortspiel mit modernem UI-Design, großer Wortdatenbank, Punktestand-Tracking und Countdown-Timern.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=16",
                tr: {
                    title: "️ Restoran Otomasyon Sistemi",
                    description: "Masa rezervasyonları, sipariş takibi, menü yönetimi ve detaylı raporlama araçları sunan ASP.NET tabanlı gelişmiş restoran yönetim otomasyonu.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["ASP.NET","C#","SQL Server","Dashboard"]
                },
                en: {
                    title: "️ Restaurant Management System",
                    description: "An advanced ASP.NET-based restaurant automation system featuring table reservations, order tracking, menu controls, and reporting dashboards.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["ASP.NET","C#","SQL Server","Dashboard"]
                },
                de: {
                    title: "️ Restaurant-Management",
                    description: "Ein fortschrittliches ASP.NET-Restaurantverwaltungssystem mit Tischreservierungen, Bestellverfolgung und Menüsteuerung.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["ASP.NET","C#","SQL Server","Dashboard"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=17",
                tr: {
                    title: " YouTube Video İndirici",
                    description: "C# ile geliştirilmiş, kullanıcıların YouTube videolarını ve oynatma listelerini farklı çözünürlük ile formatlarda (MP4/MP3) indirmesini sağlayan masaüstü yazılımı.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["C#","Windows Forms","YouTube API"]
                },
                en: {
                    title: " YouTube Video Downloader",
                    description: "A C# desktop application enabling users to download YouTube videos and playlists in various resolutions and formats (MP4/MP3) easily.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["C#","Windows Forms","YouTube API"]
                },
                de: {
                    title: " YouTube-Video-Downloader",
                    description: "Eine C#-Desktopanwendung, mit der Benutzer YouTube-Videos und -Wiedergabelisten in verschiedenen Auflösungen und Formaten herunterladen können.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["C#","Windows Forms","YouTube API"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=18",
                tr: {
                    title: " TamirHanem Servis Takip",
                    description: "Teknik servislerin müşteri kayıtlarını, cihaz tamir süreçlerini, yedek parça stoklarını ve cihaz durum sorgulamalarını dijitalleştiren yönetim portalı.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Responsive"]
                },
                en: {
                    title: " Repair Shop Automation",
                    description: "A service tracking portal that digitalizes repair shops' customer registrations, device repair stages, spare parts stock, and device status queries.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Responsive"]
                },
                de: {
                    title: " Werkstatt-Automatisierung",
                    description: "Ein Portal zur Werkstattverwaltung zur Digitalisierung von Kundenregistrierungen, Reparaturphasen und Gerätestatusabfragen.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Responsive"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=19",
                tr: {
                    title: " Kaya Dijital Kurumsal Web Sitesi",
                    description: "Kaya Dijital ajansı için tasarlanmış; modern geçiş efektleri, portfolyo galerileri ve iletişim formları barındıran şık ve responsive kurumsal tanıtım web sitesi.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Corporate"]
                },
                en: {
                    title: " Kaya Digital Business Website",
                    description: "A sleek, responsive corporate web design developed for Kaya Digital agency, featuring modern transitions, portfolio galleries, and contact forms.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Corporate"]
                },
                de: {
                    title: " Kaya Digital Webseite",
                    description: "Ein elegantes, responsives Webdesign für die Agentur Kaya Digital mit modernen Übergängen, Portfolio-Galerien und Kontaktformularen.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Corporate"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=20",
                tr: {
                    title: " Richman Bütçe & Finans Takip",
                    description: "Kullanıcıların gelir, gider, borç ve birikimlerini kategorize ederek bütçe analizi yapmalarını sağlayan modern finans yönetim uygulaması.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Finance"]
                },
                en: {
                    title: " Richman Budget Tracker",
                    description: "A modern financial planning web application helping users categorize income, expenses, debts, and savings for budget analysis.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Finance"]
                },
                de: {
                    title: " Richman Budget-Tracker",
                    description: "Eine moderne Finanzplanungs-Webanwendung, mit der Benutzer Einnahmen, Ausgaben, Schulden und Ersparnisse für Budgetanalysen kategorisieren können.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","Finance"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=21",
                tr: {
                    title: " Detaylı İş Başvuru Formu",
                    description: "Zengin form denetimleri, dosya yükleme desteği ve adım adım (stepper) form yapısı içeren, dinamik kontrollere sahip iş başvuru toplama arayüzü.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript"]
                },
                en: {
                    title: " Job Application Form",
                    description: "A job application collection form featuring step-by-step navigation, file upload support, and dynamic input validation controls.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript"]
                },
                de: {
                    title: " Bewerbungsformular",
                    description: "Ein Bewerbungsformular mit Schritt-für-Schritt-Navigation, Datei-Upload-Unterstützung und dynamischen Validierungskontrollen.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=22",
                tr: {
                    title: " Kişisel Öğrenme Materyali Portalı",
                    description: "Kişisel çalışma notlarını, eğitim kaynaklarını ve ders materyallerini arşivleyip kategorize etmek için C# ile geliştirilmiş öğrenme takip aracı.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["C#","Windows Forms","Database"]
                },
                en: {
                    title: " Personal Learning Tracker",
                    description: "A study tracking application built with C# to archive, tag, and categorize personal study notes, tutorials, and educational resources.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["C#","Windows Forms","Database"]
                },
                de: {
                    title: " Lernmaterialien-Portal",
                    description: "Eine Lern-Tracking-Anwendung in C# zur Archivierung, Kennzeichnung und Kategorisierung persönlicher Studiennotizen und Lernmaterialien.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["C#","Windows Forms","Database"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=23",
                tr: {
                    title: " Akıllı Dükkan Arama Portalı",
                    description: "Harita entegrasyonu ile kullanıcılara yakın çevrelerindeki dükkan ve işletmeleri arama, filtreleme ve yol tarifi alma imkanı sunan web uygulaması.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["JavaScript","Map API","Geolocation"]
                },
                en: {
                    title: " Shop Search & Map Portal",
                    description: "A map-integrated web application letting users search, filter, and get directions to nearby shops and businesses based on categories.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["JavaScript","Map API","Geolocation"]
                },
                de: {
                    title: " Shop-Suchportal",
                    description: "Eine kartenintegrierte Webanwendung, mit der Benutzer Geschäfte in der Nähe suchen, filtern und Wegbeschreibungen abrufen können.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["JavaScript","Map API","Geolocation"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=24",
                tr: {
                    title: " Ela Özgeçmiş Portfolyosu",
                    description: "Yaratıcı ve modern bir tasarım şablonuyla kişisel yetenekleri, projeleri ve profesyonel kariyer geçmişini sergileyen özgeçmiş web sitesi.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","CV"]
                },
                en: {
                    title: " Ela Resume & CV Web",
                    description: "A personal resume website built with a creative, modern template showcasing skills, projects, and professional career history.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","CV"]
                },
                de: {
                    title: " Ela Lebenslauf-Webseite",
                    description: "Eine persönliche Lebenslauf-Website mit kreativer, moderner Vorlage zur Darstellung von Fähigkeiten, Projekten und beruflichem Werdegang.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","JavaScript","CV"]
                }
            },
            {
                image: "https://picsum.photos/700/300?random=25",
                tr: {
                    title: " Üniversite Bilgisayar Kulübü",
                    description: "Ardahan Üniversitesi Bilgisayar Kulübü için tasarlanmış; etkinlik takvimleri, duyurular, üye kayıtları ve kulüp bilgilerini içeren resmi web portalı.",
                    features: [
                        "GitHub kaynak kodu erişimi",
                        "Modern ve kullanıcı dostu tasarım",
                        "Yüksek performans ve optimize altyapı"
                    ],
                    tech: ["HTML5","CSS3","Responsive"]
                },
                en: {
                    title: " University Computer Club",
                    description: "The official web portal developed for the Ardahan University Computer Club, featuring event calendars, announcements, and club details.",
                    features: [
                        "GitHub source code access",
                        "Modern and user-friendly design",
                        "High performance and optimized infrastructure"
                    ],
                    tech: ["HTML5","CSS3","Responsive"]
                },
                de: {
                    title: " Universitäts-Computerclub",
                    description: "Das offizielle Webportal für den Computerclub der Ardahan-Universität mit Veranstaltungskalendern, Ankündigungen und Club-Details.",
                    features: [
                        "Zugriff auf den GitHub-Quellcode",
                        "Modernes und benutzerfreundliches Design",
                        "Hohe Leistung und optimierte Infrastruktur"
                    ],
                    tech: ["HTML5","CSS3","Responsive"]
                }
            }
        ];
        
        function openWorkModal(index) {
            const modal = document.getElementById('workModal');
            const work = workData[index];
            const data = work[currentLanguage];
            
            document.getElementById('workModalImage').src = work.image;
            document.getElementById('workModalImage').alt = data.title;
            document.getElementById('workModalTitle').textContent = data.title;
            document.getElementById('workModalDescription').textContent = data.description;
            
            const featuresList = document.getElementById('workModalFeatures');
            featuresList.innerHTML = '';
            data.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            const techContainer = document.getElementById('workModalTech');
            techContainer.innerHTML = '';
            data.tech.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tech;
                techContainer.appendChild(span);
            });
            
            modal.classList.add('active');
        }
        
        function closeWorkModal() {
            document.getElementById('workModal').classList.remove('active');
        }

        const educationModal = document.getElementById('educationModal');
        if (educationModal) {
            educationModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeEducationModal();
                }
            });
        }
        
        const workModal = document.getElementById('workModal');
        if (workModal) {
            workModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeWorkModal();
                }
            });
        }

        // Expose CV modal functions to global window scope for HTML onclick attributes
        window.openCVModal = openCVModal;
        window.closeCVModal = closeCVModal;


        // === CV MODAL ===
        function loadCV(lang) {
            const cvIframe = document.getElementById('cvIframe');
            const cvDownloadBtn = document.getElementById('cvDownloadBtn');
            
            // Map languages to files
            const cvFiles = {
                tr: 'cv/cumakaya_cv.pdf',
                en: 'cv/cv_en.pdf',
                de: 'cv/cv_de.pdf'
            };
            
            const file = cvFiles[lang] || cvFiles.tr;
            
            if (cvIframe) {
                cvIframe.src = file;
            }
            if (cvDownloadBtn) {
                cvDownloadBtn.href = file;
            }
            
            // Update active button state
            document.querySelectorAll('.cv-lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = document.getElementById(`cv-btn-${lang}`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }

        window.loadCV = loadCV; // Expose to global scope for HTML onclick

        function openCVModal(e) {
            if (e) e.preventDefault();
            const modal = document.getElementById('cvModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Auto-load current website language CV
            loadCV(currentLanguage || 'tr');
        }

        function closeCVModal() {
            const modal = document.getElementById('cvModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        document.addEventListener('DOMContentLoaded', function() {
            const cvModal = document.getElementById('cvModal');
            if (cvModal) {
                cvModal.addEventListener('click', function(e) {
                    if (e.target === this) closeCVModal();
                });
            }
        });

        // Mobil Menü Toggle (overlay destekli)
        function toggleMobileMenu() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const isOpen = sidebar.classList.contains('active');
            if (isOpen) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                sidebar.classList.add('active');
                if (overlay) overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeMobileMenu() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Mobil menüde linke tıklanınca kapat
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    closeMobileMenu();
                }
            });
        });