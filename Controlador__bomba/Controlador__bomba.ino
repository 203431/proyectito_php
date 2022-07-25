#define RELAY_PIN 4 //se define el pin asignado para el control del RELAY
#define PIN_get 7 //se define un pin de entrada para la deteccion de señal HIGH o LOW

void setup() {
  Serial.begin(115200); //se inicia el puerto serial en 115200
  pinMode(RELAY_PIN, OUTPUT); //se indica que el el pin del RELAY es OUTPUT
  pinMode(PIN_get, INPUT); //se indica que el el pin de datos es un INPUT
  digitalWrite(RELAY_PIN, HIGH); //se manda una señal HIGH al RELAY para que se mantenga abierto

}

void loop() {
  if(digitalRead(PIN_get)==HIGH){ //se evalua la lectura de señal HIGH o LOW del pin de datos (PIN_get), si detecta una señal de HIGH mandara una LOW al RELAY para cerrar el circuito
    digitalWrite(RELAY_PIN, LOW); //se manda una señal de LOW al RELAY para cerrar el circuito y encender la bomba
  }else if(digitalRead(PIN_get)==LOW){ //si detecta una señal de LOW, mandarauna señal de HIGH al RELAY para apagar la bomba
    digitalWrite(RELAY_PIN, HIGH); //se manda una señal de HGH al RELAY para abrir el circuito y apagar la bomba
  }else{
    digitalWrite(RELAY_PIN, HIGH); //se manda una señal de HGH al RELAY para abrir el circuito y apagar la bomba
  }
  delay(1000);
}
