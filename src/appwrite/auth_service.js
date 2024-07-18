import { Client, ID, Account } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  // signup
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
       
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
    }
  }

  // login
  async login({ email, password }) {
    try {
      // console.log("login successful", email, password);
      return await this.account.createEmailPasswordSession(email, password)
       console.log("success", email, password);
    } catch (error) {
      console.log("Appwrite serive :: login :: error", error);
    }
  }
  // logou
  async logout() {
    try {
      
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  // get current account
  async getCurrentAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null
  }
}

const authService = new AuthService();
export default authService;
