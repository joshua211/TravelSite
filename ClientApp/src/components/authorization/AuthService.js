export class AuthService {
  user = null;
  callbacks = [];

  isAuthenticated() {
    if (this.user === null) {
      var item = JSON.parse(localStorage.getItem("currentUser"));
      if (item === null) return false;
      this.user = item;
      return true;
    } else return true;
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
  }

  hasRole(role) {
    if (!this.isAuthenticated()) return false;
    return this.user.role === role ? true : false;
  }

  async login(email, password) {
    var loginModel = { Email: email, Password: password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginModel),
    };

    var result = await fetch("api/Authentication/Login", requestOptions);
    var json = await result.json();
    if (!result.ok) return json;

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        token: json.token,
        role: json.role,
      })
    );
    this.callbacks.forEach((c) => c());
    return json;
  }

  async logout() {
    localStorage.removeItem("currentUser");
    this.user = null;
    this.callbacks.forEach((c) => c());
  }
}

const authService = new AuthService();

export default authService;
