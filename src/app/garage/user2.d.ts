import {User} from "../models/user";
import {Ville} from "../models/ville";

export interface credentialsGarage{
  nom: string;
  telephone: string;
  ville: Ville;
  user: User;
}
