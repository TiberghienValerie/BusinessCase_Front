export type RetourApi<T> = {
  statut: 'OK' | 'KO';
  data?: T;
};
