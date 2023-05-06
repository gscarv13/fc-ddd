export default interface RepositoryInterface<T> {
  
  // When inserting or updating data into the database, we do not need to return 
  // the inserted object because we have it in memory
  // before storing it into the database
  create(entity: T): Promise<void>
  update(entity: T): Promise<void>

  find(id: string): Promise<T>
  findAll(): Promise<T[]>
}
