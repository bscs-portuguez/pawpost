document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('uploaded-image');
            img.src = e.target.result;
            img.style.display = 'block';
            document.querySelector('.upload-button').style.display = 'none';
            document.getElementById('delete-button').style.display = 'block';
            // Show the upload button again after an image is uploaded
            document.querySelector('.upload-container').classList.add('image-uploaded');
        };
        reader.readAsDataURL(file);
    }
});

function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.settingsBtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const textarea = document.getElementById('myTextarea');
const counter = document.getElementById('counter');
const maxLength = textarea.getAttribute('maxlength');

textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    counter.textContent = `${currentLength}/${maxLength} characters`;
});

document.querySelector('.saveEditBtn').addEventListener('click', function() {
    const isEdit = this.textContent === 'Edit';
    this.textContent = isEdit ? 'Save' : 'Edit';

    const elements = document.querySelectorAll('.eachDetail');
    elements.forEach(function(element) {
        const p = element.querySelector('p');
        const input = element.querySelector('input');
        if (isEdit) {
            input.value = p.textContent;
            p.style.display = 'none';
            input.style.display = 'block';
        } else {
            p.textContent = input.value;
            input.style.display = 'none';
            p.style.display = 'block';
        }
    });

    const usernameInput = document.querySelector('.usernameInput');
    const usernameText = document.querySelector('.pfpAndBio h4');
    if (isEdit) {
        usernameInput.value = usernameText.textContent;
        usernameText.style.display = 'none';
        usernameInput.style.display = 'block';
    } else {
        usernameText.textContent = usernameInput.value;
        usernameInput.style.display = 'none';
        usernameText.style.display = 'block';
    }

    const bioInput = document.querySelector('.bioInput');
    const bioText = document.querySelector('.bioContainer p');
    const counter = document.getElementById('counter');
    if (isEdit) {
        bioInput.value = bioText.textContent;
        bioText.style.display = 'none';
        bioInput.style.display = 'block';
        counter.style.display = 'block';
    } else {
        bioText.textContent = bioInput.value;
        bioInput.style.display = 'none';
        bioText.style.display = 'block';
        counter.style.display = 'none';
    }
});
