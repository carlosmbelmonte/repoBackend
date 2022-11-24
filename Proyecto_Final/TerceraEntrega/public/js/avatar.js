const radioButtons = document.querySelectorAll('input[name="showUpload"]');
document.getElementById('avatarURL').style.display = '',
document.getElementById('avatarFile').style.display = 'none'
for(const radioButton of radioButtons){
    radioButton.addEventListener('change', function(e) {
        document.getElementById('showUploadUrl').checked ? (
            document.getElementById('avatarURL').style.display = '',
            document.getElementById('avatarFile').style.display = 'none'
        ) : (
            document.getElementById('avatarURL').style.display = 'none',
            document.getElementById('avatarFile').style.display = ''
        )
      }
    );
}