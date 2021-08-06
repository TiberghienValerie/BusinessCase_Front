import {Ville} from "../models/ville";
import {User} from "../models/user";

export interface CredentialsVille {
  nom: string;
  telephone: string;
  ville: Ville;
  user: User;
}
