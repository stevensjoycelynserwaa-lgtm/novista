// ============================================
// NOVISTA PROPERTY SOLUTIONS — site behaviour
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Pre-fill "What do you need?" when a hero CTA card is clicked
document.querySelectorAll('[data-service]').forEach(el => {
  el.addEventListener('click', () => {
    const value = el.getAttribute('data-service');
    const select = document.getElementById('service_type');
    if (select && value) {
      const match = Array.from(select.options).find(o => o.value === value);
      if (match) select.value = value;
    }
  });
});

// ---------- Supabase setup ----------
// 1. Create a free project at https://supabase.com
// 2. Go to Project Settings > API and copy your Project URL + anon public key below.
// 3. In the SQL editor, run the query in supabase-setup.sql (included in this project).
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;
if (SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ---------- Contact form submission ----------
const form = document.getElementById('inquiryForm');
const submitBtn = document.getElementById('submitBtn');
const statusBox = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusBox.className = 'form-status';
  statusBox.textContent = '';

  const payload = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    service_type: form.service_type.value,
    message: form.message.value.trim(),
  };

  if (!payload.name || !payload.phone || !payload.email || !payload.service_type || !payload.message) {
    statusBox.textContent = 'Please fill in every field before submitting.';
    statusBox.classList.add('error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    if (!supabaseClient) {
      throw new Error('not-configured');
    }
    const { error } = await supabaseClient.from('inquiries').insert([payload]);
    if (error) throw error;

    statusBox.textContent = "Thank you — your request has been received. We'll be in touch shortly.";
    statusBox.classList.add('success');
    form.reset();
  } catch (err) {
    if (err.message === 'not-configured') {
      statusBox.textContent = 'Form is not yet connected to Supabase. See script.js for setup instructions.';
    } else {
      statusBox.textContent = 'Something went wrong sending your request. Please try again or contact us directly.';
    }
    statusBox.classList.add('error');
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Request';
  }
});
