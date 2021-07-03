import { USER_PROFILE_KEY } from "../constants";

class UserIO {
    get() {
        const userVal = localStorage.getItem(USER_PROFILE_KEY);
        if(userVal) {
          const user = JSON.parse(userVal);
          const valid = Boolean(user && user.name && user.nickname);
          if(valid) {
            return user;
          }
        }
        return undefined;
    }
    set(name, nickname) {
        const user = {
            name, nickname
        };
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
    }
}

const USER = new UserIO();

export default USER;