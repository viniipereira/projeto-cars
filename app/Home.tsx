import { View, Text, Button,StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import CarRepository, { Car } from "../src/database/CarRepository";

const repository = new CarRepository();



export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState({ model: '', brand: '', hp: 45 ,id: 0});
  const create = async () => {
    const id = await repository.create({
      brand: "VW",
      model: "teste",
      hp: Math.floor(Math.random() * 100),
    });
    console.log("Created: ", id);

    await all();
  };

  const all = async () => {
    const cars = await repository.all();
    setCars(cars);

    console.log(cars);
  };

  const deleteFromId = async (id: number | null) => {
    const cars = await repository.deleteFromId(id)
    setCars(cars);
await all();
    console.log(cars);
  };

  const atualizarCarro = async (model: string | null,brand: string | null,hp: number | null,id:number | null ) => {
    console.log('sass')
    const cars = await repository.atualizarCarro(model,brand,hp,id)
  await all();
  setIsEditing(false);
    console.log(cars);
  };

  const buscarCarros = async (texto: string | null) => {

    const cars = await repository.buscarCarro(texto)
    setCars(cars);
    console.log(cars);
  };

  return (
    <>
    
    {isEditing ? (
      <View style={styles.editContainer}>
        <TextInput
          placeholder="Modelo"
          value={editedCar.model}
          onChangeText={(text) => setEditedCar({ ...editedCar, model: text })}
        />
        <TextInput
          placeholder="Marca"
          value={editedCar.brand}
          onChangeText={(text) => setEditedCar({ ...editedCar, brand: text })}
        />
        <TextInput
          placeholder="Potência (hp)"
          value={editedCar.hp.toString()}
          onChangeText={(text) => setEditedCar({ ...editedCar, hp: parseInt(text) })}
        />
        <Button onPress={() => atualizarCarro(editedCar.model, editedCar.brand,editedCar.hp,editedCar.id)} title="Atualizar" color="green" />
      </View>
    ) :
    
<View>
  
  <Button onPress={create} title="create" />
  <Button onPress={all} title="all" />
  <TextInput
        placeholder="Buscar"
        onChangeText={(texto) => buscarCarros(texto)}
      />
  {cars.map((car, index) => (
    <View key={car.id}>
      <View >
        <Text>{car.id} -</Text>
        <Text>
          {car.brand} {car.model} {car.hp}
        </Text>
      </View>
      <Button  onPress={() => deleteFromId(car.id ? car.id : null)}  title={`Deletar Carro ${car.id}`} color="red"/>
      <Button  onPress={() => {setIsEditing(true);  car.id ? setEditedCar({ ...editedCar, id:car.id}) : null}}  title={`Atualizar carro ${car.id}`} color="green"/>
    </View>
  ))}
</View>
}
  </>
  );
}

const styles = StyleSheet.create({
  carContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  carInfo: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  deleteButton: {
    backgroundColor: 'red', 
    color: 'white', 
    marginLeft: 10, 
  },
  editContainer: {
    marginTop: 70,
    flex: 1,
    flexDirection: 'column',
  },
});