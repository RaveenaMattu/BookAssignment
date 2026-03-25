export interface BookInterface {
  id: number,
  title: string,
  author: string,
  description: string,
  genre: string,
  year: number,
  image?: string,
  isFav: boolean
}