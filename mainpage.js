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

// Event listener for the Create Post button
document.querySelector('.createBtn').addEventListener('click', function() {
    // Retrieve uploaded image URL
    var uploadedImage = document.getElementById('uploaded-image').src;

    // Retrieve caption text
    var captionText = document.getElementById('caption').value;

    // Validate if both image and caption are provided
    if (uploadedImage && captionText.trim() !== '') {
        // Create the post structure
        var postContainer = document.createElement('div');
        postContainer.classList.add('postContainer');
        postContainer.onclick = function() { expandPost(this); };

        var postImage = document.createElement('img');
        postImage.classList.add('postImage');
        postImage.src = uploadedImage;

        var postUser = document.createElement('div');
        postUser.classList.add('postUser');

        var postUsername = document.createElement('p');
        postUsername.classList.add('postUsername');
        postUsername.textContent = 'johndoe: ';

        var postCaption = document.createElement('p');
        postCaption.classList.add('postCaption');
        postCaption.textContent = captionText;

        var postButtons = document.createElement('div');
        postButtons.classList.add('postButtons');

        var boneIcon = document.createElement('img');
        boneIcon.classList.add('boneIcon');
        boneIcon.src = 'https://www.svgrepo.com/show/513212/heart.svg';

        var commentIcon = document.createElement('img');
        commentIcon.classList.add('commentIcon');
        commentIcon.src = 'https://www.svgrepo.com/show/522071/comment-3.svg';

        // Append elements together
        postUser.appendChild(postUsername);
        postUser.appendChild(postCaption);

        postButtons.appendChild(boneIcon);
        postButtons.appendChild(commentIcon);

        postContainer.appendChild(postImage);
        postContainer.appendChild(postUser);
        postContainer.appendChild(postButtons);

        // Append the new post to the posts container
        document.getElementById('postsContainer').appendChild(postContainer);

        // Reset upload container and caption for the next post
        resetUploadContainer();
    } else {
        alert('Please upload an image and enter a caption.');
    }
});

// Function to reset upload container
function resetUploadContainer() {
    // Reset uploaded image and display styles
    document.getElementById('uploaded-image').style.display = 'none';
    document.getElementById('uploaded-image').src = '';
    document.getElementById('delete-button').style.display = 'none';

    // Show upload button again
    document.querySelector('.upload-button').style.display = 'flex';

    // Remove class indicating image uploaded
    document.querySelector('.upload-container').classList.remove('image-uploaded');

    // Clear caption input
    document.getElementById('caption').value = '';
}