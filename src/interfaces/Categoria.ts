export interface Categoria {
  id: number;
  name: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  archivedDate: string;
  archived: boolean;
  photo?: string;
}
