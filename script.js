document.addEventListener('DOMContentLoaded', () => {
    
    // --- YOUR APP LINK FOR THE QR CODE & CAPTION ---
    const yourApplicationUrl = "https://
homemortgagesolutionsllc1.godaddysites.com";
    
    const qrContainer = document.getElementById("qrcode");
    new QRCode(qrContainer, {
        text: yourApplicationUrl,
        width: 100, height: 100,
        colorDark : "#000000", colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // --- LOCAL STORAGE AUTO-SAVE SYSTEM ---
    const saveField = (el) => {
        if (el.id) {
            localStorage.setItem('flyer_' + el.id, el.value);
        }
    };

    const loadField = (el) => {
        if (el.id) {
            const savedVal = localStorage.getItem('flyer_' + el.id);
            if (savedVal !== null) {
                el.value = savedVal;
                el.dispatchEvent(new Event('input'));
                el.dispatchEvent(new Event('change'));
            }
        }
    };

    const linkInput = (inputId, previewId) => {
        const inputEl = document.getElementById(inputId);
        const previewEl = document.getElementById(previewId);
        if(inputEl && previewEl) {
            loadField(inputEl);
            inputEl.addEventListener('input', () => {
                previewEl.textContent = inputEl.value;
                saveField(inputEl);
            });
            if(inputEl.value) previewEl.textContent = inputEl.value;
        }
    };

    const textFields = [
        ['input-date', 'preview-date'], ['input-time', 'preview-time'],
        ['input-address', 'preview-address'], ['input-price', 'preview-price'],
        ['input-beds', 'preview-beds'], ['input-baths', 'preview-baths'], ['input-sqft', 'preview-sqft'],
        ['input-year', 'preview-year'], ['input-lot', 'preview-lot'], ['input-hoa', 'preview-hoa'],
        ['input-description', 'preview-description'],
        ['input-highlight1', 'preview-hi1'], ['input-highlight2', 'preview-hi2'], ['input-highlight3', 'preview-hi3'],
        ['input-agent-name', 'preview-agent-name'], ['input-agent-license', 'preview-agent-license'],
        ['input-agent-company', 'preview-agent-company'], ['input-agent-phone', 'preview-agent-phone'],
        ['input-agent-email', 'preview-agent-email'], ['input-agent-web', 'preview-agent-web'],
        ['input-financing-msg', 'preview-financing-msg']
    ];
    textFields.forEach(pair => linkInput(pair[0], pair[1]));

    const inputsToPersist = ['select-status', 'input-custom-status', 'input-brand-color'];
    inputsToPersist.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            loadField(el);
            el.addEventListener('change', () => saveField(el));
            el.addEventListener('input', () => saveField(el));
        }
    });

    const handleImage = (inputId, previewId, showOnLoad = false) => {
        const fileInput = document.getElementById(inputId);
        const imagePreview = document.getElementById(previewId);
        
        const savedImage = localStorage.getItem('flyer_img_' + inputId);
        if (savedImage && imagePreview) {
            imagePreview.setAttribute('src', savedImage);
            if(showOnLoad) imagePreview.style.display = 'block';
        }

        if(fileInput && imagePreview) {
            fileInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function() {
                        const base64Data = this.result;
                        imagePreview.setAttribute('src', base64Data);
                        if(showOnLoad) imagePreview.style.display = 'block';
                        localStorage.setItem('flyer_img_' + inputId, base64Data);
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

    window.clearImage = (inputId, previewId, placeholderSrc, hideOnClear = false) => {
        const inputEl = document.getElementById(inputId);
        const previewEl = document.getElementById(previewId);
        if (inputEl && previewEl) {
            inputEl.value = ""; 
            localStorage.removeItem('flyer_img_' + inputId);
            if (hideOnClear) {
                previewEl.style.display = 'none';
                previewEl.src = "";
            } else {
                previewEl.src = placeholderSrc;
                previewEl.style.display = 'block';
            }
        }
    };

    // --- BRAND ACCENT COLOR PICKER LOGIC ---
    const brandColorPicker = document.getElementById('input-brand-color');
    if (brandColorPicker) {
        brandColorPicker.addEventListener('input', () => {
            const color = brandColorPicker.value;
            document.documentElement.style.setProperty('--accent', color);
        });
        if(brandColorPicker.value) {
            document.documentElement.style.setProperty('--accent', brandColorPicker.value);
        }
    }

    const selectStatus = document.getElementById('select-status');
    const inputCustomStatus = document.getElementById('input-custom-status');
    const statusBanner = document.getElementById('preview-status-banner');
    const statusText = document.getElementById('preview-status-text');
    const dateSpan = document.getElementById('preview-date');
    const timeSpan = document.getElementById('preview-time');
    const openHouseSep = document.getElementById('open-house-sep'); 
    const openHousePrefix = document.getElementById('open-house-prefix'); 

    function updateStatusDisplay() {
        const val = selectStatus.value;
        if (val === 'open-house') {
            if(inputCustomStatus) inputCustomStatus.style.display = 'none';
            statusText.textContent = 'OPEN HOUSE';
            dateSpan.style.display = 'inline';
            timeSpan.style.display = 'inline';
            if (openHouseSep) openHouseSep.style.display = 'inline';
            if (openHousePrefix) openHousePrefix.style.display = 'inline';
        } else if (val === 'just-listed') {
            if(inputCustomStatus) inputCustomStatus.style.display = 'none';
            statusText.textContent = 'JUST LISTED';
            dateSpan.style.display = 'none';
            timeSpan.style.display = 'none';
            if (openHouseSep) openHouseSep.style.display = 'none';
            if (openHousePrefix) openHousePrefix.style.display = 'none';
        } else if (val === 'price-reduced') {
            if(inputCustomStatus) inputCustomStatus.style.display = 'none';
            statusText.textContent = 'PRICE REDUCED';
            dateSpan.style.display = 'none';
            timeSpan.style.display = 'none';
            if (openHouseSep) openHouseSep.style.display = 'none';
            if (openHousePrefix) openHousePrefix.style.display = 'none';
        } else if (val === 'custom') {
            if(inputCustomStatus) inputCustomStatus.style.display = 'block';
            statusText.textContent = inputCustomStatus.value.toUpperCase() || 'CUSTOM STATUS';
            dateSpan.style.display = 'none';
            timeSpan.style.display = 'none';
            if (openHouseSep) openHouseSep.style.display = 'none';
            if (openHousePrefix) openHousePrefix.style.display = 'none';
        }
    }

    if (selectStatus) {
        selectStatus.addEventListener('change', updateStatusDisplay);
        updateStatusDisplay();
    }

    if (inputCustomStatus) {
        inputCustomStatus.addEventListener('input', () => {
            if (selectStatus.value === 'custom') {
                statusText.textContent = inputCustomStatus.value.toUpperCase() || 'CUSTOM STATUS';
            }
        });
    }

    const financingToggle = document.getElementById('toggle-financing');
    const financingBanner = document.getElementById('preview-financing-banner');
    if (financingToggle && financingBanner) {
        financingToggle.addEventListener('change', () => {
            financingBanner.style.display = financingToggle.checked ? 'block' : 'none';
        });
    }

    const bwToggle = document.getElementById('toggle-bw');
    const flyerPaper = document.getElementById('flyer-paper');
    if (bwToggle && flyerPaper) {
        bwToggle.addEventListener('change', () => {
            bwToggle.checked ? flyerPaper.classList.add('bw-mode') : flyerPaper.classList.remove('bw-mode');
        });
    }

    const templateBtns = document.querySelectorAll('.template-btn');
    if (templateBtns.length > 0 && flyerPaper) {
        templateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                templateBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                flyerPaper.className = ''; 
                flyerPaper.classList.add(btn.dataset.template);
                if (bwToggle && bwToggle.checked) flyerPaper.classList.add('bw-mode');
            });
        });
    }

    const btnDownload = document.getElementById('btn-download');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            const flyerElement = document.getElementById('flyer-paper');
            html2canvas(flyerElement, { scale: 2, useCORS: true }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'Property-Flyer.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
    }

    const btnCopyCaption = document.getElementById('btn-copy-caption');
    if (btnCopyCaption) {
        btnCopyCaption.addEventListener('click', () => {
            let finalStatus = "CHECK OUT THIS PROPERTY!";
            if (selectStatus) {
                if (selectStatus.value === 'custom') {
                    finalStatus = inputCustomStatus.value.toUpperCase() || "CHECK OUT THIS PROPERTY!";
                } else {
                    finalStatus = selectStatus.options[selectStatus.selectedIndex].text.toUpperCase();
                }
            }
            
            const address = document.getElementById('input-address').value || "123 Main St, Anytown";
            const price = document.getElementById('input-price').value || "$450,000";
            const beds = document.getElementById('input-beds').value || "3";
            const baths = document.getElementById('input-baths').value || "2.5";
            const desc = document.getElementById('input-description').value || "Stunning open-concept home with modern updates.";
            
            const h1 = document.getElementById('input-highlight1').value;
            const h2 = document.getElementById('input-highlight2').value;
            const h3 = document.getElementById('input-highlight3').value;
            
            let highlightsText = "";
            if(h1 || h2 || h3) {
                highlightsText = "\n✨ Key Features:\n" + [h1, h2, h3].filter(Boolean).map(h => `• ${h}`).join('\n') + "\n";
            }
            
            const caption = `🏡 ${finalStatus}\n📍 ${address}\n💰 ${price}\n🛏️ ${beds} Beds | 🛁 ${baths} Baths\n\n${desc}\n${highlightsText}\n---\nNeed to get pre-approved? I'm partnering with John Bischof at Home Mortgage Solutions LLC! \nClick here to apply online and see what you qualify for: ${yourApplicationUrl}`;
            
            navigator.clipboard.writeText(caption).then(() => {
                const originalText = btnCopyCaption.innerHTML;
                btnCopyCaption.innerHTML = "✅ Caption Copied!";
                setTimeout(() => {
                    btnCopyCaption.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy caption: ', err);
                alert("Unable to copy caption automatically.");
            });
        });
    }
});
