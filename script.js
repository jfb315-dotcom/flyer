document.addEventListener('DOMContentLoaded', () => {
    
    // --- YOUR APP LINK FOR THE QR CODE ---
    const yourApplicationUrl = "https://your-actual-mortgage-app-link.com/";
    
    const qrContainer = document.getElementById("qrcode");
    new QRCode(qrContainer, {
        text: yourApplicationUrl,
        width: 100, height: 100,
        colorDark : "#000000", colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Simple Text Binder
    const linkInput = (inputId, previewId) => {
        const inputEl = document.getElementById(inputId);
        const previewEl = document.getElementById(previewId);
        if(inputEl && previewEl) {
            inputEl.addEventListener('input', () => previewEl.textContent = inputEl.value);
        }
    };

    // Bind all text fields
    const textFields = [
        ['input-date', 'preview-date'], ['input-time', 'preview-time'],
        ['input-address', 'preview-address'], ['input-price', 'preview-price'],
        ['input-beds', 'preview-beds'], ['input-baths', 'preview-baths'], ['input-sqft', 'preview-sqft'],
        ['input-year', 'preview-year'], ['input-lot', 'preview-lot'], ['input-hoa', 'preview-hoa'],
        ['input-description', 'preview-description'],
        ['input-agent-name', 'preview-agent-name'], ['input-agent-license', 'preview-agent-license'],
        ['input-agent-company', 'preview-agent-company'], ['input-agent-phone', 'preview-agent-phone'],
        ['input-agent-email', 'preview-agent-email'], ['input-agent-web', 'preview-agent-web'],
        ['input-financing-msg', 'preview-financing-msg']
    ];
    textFields.forEach(pair => linkInput(pair[0], pair[1]));

    // Image Upload Handler
    const handleImage = (inputId, previewId, showOnLoad = false) => {
        const fileInput = document.getElementById(inputId);
        const imagePreview = document.getElementById(previewId);
        if(fileInput && imagePreview) {
            fileInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function() {
                        imagePreview.setAttribute('src', this.result);
                        if(showOnLoad) imagePreview.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    handleImage('photo-hero', 'preview-photo-hero');
    handleImage('photo-supp1', 'preview-photo-supp1');
    handleImage('photo-supp2', 'preview-photo-supp2');
    handleImage('photo-agent', 'preview-photo-agent');
    handleImage('photo-broker-logo', 'preview-broker-logo', true);

    // Global Clear Image Function
    window.clearImage = (inputId, previewId, placeholderSrc, hideOnClear = false) => {
        const inputEl = document.getElementById(inputId);
        const previewEl = document.getElementById(previewId);
        if (inputEl && previewEl) {
            inputEl.value = ""; // Clear the file input
            if (hideOnClear) {
                previewEl.style.display = 'none';
                previewEl.src = "";
            } else {
                previewEl.src = placeholderSrc;
                previewEl.style.display = 'block';
            }
        }
    };

    // Financing Toggle
    const financingToggle = document.getElementById('toggle-financing');
    const financingBanner = document.getElementById('preview-financing-banner');
    if (financingToggle && financingBanner) {
        financingToggle.addEventListener('change', () => {
            financingBanner.style.display = financingToggle.checked ? 'block' : 'none';
        });
    }

    // B&W Toggle
    const bwToggle = document.getElementById('toggle-bw');
    const flyerPaper = document.getElementById('flyer-paper');
    if (bwToggle && flyerPaper) {
        bwToggle.addEventListener('change', () => {
            bwToggle.checked ? flyerPaper.classList.add('bw-mode') : flyerPaper.classList.remove('bw-mode');
        });
    }

    // --- NEW: Template Switcher (Buttons) ---
    const templateBtns = document.querySelectorAll('.template-btn');
    if (templateBtns.length > 0 && flyerPaper) {
        templateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove the active blue highlight from all buttons
                templateBtns.forEach(b => b.classList.remove('active'));
                
                // Add the blue highlight to the button that was just clicked
                btn.classList.add('active');
                
                // Wipe the old template and load the new one
                flyerPaper.className = ''; 
                flyerPaper.classList.add(btn.dataset.template);
                
                // Keep B&W mode on if it was checked
                if (bwToggle && bwToggle.checked) flyerPaper.classList.add('bw-mode');
            });
        });
    }
});
