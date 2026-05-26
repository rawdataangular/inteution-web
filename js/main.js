// Theme preference auto-initializer (prevents flash of white background)
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

// Mobile Menu Toggle and Theme Toggle Integration
document.addEventListener('DOMContentLoaded', function () {
    // Setup theme switch buttons
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Privacy Policy Modal Functionality
    const privacyLinks = document.querySelectorAll('a[href="#privacy"], a[href="privacy-policy.html"]');

    privacyLinks.forEach(link => {
        link.addEventListener('click', async function (e) {
            e.preventDefault();

            // Check if modal already exists in DOM, else create it
            let privacyModal = document.getElementById('privacyModal');
            if (!privacyModal) {
                privacyModal = document.createElement('div');
                privacyModal.id = 'privacyModal';
                privacyModal.className = 'privacy-modal';
                privacyModal.innerHTML = `
                    <div class="privacy-modal-card">
                        <div class="privacy-modal-header">
                            <h2 class="privacy-modal-title">Privacy Policy</h2>
                            <button class="privacy-modal-close" aria-label="Close modal">&times;</button>
                        </div>
                        <div class="privacy-modal-body" id="privacyModalBody">
                            <div style="text-align: center; padding: 2rem; color: var(--text-light);">Loading Privacy Policy...</div>
                        </div>
                    </div>
                `;
                document.body.appendChild(privacyModal);

                // Add close events
                const closeBtn = privacyModal.querySelector('.privacy-modal-close');
                closeBtn.addEventListener('click', closePrivacyModal);
                privacyModal.addEventListener('click', function (evt) {
                    if (evt.target === privacyModal) {
                        closePrivacyModal();
                    }
                });
            }

            // Show modal
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Fetch content dynamically
            const bodyContainer = document.getElementById('privacyModalBody');
            
            const localFallbackHTML = `
                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 0; margin-bottom: 1rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">1. Introduction</h2>
                    <p style="margin-bottom: 1rem;">Welcome to inTEUtion ("Company," "we," "us," or "our"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our software services.</p>
                    <p style="margin-bottom: 1rem;">By using our website, you agree to the terms of this Privacy Policy.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">2. Information We Collect</h2>
                    <p style="margin-bottom: 1rem;">We may collect the following types of information:</p>
                    
                    <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-dark); margin-top: 1.25rem; margin-bottom: 0.5rem;">A. Information you provide voluntarily:</h3>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;">Name, email address, phone number, company name</li>
                        <li style="margin-bottom: 0.4rem;">Messages you send through contact forms or support requests</li>
                        <li style="margin-bottom: 0.4rem;">Account credentials if you register for our services</li>
                        <li style="margin-bottom: 0.4rem;">Payment information (processed securely via third-party providers)</li>
                    </ul>

                    <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-dark); margin-top: 1.25rem; margin-bottom: 0.5rem;">B. Information collected automatically:</h3>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;">IP address, browser type, operating system</li>
                        <li style="margin-bottom: 0.4rem;">Pages visited, time and date of visit, referring website</li>
                        <li style="margin-bottom: 0.4rem;">Device information (e.g., device type, unique device identifiers)</li>
                        <li style="margin-bottom: 0.4rem;">Cookies and similar tracking technologies (see Section 7)</li>
                    </ul>

                    <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-dark); margin-top: 1.25rem; margin-bottom: 0.5rem;">C. Information from third parties:</h3>
                    <p style="margin-bottom: 1rem;">We may receive information from partners, analytics providers (e.g., Google Analytics), or publicly available sources.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">3. How We Use Your Information</h2>
                    <p style="margin-bottom: 1rem;">We use your information for legitimate business purposes, including:</p>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;">To provide, operate, and maintain our website and software services</li>
                        <li style="margin-bottom: 0.4rem;">To respond to your inquiries, support requests, or demo requests</li>
                        <li style="margin-bottom: 0.4rem;">To improve our website, products, and user experience</li>
                        <li style="margin-bottom: 0.4rem;">To send technical notices, updates, security alerts, and administrative messages</li>
                        <li style="margin-bottom: 0.4rem;">To process transactions and manage billing (if applicable)</li>
                        <li style="margin-bottom: 0.4rem;">To comply with legal obligations and enforce our terms</li>
                        <li style="margin-bottom: 0.4rem;">For marketing purposes (only with your consent where required by law)</li>
                    </ul>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">4. How We Share Your Information</h2>
                    <p style="margin-bottom: 1rem;">We do not sell or rent your personal information. We may share your data only in these limited circumstances:</p>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;"><strong>Service providers:</strong> With trusted third parties who help us operate our website, process payments, send emails, or analyze data (under confidentiality agreements)</li>
                        <li style="margin-bottom: 0.4rem;"><strong>Legal compliance:</strong> If required by law, court order, or government regulation</li>
                        <li style="margin-bottom: 0.4rem;"><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets (you will be notified)</li>
                        <li style="margin-bottom: 0.4rem;"><strong>Protection of rights:</strong> To protect our legal rights, property, or safety, or that of our users or the public</li>
                    </ul>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">5. Data Security</h2>
                    <p style="margin-bottom: 1rem;">We implement industry-standard security measures (encryption, firewalls, secure servers) to protect your data. However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">6. Data Retention</h2>
                    <p style="margin-bottom: 1rem;">We keep your personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When no longer needed, we securely delete or anonymize your data.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">7. Cookies and Tracking Technologies</h2>
                    <p style="margin-bottom: 1rem;">We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can control cookies through your browser settings. Disabling cookies may affect some website functionality.</p>
                    <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-dark); margin-top: 1.25rem; margin-bottom: 0.5rem;">Types of cookies we use:</h3>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;"><strong>Essential cookies:</strong> Required for website operation</li>
                        <li style="margin-bottom: 0.4rem;"><strong>Analytics cookies:</strong> (e.g., Google Analytics) to study site traffic</li>
                        <li style="margin-bottom: 0.4rem;"><strong>Functionality cookies:</strong> To remember preferences</li>
                    </ul>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">8. Your Rights (Depending on Your Location)</h2>
                    <p style="margin-bottom: 1rem;">Depending on where you live (e.g., GDPR for Europe, CCPA for California), you may have the right to:</p>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;">Access the personal data we hold about you</li>
                        <li style="margin-bottom: 0.4rem;">Request correction of inaccurate data</li>
                        <li style="margin-bottom: 0.4rem;">Request deletion of your data</li>
                        <li style="margin-bottom: 0.4rem;">Object to or restrict certain processing</li>
                        <li style="margin-bottom: 0.4rem;">Data portability</li>
                        <li style="margin-bottom: 0.4rem;">Withdraw consent at any time (where processing is based on consent)</li>
                    </ul>
                    <p style="margin-bottom: 1rem;">To exercise these rights, contact us at <a href="mailto:info@inteution.com" style="color: var(--brand-blue); text-decoration: none; font-weight: 600;">info@inteution.com</a>.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">9. Third-Party Links</h2>
                    <p style="margin-bottom: 1rem;">Our website may contain links to external sites (e.g., partners, social media). We are not responsible for the privacy practices of those sites. Please review their privacy policies before providing any information.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">10. Children's Privacy</h2>
                    <p style="margin-bottom: 1rem;">Our website and services are not intended for children under 13 (or under 16 in certain jurisdictions). We do not knowingly collect personal information from children. If you believe a child has provided us with data, please contact us, and we will delete it.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">11. Changes to This Privacy Policy</h2>
                    <p style="margin-bottom: 1rem;">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this policy periodically.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 0;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">12. Contact Us</h2>
                    <p style="margin-bottom: 1rem;">If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:</p>
                    <p style="font-weight: 600; margin-bottom: 0.25rem;">inTEUtion</p>
                    <p style="margin-bottom: 0.25rem;">Email: <a href="mailto:info@inteution.com" style="color: var(--brand-blue); text-decoration: none;">info@inteution.com</a></p>
                    <p style="margin-bottom: 0.25rem;">Website: <a href="https://inteution.com/" style="color: var(--brand-blue); text-decoration: none;">https://inteution.com/</a></p>
                </div>
            `;

            try {
                const response = await fetch('privacy-policy.html');
                if (response.ok) {
                    const htmlText = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    const policyContent = doc.getElementById('privacyPolicyContent');
                    if (policyContent) {
                        // Remove H1 and Effective Date since they are already in the modal header
                        const h1 = policyContent.querySelector('h1');
                        const pEffect = policyContent.querySelector('p');
                        if (h1) h1.remove();
                        if (pEffect) pEffect.remove();
                        bodyContainer.innerHTML = policyContent.innerHTML;
                    } else {
                        bodyContainer.innerHTML = localFallbackHTML;
                    }
                } else {
                    bodyContainer.innerHTML = localFallbackHTML;
                }
            } catch (err) {
                // Fallback instantly if CORS blocks the fetch locally
                bodyContainer.innerHTML = localFallbackHTML;
            }
        });
    });

    function closePrivacyModal() {
        const privacyModal = document.getElementById('privacyModal');
        if (privacyModal) {
            privacyModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Terms of Service Modal Functionality
    const termsLinks = document.querySelectorAll('a[href="#terms"], a[href="terms-of-service.html"]');

    termsLinks.forEach(link => {
        link.addEventListener('click', async function (e) {
            e.preventDefault();

            // Check if modal already exists in DOM, else create it
            let termsModal = document.getElementById('termsModal');
            if (!termsModal) {
                termsModal = document.createElement('div');
                termsModal.id = 'termsModal';
                termsModal.className = 'terms-modal';
                termsModal.innerHTML = `
                    <div class="terms-modal-card">
                        <div class="terms-modal-header">
                            <h2 class="terms-modal-title">Terms of Service</h2>
                            <button class="terms-modal-close" aria-label="Close modal">&times;</button>
                        </div>
                        <div class="terms-modal-body" id="termsModalBody">
                            <div style="text-align: center; padding: 2rem; color: var(--text-light);">Loading Terms of Service...</div>
                        </div>
                    </div>
                `;
                document.body.appendChild(termsModal);

                // Add close events
                const closeBtn = termsModal.querySelector('.terms-modal-close');
                closeBtn.addEventListener('click', closeTermsModal);
                termsModal.addEventListener('click', function (evt) {
                    if (evt.target === termsModal) {
                        closeTermsModal();
                    }
                });
            }

            // Show modal
            termsModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Fetch content dynamically
            const bodyContainer = document.getElementById('termsModalBody');

            const localTermsFallbackHTML = `
                <p style="margin-bottom: 1.5rem;">Welcome to inTEUtion ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your use of our website located at <a href="https://inteution.com/" style="color: var(--brand-blue); text-decoration: none; font-weight: 600;">https://inteution.com/</a> (the "Site") and any related software, services, or content provided by inTEUtion.</p>
                <p style="margin-bottom: 2rem;">By accessing or using our Site, you agree to be bound by these Terms. If you do not agree, please do not use our Site.</p>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 0; margin-bottom: 1rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">1. Use of Our Website</h2>
                    <p style="margin-bottom: 1rem;">You may use our Site for lawful purposes only. You agree not to:</p>
                    <ul style="margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: square;">
                        <li style="margin-bottom: 0.4rem;">Violate any applicable laws or regulations.</li>
                        <li style="margin-bottom: 0.4rem;">Infringe upon the intellectual property rights of inTEUtion or any third party.</li>
                        <li style="margin-bottom: 0.4rem;">Transmit any viruses, malware, or harmful code.</li>
                        <li style="margin-bottom: 0.4rem;">Attempt to gain unauthorized access to our servers, databases, or any restricted areas of the Site.</li>
                        <li style="margin-bottom: 0.4rem;">Use any robot, spider, or automated device to scrape or monitor our Site without our permission.</li>
                    </ul>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">2. Intellectual Property</h2>
                    <p style="margin-bottom: 1rem;">All content on this Site, including but not limited to text, graphics, logos, software, documentation, design, and trademarks ("Materials"), is the exclusive property of inTEUtion or its licensors and is protected by copyright and other intellectual property laws.</p>
                    <p style="margin-bottom: 1rem;">You may view and download a single copy of the Materials for your personal, non-commercial use only. You may not reproduce, distribute, modify, create derivative works of, or publicly display any Materials without our prior written consent.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">3. Third-Party Links</h2>
                    <p style="margin-bottom: 1rem;">Our Site may contain links to third-party websites or services that are not owned or controlled by inTEUtion. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You access them at your own risk.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">4. Disclaimers</h2>
                    <p style="margin-bottom: 1rem;"><strong>"AS IS" BASIS:</strong> The Site and all content are provided on an "as is" and "as available" basis. inTEUtion makes no warranties, expressed or implied, regarding the operation or availability of the Site, or the accuracy, reliability, or completeness of any content.</p>
                    <p style="margin-bottom: 1rem;"><strong>No Warranty:</strong> We do not warrant that the Site will be uninterrupted, error-free, secure, or free of viruses or other harmful components.</p>
                    <p style="margin-bottom: 1rem;"><strong>Business Use Only:</strong> If you are using our Site on behalf of a business, you warrant that you have authority to bind that business to these Terms.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">5. Limitation of Liability</h2>
                    <p style="margin-bottom: 1rem;">To the maximum extent permitted by law, inTEUtion, its directors, employees, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, or use, arising out of or in connection with your use of the Site, even if we have been advised of the possibility of such damages.</p>
                    <p style="margin-bottom: 1rem;">Our total liability to you for any claim arising from these Terms or your use of the Site shall not exceed $100 (USD).</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">6. Indemnification</h2>
                    <p style="margin-bottom: 1rem;">You agree to defend, indemnify, and hold harmless inTEUtion and its employees, officers, and agents from and against any claims, damages, losses, liabilities, costs, or expenses (including reasonable legal fees) arising out of your violation of these Terms or your unauthorized use of the Site.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">7. Modifications to Terms</h2>
                    <p style="margin-bottom: 1rem;">We reserve the right to update or change these Terms at any time without prior notice. Any changes will be effective immediately upon posting on this page. Your continued use of the Site after any changes constitutes your acceptance of the new Terms. Please review this page periodically.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">8. Termination</h2>
                    <p style="margin-bottom: 1rem;">We may suspend or terminate your access to the Site immediately, without notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Site will cease immediately.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">9. Governing Law</h2>
                    <p style="margin-bottom: 1rem;">These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action arising from these Terms shall be brought exclusively in the courts located in Kakkanad, Kerala, India.</p>
                </div>

                <div class="policy-section" style="margin-bottom: 0;">
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-top: 1.75rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem;">10. Contact Us</h2>
                    <p style="margin-bottom: 1rem;">If you have any questions about these Terms, please contact us at:</p>
                    <p style="font-weight: 600; margin-bottom: 0.25rem;">inTEUtion</p>
                    <p style="margin-bottom: 0.25rem;">Email: <a href="mailto:info@inteution.com" style="color: var(--brand-blue); text-decoration: none;">info@inteution.com</a></p>
                    <p style="margin-bottom: 0.25rem;">Website: <a href="https://inteution.com/" style="color: var(--brand-blue); text-decoration: none;">https://inteution.com/</a></p>
                </div>
            `;

            try {
                const response = await fetch('terms-of-service.html');
                if (response.ok) {
                    const htmlText = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    const termsContent = doc.getElementById('termsOfServiceContent');
                    if (termsContent) {
                        // Remove H1 and last updated subtitle
                        const h1 = termsContent.querySelector('h1');
                        const pEffect = termsContent.querySelector('p');
                        if (h1) h1.remove();
                        if (pEffect) pEffect.remove();
                        bodyContainer.innerHTML = termsContent.innerHTML;
                    } else {
                        bodyContainer.innerHTML = localTermsFallbackHTML;
                    }
                } else {
                    bodyContainer.innerHTML = localTermsFallbackHTML;
                }
            } catch (err) {
                // Fallback instantly if CORS blocks fetch locally (file:// protocol)
                bodyContainer.innerHTML = localTermsFallbackHTML;
            }
        });
    });

    function closeTermsModal() {
        const termsModal = document.getElementById('termsModal');
        if (termsModal) {
            termsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close modals on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePrivacyModal();
            closeTermsModal();
        }
    });

    // Products Carousel with Infinite Scroll
    const productsCarousel = document.getElementById('productsCarousel');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let isTransitioning = false;
    const totalSlides = 5;
    const slidesToShow = window.innerWidth <= 768 ? 1 : 3;

    if (productsCarousel && carouselDots.length > 0) {
        // Clone slides for infinite scroll
        const slides = productsCarousel.querySelectorAll('.product-card');
        const firstSlide = slides[0].cloneNode(true);
        const secondSlide = slides[1].cloneNode(true);
        const lastSlide = slides[slides.length - 1].cloneNode(true);
        const secondLastSlide = slides[slides.length - 2].cloneNode(true);

        productsCarousel.appendChild(firstSlide);
        productsCarousel.appendChild(secondSlide);
        productsCarousel.insertBefore(lastSlide, slides[0]);
        productsCarousel.insertBefore(secondLastSlide, slides[0]);

        // Set initial position
        const slideWidth = slides[0].offsetWidth + 32; // width + gap
        productsCarousel.style.transform = `translateX(-${slideWidth * 2}px)`;

        function updateCarousel(slideIndex, smooth = true) {
            if (isTransitioning) return;
            isTransitioning = true;

            const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
            const targetPosition = -(slideWidth * (slideIndex + 2));

            productsCarousel.style.transition = smooth ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            productsCarousel.style.transform = `translateX(${targetPosition}px)`;

            // Update dots
            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });

            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel(currentSlide);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel(currentSlide);

            // Check if we need to reset position for infinite scroll
            setTimeout(() => {
                const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
                if (currentSlide === 0) {
                    productsCarousel.style.transition = 'none';
                    productsCarousel.style.transform = `translateX(-${slideWidth * 2}px)`;
                    setTimeout(() => {
                        productsCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 50);
                }
            }, 600);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(currentSlide);

            // Check if we need to reset position for infinite scroll
            setTimeout(() => {
                const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
                if (currentSlide === totalSlides - 1) {
                    productsCarousel.style.transition = 'none';
                    const totalCloned = 4;
                    productsCarousel.style.transform = `translateX(-${slideWidth * (totalSlides + 1)}px)`;
                    setTimeout(() => {
                        productsCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 50);
                }
            }, 600);
        }

        // Dot navigation
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Auto-play carousel
        let autoPlayInterval = setInterval(nextSlide, 4000);

        // Pause on hover
        const carouselWrapper = document.querySelector('.products-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            carouselWrapper.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 4000);
            });
        }

        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        productsCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoPlayInterval);
        });

        productsCarousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        productsCarousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }

            autoPlayInterval = setInterval(nextSlide, 4000);
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
                productsCarousel.style.transition = 'none';
                productsCarousel.style.transform = `translateX(-${slideWidth * (currentSlide + 2)}px)`;
                setTimeout(() => {
                    productsCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 50);
            }, 250);
        });
    }
});


// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll(
    '.product-card, .testimonial-card, .customer-logo, .achievement-card, .section-header'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero-home');
if (hero) {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// Add smooth reveal animation to sections
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sectionObserver.observe(section);
});



