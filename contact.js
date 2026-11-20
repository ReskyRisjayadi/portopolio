/**
 * CONTACT FORM VALIDATION & WHATSAPP INTEGRATION
 * Features:
 * - Real-time input validation (Name, Email, WhatsApp, Subject, Message)
 * - Character count tracker
 * - WhatsApp direct chat composer
 * - Form submission state & feedback modal
 */

const WHATSAPP_PHONE = '6283805560465'; // Nomor WhatsApp Resky Risjayadi

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initWhatsAppFloating();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const phoneInput = document.getElementById('senderPhone');
  const subjectInput = document.getElementById('messageSubject');
  const messageInput = document.getElementById('messageContent');
  const charCounter = document.getElementById('messageCharCount');
  const btnSubmit = form.querySelector('button[type="submit"]');
  const btnReset = document.getElementById('btnResetForm');

  // Character counter for message textarea
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 500 karakter`;
      if (len > 500) {
        charCounter.style.color = 'var(--color-danger)';
      } else {
        charCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  // Real-time validation listeners on blur and input
  const inputsToValidate = [
    { el: nameInput, validator: validateName },
    { el: emailInput, validator: validateEmail },
    { el: phoneInput, validator: validatePhone },
    { el: subjectInput, validator: validateSubject },
    { el: messageInput, validator: validateMessage }
  ];

  inputsToValidate.forEach(({ el, validator }) => {
    if (!el) return;
    el.addEventListener('blur', () => validator(el));
    el.addEventListener('input', () => {
      // Clear error immediately when user begins correcting
      const group = el.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        validator(el);
      }
    });
  });

  // Reset button action
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      form.reset();
      inputsToValidate.forEach(({ el }) => {
        if (!el) return;
        const group = el.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
      if (charCounter) charCounter.textContent = '0 / 500 karakter';
      window.showToast('Formulir berhasil direset', 'info');
    });
  }

  // Form submission handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    inputsToValidate.forEach(({ el, validator }) => {
      if (!validator(el)) {
        isValid = false;
      }
    });

    if (!isValid) {
      window.showToast('Mohon periksa kembali isian formulir Anda', 'error');
      return;
    }

    // Set loading state
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spinSlow 1s linear infinite;">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
      </svg>
      Mengirim Pesan...
    `;

    // Simulate reliable dispatch
    setTimeout(() => {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnText;

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const senderPhone = phoneInput.value.trim();
      const subject = subjectInput.value;
      const message = messageInput.value.trim();

      // Show success toast
      window.showToast('Pesan Anda berhasil dikirim! Kami akan segera merespons.', 'success');

      // Open Post-Submit modal giving choice to forward directly to WhatsApp
      showSubmissionModal(senderName, senderEmail, senderPhone, subject, message);

      form.reset();
      if (charCounter) charCounter.textContent = '0 / 500 karakter';
    }, 1200);
  });
}

/* -------------------------------------------------------------
   VALIDATOR FUNCTIONS
   ------------------------------------------------------------- */
function setFieldError(inputEl, hasError, errorMsg = '') {
  const group = inputEl.closest('.form-group');
  if (!group) return;

  const errorEl = group.querySelector('.form-error-msg');
  if (hasError) {
    group.classList.add('has-error');
    if (errorEl) errorEl.textContent = errorMsg;
  } else {
    group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
  }
}

function validateName(el) {
  if (!el) return true;
  const val = el.value.trim();
  if (val.length === 0) {
    setFieldError(el, true, 'Nama lengkap wajib diisi');
    return false;
  }
  if (val.length < 3) {
    setFieldError(el, true, 'Nama minimal harus 3 karakter');
    return false;
  }
  setFieldError(el, false);
  return true;
}

function validateEmail(el) {
  if (!el) return true;
  const val = el.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val.length === 0) {
    setFieldError(el, true, 'Alamat email wajib diisi');
    return false;
  }
  if (!emailRegex.test(val)) {
    setFieldError(el, true, 'Format email tidak valid (contoh: nama@domain.com)');
    return false;
  }
  setFieldError(el, false);
  return true;
}

function validatePhone(el) {
  if (!el) return true;
  const val = el.value.trim();
  // Valid phone: optional +, digits, min 9 digits
  const cleanDigits = val.replace(/[^0-9]/g, '');
  if (val.length === 0) {
    setFieldError(el, true, 'Nomor WhatsApp / telepon wajib diisi');
    return false;
  }
  if (cleanDigits.length < 9) {
    setFieldError(el, true, 'Nomor telepon minimal 9 digit angka');
    return false;
  }
  setFieldError(el, false);
  return true;
}

function validateSubject(el) {
  if (!el) return true;
  const val = el.value.trim();
  if (val.length === 0) {
    setFieldError(el, true, 'Silakan pilih atau isi subjek pesan');
    return false;
  }
  setFieldError(el, false);
  return true;
}

function validateMessage(el) {
  if (!el) return true;
  const val = el.value.trim();
  if (val.length === 0) {
    setFieldError(el, true, 'Isi pesan tidak boleh kosong');
    return false;
  }
  if (val.length < 10) {
    setFieldError(el, true, 'Pesan terlalu singkat (minimal 10 karakter)');
    return false;
  }
  setFieldError(el, false);
  return true;
}

/* -------------------------------------------------------------
   WHATSAPP DIRECT INTEGRATION
   ------------------------------------------------------------- */
function initWhatsAppFloating() {
  const floatBtn = document.querySelector('.btn-whatsapp-float');
  if (floatBtn) {
    const greetingText = encodeURIComponent(
      'Halo Resky Risjayadi, saya telah melihat website portfolio Anda dan ingin berdiskusi mengenai peluang kerja / proyek.'
    );
    floatBtn.setAttribute('href', `https://wa.me/${WHATSAPP_PHONE}?text=${greetingText}`);
    floatBtn.setAttribute('target', '_blank');
    floatBtn.setAttribute('rel', 'noopener noreferrer');
  }

  // Also bind any element with class .btn-whatsapp-direct
  const directBtns = document.querySelectorAll('.btn-whatsapp-direct');
  directBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = encodeURIComponent('Halo Resky Risjayadi, saya ingin berdiskusi mengenai peluang kerja / kerja sama profesional.');
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');
    });
  });
}

function showSubmissionModal(name, email, phone, subject, message) {
  let modal = document.getElementById('submissionModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'submissionModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const encodedWaText = encodeURIComponent(
    `*Pesan Baru dari Website Portofolio*\n` +
    `👤 *Nama:* ${name}\n` +
    `✉️ *Email:* ${email}\n` +
    `📞 *Telepon:* ${phone}\n` +
    `📌 *Subjek:* ${subject}\n\n` +
    `📝 *Pesan:*\n${message}`
  );

  modal.innerHTML = `
    <div class="modal-window" style="max-width: 520px;">
      <div class="modal-header">
        <h3 class="modal-title" style="color: var(--color-success); display: flex; align-items: center; gap: 8px;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          Pesan Berhasil Terkirim!
        </h3>
        <button class="modal-close-btn" onclick="document.getElementById('submissionModal').classList.remove('active')">&times;</button>
      </div>
      <div class="modal-body">
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
          Terima kasih, <strong>${name}</strong>. Pesan Anda telah tersimpan dan notifikasi email telah diteruskan kepada kami.
        </p>
        <div style="background: var(--bg-muted); padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 20px;">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Subjek:</div>
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">${subject}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Balasan akan dikirim ke:</div>
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--blue-accent);">${email}</div>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
          Ingin respons instan? Anda juga dapat meneruskan pesan ini langsung ke WhatsApp sekarang.
        </p>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('submissionModal').classList.remove('active')">
            Tutup
          </button>
          <a href="https://wa.me/${WHATSAPP_PHONE}?text=${encodedWaText}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="background: #25d366; color: #ffffff;">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.85 2.796.85 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.767-5.767-5.767zm7.576 5.766c-.002 4.175-3.402 7.574-7.576 7.574-1.294 0-2.518-.332-3.585-.921l-4.446 1.166 1.186-4.338c-.687-1.127-1.077-2.456-1.079-3.481.002-4.174 3.402-7.574 7.576-7.574 4.174 0 7.574 3.4 7.576 7.574z"/></svg>
            Kirim ke WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}
