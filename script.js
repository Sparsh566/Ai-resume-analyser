// Client-side JavaScript for HireOrder Resume Builder

// Update resume preview
function updatePreview() {
    // Personal info
    const fullName = document.getElementById('fullName').value || 'Your Name';
    document.getElementById('previewName').textContent = fullName;

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;

    const contactItems = [];
    if (email) contactItems.push(`📧 ${email}`);
    if (phone) contactItems.push(`📱 ${phone}`);
    if (location) contactItems.push(`📍 ${location}`);

    document.getElementById('previewContact').innerHTML = contactItems.map(item => `<div class="contact-item">${item}</div>`).join('');

    const summary = document.getElementById('summary').value || 'Your professional summary will appear here...';
    document.getElementById('previewSummary').textContent = summary;

    // Update sections
    updateExperiencePreview();
    updateEducationPreview();
    updateSkillsPreview();
}

// Reset form
function resetForm() {
    // Clear all inputs
    document.querySelectorAll('input, textarea').forEach(el => el.value = '');

    // Clear lists
    document.getElementById('experienceList').innerHTML = '';
    document.getElementById('educationList').innerHTML = '';
    document.getElementById('skillsList').innerHTML = '';

    // Hide preview sections
    document.getElementById('previewExperienceSection').style.display = 'none';
    document.getElementById('previewEducationSection').style.display = 'none';
    document.getElementById('previewSkillsSection').style.display = 'none';

    updatePreview();
}

// Export PDF (placeholder)
function exportPDF() {
    alert('PDF export functionality will be implemented soon. For now, you can print the page or save as PDF from your browser.');
}

// Add experience
function addExperience() {
    const title = document.getElementById('expTitle').value.trim();
    const company = document.getElementById('expCompany').value.trim();
    const years = document.getElementById('expYears').value.trim();
    const description = document.getElementById('expDescription').value.trim();

    if (!title || !company || !years) {
        alert('Please fill in Job Title, Company Name, and Years.');
        return;
    }

    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';
    experienceItem.innerHTML = `
        <strong>${title}</strong> at ${company} (${years})
        ${description ? `<br><small>${description}</small>` : ''}
        <button onclick="removeExperience(this)">Remove</button>
    `;

    document.getElementById('experienceList').appendChild(experienceItem);

    // Clear form
    document.getElementById('expTitle').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expYears').value = '';
    document.getElementById('expDescription').value = '';

    updateExperiencePreview();
}

// Remove experience
function removeExperience(button) {
    button.parentElement.remove();
    updateExperiencePreview();
}

// Update experience preview
function updateExperiencePreview() {
    const items = document.querySelectorAll('#experienceList .experience-item');
    const previewSection = document.getElementById('previewExperienceSection');
    const previewContent = document.getElementById('previewExperience');

    if (items.length === 0) {
        previewSection.style.display = 'none';
        return;
    }

    previewSection.style.display = 'block';
    previewContent.innerHTML = Array.from(items).map(item => {
        const strong = item.querySelector('strong');
        const text = strong ? strong.textContent + item.innerHTML.split('</strong>')[1].split('<button')[0] : item.textContent;
        return `<div class="experience-entry">${text.replace('Remove', '')}</div>`;
    }).join('');
}

// Add education
function addEducation() {
    const degree = document.getElementById('eduDegree').value.trim();
    const institute = document.getElementById('eduInstitute').value.trim();
    const year = document.getElementById('eduYear').value.trim();

    if (!degree || !institute || !year) {
        alert('Please fill in Degree, Institute Name, and Year.');
        return;
    }

    const educationItem = document.createElement('div');
    educationItem.className = 'education-item';
    educationItem.innerHTML = `
        <strong>${degree}</strong> from ${institute} (${year})
        <button onclick="removeEducation(this)">Remove</button>
    `;

    document.getElementById('educationList').appendChild(educationItem);

    // Clear form
    document.getElementById('eduDegree').value = '';
    document.getElementById('eduInstitute').value = '';
    document.getElementById('eduYear').value = '';

    updateEducationPreview();
}

// Remove education
function removeEducation(button) {
    button.parentElement.remove();
    updateEducationPreview();
}

// Update education preview
function updateEducationPreview() {
    const items = document.querySelectorAll('#educationList .education-item');
    const previewSection = document.getElementById('previewEducationSection');
    const previewContent = document.getElementById('previewEducation');

    if (items.length === 0) {
        previewSection.style.display = 'none';
        return;
    }

    previewSection.style.display = 'block';
    previewContent.innerHTML = Array.from(items).map(item => {
        const strong = item.querySelector('strong');
        const text = strong ? strong.textContent + item.innerHTML.split('</strong>')[1].split('<button')[0] : item.textContent;
        return `<div class="education-entry">${text.replace('Remove', '')}</div>`;
    }).join('');
}

// Add skill
function addSkill() {
    const skill = document.getElementById('skillInput').value.trim();

    if (!skill) {
        alert('Please enter a skill.');
        return;
    }

    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        ${skill}
        <button onclick="removeSkill(this)">Remove</button>
    `;

    document.getElementById('skillsList').appendChild(skillItem);

    // Clear input
    document.getElementById('skillInput').value = '';

    updateSkillsPreview();
}

// Remove skill
function removeSkill(button) {
    button.parentElement.remove();
    updateSkillsPreview();
}

// Update skills preview
function updateSkillsPreview() {
    const items = document.querySelectorAll('#skillsList .skill-item');
    const previewSection = document.getElementById('previewSkillsSection');
    const previewContent = document.getElementById('previewSkills');

    if (items.length === 0) {
        previewSection.style.display = 'none';
        return;
    }

    previewSection.style.display = 'block';
    previewContent.innerHTML = Array.from(items).map(item => item.textContent.replace('Remove', '').trim()).join(' • ');
}

// Get AI suggestions
async function getSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    const btn = document.querySelector('.btn-suggestions');

    const fullName = document.getElementById('fullName')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const location = document.getElementById('location')?.value || '';
    const linkedin = document.getElementById('linkedin')?.value || '';
    const website = document.getElementById('website')?.value || '';
    const summary = document.getElementById('summary')?.value || '';

    // Get experiences from DOM
    let experienceText = '';
    const experienceItems = document.querySelectorAll('#experienceList .experience-item');
    if (experienceItems.length > 0) {
        experienceText = 'Work Experience:\n' + Array.from(experienceItems).map(item => {
            const text = item.textContent.replace('Remove', '').trim();
            return `- ${text}`;
        }).join('\n');
    }

    // Get educations from DOM
    let educationText = '';
    const educationItems = document.querySelectorAll('#educationList .education-item');
    if (educationItems.length > 0) {
        educationText = 'Education:\n' + Array.from(educationItems).map(item => {
            const text = item.textContent.replace('Remove', '').trim();
            return `- ${text}`;
        }).join('\n');
    }

    // Get skills from DOM
    let skillsText = '';
    const skillItems = document.querySelectorAll('#skillsList .skill-item');
    if (skillItems.length > 0) {
        skillsText = 'Skills: ' + Array.from(skillItems).map(item => item.textContent.replace('Remove', '').trim()).join(', ');
    }

    const inputText = `
PERSONAL INFORMATION:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${location}
LinkedIn: ${linkedin}
Website: ${website}

PROFESSIONAL SUMMARY:
${summary}

${experienceText}

${educationText}

${skillsText}
`.trim();

    if (!fullName && !email && !summary && experiences.length === 0) {
        container.innerHTML = '<div class="empty-state">⚠️ Please fill in some resume details first!</div>';
        return;
    }

    btn.disabled = true;
    container.innerHTML = '<div class="loading">⏳ Getting AI Suggestions...</div>';

    try {
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputText })
        });

            if (!response.ok) {
                if (response.status === 429) {
                    container.innerHTML = `
                <div class="suggestion-card">
                    <div class="suggestion-text" style="color: #ef4444;">
                        ❌ Rate limit: The AI service is busy. Please wait a few seconds and try again.
                    </div>
                </div>
            `;
                    return;
                }
                throw new Error(`Server error: ${response.status}`);
            }

        const data = await response.json();

        container.innerHTML = `
            <div class="suggestion-card">
                <div class="suggestion-tag">AI Recommendations</div>
                <div class="suggestion-text">${data.message}</div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="suggestion-card">
                <div class="suggestion-text" style="color: #ef4444;">
                    ❌ Error: Could not connect to AI server.
                    <br><br>
                    Please make sure:
                    <br>• The server is running (npm start)
                    <br>• Server is running on http://localhost:5000
                    <br><br>
                    Error: ${error.message}
                </div>
            </div>
        `;
        console.error("AI Error:", error);
    } finally {
        btn.disabled = false;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
});
