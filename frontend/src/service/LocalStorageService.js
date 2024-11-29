const LocalStorageService = {
  currentUserKey: "currentUser",
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    } else {
      this.unsetCurrentUser();
    }
  },
  getCurrentUser() {
    const value = localStorage.getItem(this.currentUserKey);
    return value ? JSON.parse(value) : undefined;
  },
  getCurrentUserId() {
    const user = this.getCurrentUser();
    return user ? user.id : undefined;
  },
  getCurrentUserName() {
    const user = this.getCurrentUser();
    return user ? user.name : undefined;
  },
  unsetCurrentUser() {
    localStorage.removeItem(this.currentUserKey)
  },
  isCurrentUserSet() {
    const user = this.getCurrentUser();
    return user && user.id && user.name;
  }
}

export default LocalStorageService;