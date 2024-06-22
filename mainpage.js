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
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('delete-button').addEventListener('click', function() {
    const img = document.getElementById('uploaded-image');
    img.style.display = 'none';
    img.src = '';
    document.querySelector('.upload-button').style.display = 'flex';
    document.getElementById('delete-button').style.display = 'none';
    document.getElementById('upload').value = ''; // Clear the file input
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

function expandPost(postElement) {
    const modalOverlay = document.getElementById('modalOverlay');
    const expandedPostContainer = document.getElementById('expandedPost');

    // Clear any existing content
    expandedPostContainer.innerHTML = '';

    // Create the image and button section
    const imgAndBtn = document.createElement('div');
    imgAndBtn.className = 'imgAndBtn';

    const postImage = postElement.querySelector('.postImage').cloneNode();
    const postUser = postElement.querySelector('.postUser').cloneNode(true);
    const postButtons = postElement.querySelector('.postButtons').cloneNode(true);

    imgAndBtn.appendChild(postImage);
    imgAndBtn.appendChild(postUser);
    imgAndBtn.appendChild(postButtons);

    // Create the comment section
    const commentSec = document.createElement('div');
    commentSec.className = 'commentSec';

    const commentSecHeader = document.createElement('div');
    commentSecHeader.className = 'commentSecHeader';
    const h3 = document.createElement('h3');
    h3.textContent = 'Comments';
    commentSecHeader.appendChild(h3);

    const sendComment = document.createElement('div');
    sendComment.className = 'sendComment';
    const h4Send = document.createElement('h4');
    h4Send.textContent = 'yourusername:';
    const input = document.createElement('input');
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Send';
    button.onclick = () => addComment(input.value, 'yourusername');
    sendComment.appendChild(h4Send);
    sendComment.appendChild(input);
    sendComment.appendChild(button);

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'commentsContainer';

    commentSec.appendChild(commentSecHeader);
    commentSec.appendChild(sendComment);
    commentSec.appendChild(commentsContainer);

    // Append the sections to the expanded post container
    expandedPostContainer.appendChild(imgAndBtn);
    expandedPostContainer.appendChild(commentSec);

    // Show the modal overlay
    modalOverlay.style.display = 'flex';
}

function closeModal(event) {
    if (event.target.id === 'modalOverlay') {
        const modalOverlay = document.getElementById('modalOverlay');
        modalOverlay.style.display = 'none';
    }
}

function stopPropagation(event) {
    event.stopPropagation();
}

function addComment(commentText, username) {
    if (commentText.trim() === '') return;

    const commentSection = document.querySelector('.commentsContainer');

    const eachComment = document.createElement('div');
    eachComment.className = 'eachComment';
    const h4Comment = document.createElement('h4');
    h4Comment.textContent = username + ':';
    const pComment = document.createElement('p');
    pComment.textContent = commentText;

    eachComment.appendChild(h4Comment);
    eachComment.appendChild(pComment);

    commentSection.appendChild(eachComment);

    // Clear the input after adding the comment
    const input = document.querySelector('.sendComment input');
    input.value = '';
}
