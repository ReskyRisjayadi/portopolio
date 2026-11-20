/**
 * PROFILE PHOTO HANDLER & CV DOWNLOAD MANAGER
 * - Interactive profile picture change with file picker & localStorage persistence
 * - Reset to default avatar button
 * - CV Download Choice Modal (PDF download or ATS print preview)
 */

const DEFAULT_AVATAR_PATH = 'assets/images/avatar-default.svg';

document.addEventListener('DOMContentLoaded', () => {
  initAvatarHandler();
  initCvDownloadModal();
});

/* -------------------------------------------------------------
   1. AVATAR UPLOAD & LOCALSTORAGE PERSISTENCE
   ------------------------------------------------------------- */
function initAvatarHandler() {
  const fileInput = document.getElementById('avatarFileInput');
  const avatarImg = document.getElementById('heroAvatarImg');
  const uploadBtn = document.getElementById('btnUploadAvatar');

  // Load saved avatar if present in localStorage
  const savedAvatar = localStorage.getItem('portfolio_user_avatar');
  if (savedAvatar && avatarImg) {
    avatarImg.src = savedAvatar;
  }

  // Trigger file dialog on button click
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fileInput.click();
    });
  }

  // Handle file selection
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      // Validate image type
      if (!file.type.match('image.*')) {
        window.showToast('Harap pilih file gambar (JPG, PNG, WebP, atau SVG)', 'error');
        return;
      }

      // Check file size (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        window.showToast('Ukuran foto maksimal 4MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        if (avatarImg) {
          avatarImg.src = base64Data;
        }

        // Store in localStorage for persistence
        try {
          localStorage.setItem('portfolio_user_avatar', base64Data);
          window.showToast('Foto profil berhasil diperbarui!', 'success');
        } catch (err) {
          window.showToast('Foto ditampilkan (penyimpanan lokal penuh)', 'info');
        }
      };

      reader.readAsDataURL(file);
    });
  }
}

// Reset photo to default
function resetAvatarToDefault() {
  const avatarImg = document.getElementById('heroAvatarImg');
  localStorage.removeItem('portfolio_user_avatar');
  if (avatarImg) {
    avatarImg.src = DEFAULT_AVATAR_PATH;
  }
  window.showToast('Foto profil dikembalikan ke default', 'info');
}

// Expose reset globally
window.resetAvatarToDefault = resetAvatarToDefault;

/* -------------------------------------------------------------
   2. CV DOWNLOAD MODAL & ACTIONS
   ------------------------------------------------------------- */
function initCvDownloadModal() {
  const cvButtons = document.querySelectorAll('.btn-download-cv');
  const modal = document.getElementById('cvModal');

  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });
}

function openCvModal() {
  let modal = document.getElementById('cvModal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCvModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function downloadCvPdf() {
  // Triggers direct download of the pre-built PDF file
  const link = document.createElement('a');
  link.href = 'assets/documents/CV_Resky_Risjayadi.pdf';
  link.download = 'CV_Resky_Risjayadi.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.showToast('Mengunduh berkas PDF Curriculum Vitae Resky Risjayadi...', 'success');
  closeCvModal();
}

function openPrintableCv() {
  window.open('cv-print.html', '_blank');
  window.showToast('Membuka tampilan ATS & cetak PDF...', 'info');
  closeCvModal();
}

window.openCvModal = openCvModal;
window.closeCvModal = closeCvModal;
window.downloadCvPdf = downloadCvPdf;
window.openPrintableCv = openPrintableCv;
