import { executeTransaction } from "./SQLiteDatabase";

export type Car = {
  id?: number;
  brand: string;
  model: string;
  hp: number;
};

export default class CarRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await executeTransaction(
      "CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, model TEXT, hp INT);"
    );
  }

  public async down() {
    await executeTransaction("DROP TABLE cars;");
  }

  public async create(car: Car) {
    const result = await executeTransaction(
      "INSERT INTO cars (brand, model, hp) values (?, ?, ?);",
      [car.brand, car.model, car.hp]
    );
    return result.insertId;
  }

  public async all() {
    const result = await executeTransaction("SELECT * FROM cars");
    return result.rows._array;
  }
  public async deleteFromId(id:number | null) {
    const result = await executeTransaction( 'DELETE FROM cars WHERE id = ?',
    [id],);
    return result.rows._array;
  }

  public async buscarCarro(texto: string | null) {
    const result = await executeTransaction(
      'SELECT * FROM cars WHERE model LIKE ?',
      [`%${texto}%`]
    );
    return result.rows._array;
  }
  public async atualizarCarro(model: string | null, brand: string | null, hp: number | null, id: number | null) {
    const result = await executeTransaction(
      'UPDATE cars SET model = ?, brand = ?, hp = ? WHERE id = ?',
      [model, brand, hp, id]
    );
    return result; // Se desejar, você pode retornar o resultado da operação de atualização
  }
  
}
