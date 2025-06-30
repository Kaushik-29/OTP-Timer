let timerInterval;
let currentOTP = '';

function generateOTP() {
  currentOTP = ('' + Math.floor(100000 + Math.random() * 900000));
  document.getElementById('otpDisplay').textContent = currentOTP;
  document.getElementById('copiedMsg').textContent = '';
  changeBackground();
  startTimer(60);
}

function startTimer(seconds) {
  clearInterval(timerInterval);
  let time = seconds;
  const timer = document.getElementById('timer');

  timerInterval = setInterval(() => {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    timer.textContent = `Timer: ${mins}:${secs < 10 ? '0' + secs : secs}`;

    if (time <= 0) {
      clearInterval(timerInterval);
      timer.textContent = 'OTP expired!';
      document.getElementById('otpDisplay').textContent = '------';
      currentOTP = '';
    }
    time--;
  }, 1000);
}

function changeBackground() {
  const colors = [
    ['#2193b0', '#6dd5ed'],
    ['#cc2b5e', '#753a88'],
    ['#ee9ca7', '#ffdde1'],
    ['#42275a', '#734b6d'],
    ['#1c92d2', '#f2fcfe'],
    ['#7b4397', '#dc2430']
  ];
  const pair = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
}

function copyOTP() {
  const otp = document.getElementById('otpDisplay').textContent;

  if (!otp || otp === '------') {
    document.getElementById('copiedMsg').textContent = 'No OTP to copy!';
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(otp).then(() => {
      document.getElementById('copiedMsg').textContent = 'OTP copied to clipboard!';
      setTimeout(() => {
        document.getElementById('copiedMsg').textContent = '';
      }, 2000);
    }).catch(err => {
      fallbackCopy(otp);
    });
  } else {
    fallbackCopy(otp);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      document.getElementById('copiedMsg').textContent = 'OTP copied!';
    } else {
      alert('Copy command was unsuccessful.');
    }
  } catch (err) {
    alert('Fallback: Could not copy OTP.');
  }

  document.body.removeChild(textarea);
  setTimeout(() => {
    document.getElementById('copiedMsg').textContent = '';
  }, 2000);
}
