function validatePassword() {
    let pwd = document.getElementById('password').value;
    let cpwd = document.getElementById('confirmPassword').value;

    if (pwd === "" || cpwd === "") {
        alert('Password fields cannot be empty'); [cite: 102]
        return false; [cite: 103]
    }
    if (pwd !== cpwd) {
        alert('Passwords do not match'); [cite: 105]
        return false; [cite: 106]
    }
    return true; [cite: 108]
}