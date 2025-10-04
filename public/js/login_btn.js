window.addEventListener("load", async () => {
    await Clerk.load();

    // Find the buttons
    const loginButtons = document.querySelectorAll("[data-clerk-sign-in]");
    const signupButtons = document.querySelectorAll("[data-clerk-sign-up]");

    if (!Clerk.user) {
        // If no user is signed in, attach click handlers to open Clerk modals
        loginButtons.forEach(btn => {
            btn.onclick = () => Clerk.openSignIn({ afterSignInUrl: "/" });
        });
        signupButtons.forEach(btn => {
            btn.onclick = () => Clerk.openSignUp({ afterSignUpUrl: "/" });
        });
    } else {
        // If user is signed in, hide login/signup buttons and show the user button
        loginButtons.forEach(btn => btn.style.display = "none");
        signupButtons.forEach(btn => btn.style.display = "none");

        // Create or show user buttons (one for desktop, one for mobile)
        let userButtons = document.querySelectorAll(".clerk-user-button");
        if (userButtons.length === 0) {
            // Create user button dynamically if not present
            const userBtn = document.createElement("div");
            userBtn.classList.add("clerk-user-button");
            document.body.appendChild(userBtn);
            Clerk.mountUserButton(userBtn);
        } else {
            userButtons.forEach(btn => {
                btn.classList.remove("hidden");
                Clerk.mountUserButton(btn);
            });
        }
    }
});
