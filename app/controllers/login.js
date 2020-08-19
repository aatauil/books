import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;
  @tracked identification
  @tracked password

  @action
  async authenticate(event) {
    event.preventDefault()
    try {
      console.log("usrn:" + this.identification)
      console.log("pswd:" + this.password)
      await this.session.authenticate('authenticator:mu-oauth', this.identification, this.password);
    } catch(error) {
      this.errorMessage = error.error || error;
    }

    if (this.session.isAuthenticated) {
      console.log("Success")
    }
  }
}