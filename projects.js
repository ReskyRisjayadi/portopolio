/**
 * PROJECTS & CERTIFICATIONS MODULE
 * Manages project portfolio data, filtering, project detail modal,
 * and certificate preview modal.
 */

// Project Dataset
const projectsData = [
  {
    id: 'project-1',
    category: 'web',
    categoryLabel: 'Web Application',
    title: 'ShopFlow Enterprise E-Commerce & Analytics',
    shortDesc: 'Platform e-commerce enterprise dengan arsitektur microservices, manajemen multi-gudang, analitik penjualan real-time, dan payment gateway terintegrasi.',
    fullDesc: 'ShopFlow adalah solusi e-commerce end-to-end yang dirancang untuk menangani lebih dari 200.000 transaksi bulanan. Dilengkapi dengan dashboard analitik prediktif, sistem inventaris multi-cabang, kalkulasi ongkir otomatis 12 kurir Indonesia, serta integrasi payment gateway resmi (Midtrans & Xendit).',
    image: 'assets/images/project-1.svg',
    technologies: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    features: [
      'Real-time Sales Analytics dengan visualisasi grafik interaktif',
      'Integrasi Payment Gateway Otomatis (QRIS, VA, E-Wallet, Kartu Kredit)',
      'Multi-warehouse Inventory sync dengan notifikasi stok menipis',
      'Arsitektur SSR dan caching Redis menghasilkan load time di bawah 1.2 detik'
    ],
    liveUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/arifpratama-dev/shopflow-enterprise'
  },
  {
    id: 'project-2',
    category: 'web',
    categoryLabel: 'Web Application',
    title: 'MediCare Portal — Hospital & Telemedicine System',
    shortDesc: 'Sistem manajemen rumah sakit pintar dan rekam medis elektronik (RME) terstandar SATUSEHAT Kemenkes dengan telekonsultasi video dokter.',
    fullDesc: 'MediCare Portal menyederhanakan alur kerja administrasi rumah sakit mulai dari pendaftaran rawat jalan online, antrean poliklinik real-time, peresepan obat digital, hingga sesi video call telemedicine terenkripsi end-to-end bagi pasien rawat jalan.',
    image: 'assets/images/project-2.svg',
    technologies: ['Vue.js 3', 'Express.js', 'WebRTC', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    features: [
      'Rekam Medis Elektronik (RME) kompatibel dengan standar HL7 FHIR Kemenkes',
      'Sistem antrean poli interaktif berbasis WebSockets secara live',
      'Telekonsultasi video langsung dalam browser menggunakan WebRTC',
      'Audit log aktivitas dokter dan proteksi data privasi medis sesuai UU PDP'
    ],
    liveUrl: 'https://medicare-portal.example.com',
    githubUrl: 'https://github.com/arifpratama-dev/medicare-system'
  },
  {
    id: 'project-3',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    title: 'PayNusantara — Digital Banking & Smart Wallet',
    shortDesc: 'Aplikasi mobile perbankan digital generasi baru dengan pelacakan pengeluaran berbasis AI, transfer antarbank gratis, dan otentikasi biometrik.',
    fullDesc: 'PayNusantara menghadirkan pengalaman finansial yang mulus dan aman bagi pengguna modern. Menggabungkan fitur smart budgeting, tabungan berjangka fleksibel, transaksi QRIS instan, serta pemantauan arus kas pribadi yang mudah dipahami.',
    image: 'assets/images/project-3.svg',
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'Go (Golang)', 'PostgreSQL', 'Docker'],
    features: [
      'Otentikasi aman menggunakan Face ID / Fingerprint Biometric',
      'Kategorisasi pengeluaran bulanan otomatis dengan visualisasi donut chart',
      'Dukungan QRIS statis dan dinamis dengan proses verifikasi instan',
      'Microservices Go berkinerja tinggi mampu melayani hingga 8.000 TPS'
    ],
    liveUrl: 'https://paynusantara.example.com',
    githubUrl: 'https://github.com/arifpratama-dev/paynusantara-mobile'
  },
  {
    id: 'project-4',
    category: 'enterprise',
    categoryLabel: 'Enterprise ERP',
    title: 'LogistiX ERP — Multi-Warehouse & Fleet Management',
    shortDesc: 'Sistem ERP logistik skala nasional untuk pemantauan rute armada truk, manajemen stok gudang pendingin, dan Purchase Order terotomasi.',
    fullDesc: 'LogistiX dibangun untuk mengoptimalkan efisiensi rantai pasok perusahaan distribusi farmasi dan bahan makanan segar. Menyediakan tracking GPS armada truk secara real-time, manajemen dokumen surat jalan digital (POD), dan otomasi sinkronisasi inventaris.',
    image: 'assets/images/project-4.svg',
    technologies: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'RabbitMQ', 'Leaflet Map'],
    features: [
      'Live Fleet GPS Tracking & optimasi rute bahan bakar tercepat',
      'Digital Proof of Delivery (POD) dengan tanda tangan digital dan foto GPS',
      'Otomatisasi pengadaan barang (Auto-PO) saat stok mencapai threshold minimum',
      'Role-based access control (RBAC) bertingkat untuk 8 level jabatan tim'
    ],
    liveUrl: 'https://logistix-erp.example.com',
    githubUrl: 'https://github.com/arifpratama-dev/logistix-erp'
  },
  {
    id: 'project-5',
    category: 'web',
    categoryLabel: 'IoT & Cloud',
    title: 'AuraCloud — Smart Industrial IoT Telemetry Hub',
    shortDesc: 'Platform IoT monitoring telemetri sensor industri pabrik pintar dengan alert dini suhu, tegangan listrik, dan vibrasi mesin secara live.',
    fullDesc: 'AuraCloud mengumpulkan miliaran data titik sensor industri setiap harinya melalui protokol MQTT. Dilengkapi dengan sistem peringatan dini otomatis (via Telegram dan Email) saat terjadi anomali beban daya atau getaran mekanik yang melebihi batas aman.',
    image: 'assets/images/project-5.svg',
    technologies: ['React.js', 'MQTT / WebSockets', 'TimescaleDB', 'Node.js', 'Chart.js', 'Docker'],
    features: [
      'Dashboard telemetri frekuensi tinggi dengan refresh interval sub-detik',
      'Multi-tenant sensor registry dengan enkripsi SSL/TLS mTLS',
      'Automated Early Warning Trigger via Webhook, SMS, dan Email',
      'Ekspor laporan analitik ke format PDF dan Excel hanya dengan satu klik'
    ],
    liveUrl: 'https://auracloud-iot.example.com',
    githubUrl: 'https://github.com/arifpratama-dev/auracloud-iot'
  },
  {
    id: 'project-6',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web',
    title: 'NusantaraStay — Boutique Villa & Travel Reservation',
    shortDesc: 'Website reservasi akomodasi villa premium dan perjalanan wisata Nusantara dengan desain elegan, filter interaktif, dan kalender booking dinamis.',
    fullDesc: 'NusantaraStay mengutamakan pengalaman visual yang memikat dan kemudahan eksplorasi bagi wisatawan domestik maupun mancanegara. Menghadirkan tur virtual kamar 360°, pemilihan tanggal menginap dengan kalkulasi diskon otomatis, dan ulasan tamu terverifikasi.',
    image: 'assets/images/project-6.svg',
    technologies: ['HTML5', 'CSS3 Modern', 'JavaScript ES6+', 'Figma Design', 'REST API'],
    features: [
      'Desain antarmuka responsif dan estetik bernuansa hospitality modern',
      'Kalender reservasi interaktif yang responsif di smartphone dan tablet',
      'Sistem filter multi-kriteria: harga, lokasi strategis, dan fasilitas kamar',
      'Performa Core Web Vitals tinggi dengan skor 98/100 di Google PageSpeed'
    ],
    liveUrl: 'https://nusantarastay.example.com',
    githubUrl: 'https://github.com/arifpratama-dev/nusantarastay-travel'
  }
];

// Certificate Dataset
const certificatesData = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Maret 2024 – Maret 2027',
    credId: 'AWS-ARCH-2024-8891',
    image: 'assets/images/cert-1.svg',
    verifyUrl: 'https://aws.amazon.com/verification',
    skills: 'Cloud Architecture, High Availability, S3, EC2, VPC, Cost Optimization'
  },
  {
    id: 'cert-2',
    title: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud Certified',
    date: 'November 2023 – November 2025',
    credId: 'GCP-PCA-449201',
    image: 'assets/images/cert-2.svg',
    verifyUrl: 'https://cloud.google.com/certification',
    skills: 'Cloud Migration, Kubernetes (GKE), Multi-Region Resilience, Cloud Security'
  },
  {
    id: 'cert-3',
    title: 'Sertifikasi Kompetensi Software Developer (Lead Programmer)',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    date: 'Juni 2023 – Juni 2026',
    credId: 'BNSP-TIK-2023-7721',
    image: 'assets/images/cert-3.svg',
    verifyUrl: 'https://bnsp.go.id',
    skills: 'Standar Kompetensi Kerja Nasional Indonesia (SKKNI), Software Engineering'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initProjectFilters();
  initModals();
});

/* -------------------------------------------------------------
   1. RENDER PROJECTS GRID
   ------------------------------------------------------------- */
function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const filtered = filterCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map((proj, idx) => `
    <article class="project-card reveal delay-${(idx % 3) + 1}" data-category="${proj.category}">
      <div class="project-img-wrapper">
        <span class="project-category-badge">${proj.categoryLabel}</span>
        <img src="${proj.image}" alt="${proj.title}" class="project-img" loading="lazy">
      </div>
      <div class="project-body">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.shortDesc}</p>
        <div class="tech-tags">
          ${proj.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          ${proj.technologies.length > 4 ? `<span class="tech-tag">+${proj.technologies.length - 4}</span>` : ''}
        </div>
        <div class="project-actions">
          <button class="btn btn-primary btn-sm btn-project-detail" data-project-id="${proj.id}">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            Detail Proyek
          </button>
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm btn-live-demo" data-title="${proj.title}">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            Demo
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Rebind project detail buttons
  const detailButtons = container.querySelectorAll('.btn-project-detail');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      openProjectModal(pId);
    });
  });

  // Rebind demo buttons with toast confirmation
  const demoButtons = container.querySelectorAll('.btn-live-demo');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      window.showToast(`Membuka live preview: ${title}`, 'info');
      setTimeout(() => {
        window.open(btn.getAttribute('href'), '_blank');
      }, 300);
    });
  });
}

/* -------------------------------------------------------------
   2. FILTER BUTTONS LOGIC
   ------------------------------------------------------------- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* -------------------------------------------------------------
   3. MODAL LOGIC (PROJECT DETAILS & CERTIFICATES)
   ------------------------------------------------------------- */
function initModals() {
  // Bind close buttons and outside click
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape key closes active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => closeModal(m));
    }
  });

  // Bind certificate cards
  const certCards = document.querySelectorAll('.btn-cert-detail, .cert-preview');
  certCards.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = item.getAttribute('data-cert-id');
      openCertModal(certId);
    });
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('projectModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="margin-bottom: 20px;">
      <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 10px; border: 1px solid var(--border-color); aspect-ratio: 16/9; object-fit: cover;">
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
      <span class="project-category-badge" style="position: static;">${project.categoryLabel}</span>
      <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Proyek Selesai & Terverifikasi</span>
    </div>
    <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px;">${project.title}</h2>
    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">${project.fullDesc}</p>
    
    <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 10px;">Fitur & Kapabilitas Utama:</h4>
    <ul style="list-style: none; margin-bottom: 22px; display: flex; flex-direction: column; gap: 8px;">
      ${project.features.map(f => `
        <li style="position: relative; padding-left: 20px; font-size: 0.9rem; color: var(--text-secondary);">
          <span style="position: absolute; left: 0; color: var(--blue-accent); font-weight: bold;">✓</span> ${f}
        </li>
      `).join('')}
    </ul>

    <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 10px;">Teknologi yang Digunakan:</h4>
    <div class="tech-tags" style="margin-top: 0; padding-top: 0; border: none; margin-bottom: 24px;">
      ${project.technologies.map(tech => `<span class="tech-tag" style="padding: 6px 12px; font-size: 0.82rem;">${tech}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        Buka Live Demo
      </a>
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        Lihat Source Code
      </a>
    </div>
  `;

  openModal(modal);
}

function openCertModal(certId) {
  const cert = certificatesData.find(c => c.id === certId);
  if (!cert) return;

  const modal = document.getElementById('certModal');
  const body = document.getElementById('certModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="margin-bottom: 20px; text-align: center;">
      <img src="${cert.image}" alt="${cert.title}" style="width: 100%; max-height: 380px; object-fit: contain; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main);">${cert.title}</h3>
      <div style="font-size: 0.95rem; font-weight: 600; color: var(--blue-accent);">${cert.issuer}</div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">Masa Berlaku: <strong>${cert.date}</strong> | ID: <code>${cert.credId}</code></div>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 8px;">Keahlian Teruji: ${cert.skills}</p>
    </div>
    <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: flex-end;">
      <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        Verifikasi Kredensial Resmi
      </a>
    </div>
  `;

  openModal(modal);
}

// Expose modal openers globally
window.openProjectModal = openProjectModal;
window.openCertModal = openCertModal;
