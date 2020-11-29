import { Profile, ProfileDetail } from '../profile/profile';

export class Group {
  groupId: string;
  name: string;
  code: string;
  members: string[];
  matched: boolean;
}

export class GroupDetail {
  groupId: string;
  name: string;
  code: string;
  matched: boolean;
  members: Profile[];
  profile: ProfileDetail;
}
