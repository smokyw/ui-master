import { Auth0UserProfile } from 'auth0-js';

export class User {
  userId: string;
  name: string;
  pictureUrl: string;
  email: string;

  constructor(profile: Auth0UserProfile) {
    this.userId = profile.user_id.replace('|', '-');
    this.name = profile.name;
    this.pictureUrl = profile.picture;
    this.email = profile.email;
  }
}
