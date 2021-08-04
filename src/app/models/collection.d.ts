export interface Collection<T> {
  'hydra:member': Array<T>;
  'hydra:totalItems': number;
  'hydra:view': {
    'hydra:first': string;
    'hydra:last': string;
    'hydra:previous': string;
    'hydra:next': string;
  };
}
