#include "DHT.h" //se carga la libreria para el sensor DHT11
#include <LiquidCrystal.h> //se carga la libreria para el control del LCD
#include <WiFi.h> //se carga la libreria para la conexcion a internet mediante WIFI
#include <HTTPClient.h> //se carga la libreria para poder crear objetos para realizar peticiones


#define trigPin 19 //pin trigger del sensor ultrasonico HC-SR04
#define echoPin 21//pin echo del sensor ultrasonico HC-SR04
#define DHTPIN 4 //pin del sensor DHT11
#define DHTTYPE DHT11 //definicion de que tipo de sensor DHT se usara 
#define PIN_bomba 23 //pin asignado para el control de la bomba de agua
const int HUM_suelo = 39; //pin sensor humedad de suelo FC-28

boolean bomba = false; //variable para almacenar el estado de la bomba
int prof; //variable para almacenar la profundidad
float hum; //variable para almacenar la humedad del aire
float temp; //variable para almacenar la temperatura ambiente
float suelo; //variable para almacenar la humedad del suelo (valor directo)
float suelo_porc; //variable para almacenar la humedad del suelo (en porcentaje)

//const char* ssid = "INFINITUMPDN2_2.4"; //ssid de la red a conectarse
//const char* password = "zXUQGRY0Ij"; //contraseña de la red a conectarse

const char* ssid = "INFINITUM11DA_2.4"; //ssid de la red a conectarse
const char* password = "thb5ya3xEm"; //contraseña de la red a conectarse

//const char* ssid = "G8 Powerade";
//const char* password = "RB18_chec0";

const int rs = 13, en = 12, d4 = 27, d5 = 26, d6 = 25, d7 = 33; //asignando a variable los pines del lcd
LiquidCrystal lcd(rs, en, d4, d5, d6, d7); //definicion de los pines en un objeto de la libreria para el control del LCD

byte limpiar[] = {
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000
};

byte simb_temp[] = {
  B00100,
  B01010,
  B01010,
  B01110,
  B01110,
  B11111,
  B11111,
  B01110
};

byte simb_hum[] = {
  B00100,
  B00100,
  B01010,
  B01010,
  B10001,
  B10001,
  B10001,
  B01110
};

byte simb_suelo[] = {
  B00011,
  B11011,
  B11010,
  B00100,
  B00100,
  B11111,
  B01110,
  B01110
};

byte simb_prof[] = {
  B00100,
  B01110,
  B10101,
  B00100,
  B00100,
  B10101,
  B01110,
  B00100
};

DHT dht(DHTPIN, DHTTYPE); //definicion de un objeto para el control del sensor DHT11

void setup() {
  Serial.begin(115200); //inicio del puerto serial en 115200

  pinMode(trigPin, OUTPUT); //definicion de pin trigger como OUTPUT
  pinMode(echoPin, INPUT); //definicion de pin echo como INPUT
  pinMode(PIN_bomba, OUTPUT); //definicion de pin pin de la bomba de agua como OUTPUT
  pinMode(HUM_suelo, INPUT); //definicion de pin sensor humedad de suelo como INPUT
  
  lcd.createChar(0, limpiar); //definicion de los iconos creados como bytes
  lcd.createChar(1, simb_temp); //definicion de los iconos creados como bytes
  lcd.createChar(2, simb_hum); //definicion de los iconos creados como bytes
  lcd.createChar(3, simb_suelo); //definicion de los iconos creados como bytes
  lcd.createChar(4, simb_prof); //definicion de los iconos creados como bytes

  dht.begin(); //inicializacion del objeto dht
  lcd.begin(16, 2); //inicializacion del objeto lcd
  
  lcd.setCursor(0,0); //colocar el cursor del LCD en cierta posicion
  lcd.write(byte(1)); //carga en el LCD de iconos creados como bytes

  lcd.setCursor(8,0); //colocar el cursor del LCD en cierta posicion
  lcd.write(byte(2)); //carga en el LCD de iconos creados como bytes

  lcd.setCursor(0,1); //colocar el cursor del LCD en cierta posicion
  lcd.write(byte(3)); //carga en el LCD de iconos creados como bytes

  lcd.setCursor(8,1); //colocar el cursor del LCD en cierta posicion
  lcd.write(byte(4)); //carga en el LCD de iconos creados como bytes

  digitalWrite(PIN_bomba, LOW); //se manda una señal LOW a la bomba para asegurarse
  analogReadResolution(12); //definicion del rango de lectura de bits de los puertos analogicos

  conecttion_WIFI(); //conexion con internet mediante WIFI haciendo uso de una funcion
}

void loop() {
  delay(5000); //se inicia la ejecucion del codigo con un delay de 5s antes de comenzar
  prof = getDistance(); //se obtiene la profundidad mediante el uso de la funcion getDistance
  hum = dht.readHumidity(); //se obtiene el valor de la humedad del ambiente usando la funcion predeterminada de la libreria DHT
  temp = dht.readTemperature(); //se obtiene el valor de la temperatura usando la funcion predeterminada de la libreria DHT
  suelo = analogRead(HUM_suelo); //se obtiene el valor de la humedad usando la funcion analogRead
  suelo_porc = ((suelo/4095)-1)*-100; //se realiza una conversion del valor obtenido de la humedad del suelo para mostrarla como porcentaje
  Serial.println(suelo); //se imprime el valor del suelo en el puerto serial
  
  if (isnan(temp)) { //se hace una validacion del dato de la temperatura para comprobar que el sensor DHT esta funcionando
    Serial.println(F("Failed to read from DHT sensor!")); //se imprime en el puerto serial un mensaje que indica que fallo la lectura
    return;
  }

  lcd.setCursor(1,0); //indicar la posicion del cursor en el LCD
  lcd.print(temp); //imprimir el valor de la temperatura en el LCD
  lcd.print("C");

  lcd.setCursor(9,0); //indicar la posicion del cursor en el LCD
  lcd.print(hum); //imprimir el valor de la humedad del ambiente en el LCD
  lcd.print("%");

  lcd.setCursor(1,1); //indicar la posicion del cursor en el LCD
  lcd.print(suelo_porc); //imprimir el valor de la humendad del suelo (en porcentaje) en el LCD

  lcd.setCursor(9,1); //indicar la posicion del cursor en el LCD
  lcd.print(prof); //imprimir el valor de la profundidad del recipiente con agua para la bomba en el LCD
  lcd.print(" CM");


  if(suelo_porc < 23){ //se evalua el porcentaje de humedad del suelo, si es menor al 23% la bomba debe encenderse
    digitalWrite(PIN_bomba, HIGH); //se manda una señal HIGH para encender la bomba
    bomba = true; //se guarda el valor de true como estada de la bomba para indicar que esta encendida
    Serial.print("Bomba state: "); //se imprime un mensaje en el puerto serial on el estado de la bomba actual
    Serial.print(bomba);
    Serial.println(" = ON NOW");

    send_data();
    delay(2000); //se ejecuta un delay para que la bomba se enciena durante 2s
    digitalWrite(PIN_bomba, LOW); //se envia una señal de LOW para apagar la bomba
    bomba = false; //se guarda el valor de false como estaoa de la bomba para indicar que esta apagada
    Serial.print("Bomba state: "); //se imprime un mensaje en el puerto serial on el estado de la bomba actual
    Serial.print(bomba);
    Serial.println(" = OFF NOW");

    send_data();
  }else{ //si el valor de la humedad del suelo esta por encima del 23% la bomba permanecera apagada
    digitalWrite(PIN_bomba, LOW); //se envia una señal de LOW para mantener apagada la bomba
    bomba = false; //se guarda el valor de false como estaoa de la bomba para indicar que esta apagada
    Serial.print("Bomba state: "); //se imprime un mensaje en el puerto serial on el estado de la bomba actual
    Serial.print(bomba);
    Serial.println(" = OFF STILL");

    send_data();
  }

  delay(15000); //se ejecuta un delay de 15s
}

void conecttion_WIFI() { //funcion void encargada de conectar el ESP32 a una red de internet
  WiFi.mode(WIFI_STA); //se indica el modo de uso del WIFI del ESP32
  WiFi.begin(ssid, password);   //se inicia el WIFI pasando el ssid y el password como parametros de red
  Serial.print("Connecting to WiFi .."); //se imprime un mensaje de que se esta conectando mediante WIFI
  while (WiFi.status() != WL_CONNECTED) { //se evalua el estatus de conexion, sino se conecta no podra comenzar el programa
    Serial.print('.');
    delay(1000);
  }
  Serial.print(" My IP: "); //se imprime un mensaje de indicacion de la IP
  Serial.println(WiFi.localIP()); //se imprime la IP local del ESP32
}

int getDistance(){ //funcion int para la obtencion de la profundidad haciendo uso del sensor ultrasonico HC-SR04
  int duration, distance; //se declararan dos variables duration y distance
  digitalWrite(trigPin, HIGH); //se manda una señal de HIGH al pin del trigger
  delayMicroseconds(1000); //se ejecuta un delay de 1000 microsegundos
  digitalWrite(trigPin, LOW); //se manda una señal de LOW al pin del trigger
  duration = pulseIn(echoPin, HIGH); //se captura el valor de la duracion del pulso mandando una señal de HIGH al pin echo
  distance = (duration/2)/29.1; // se calcula el valor de la distancia mendante una formula
  return distance; //se retorna el valor obtenido para la distancia
}

void send_data(){
   if (WiFi.status() == WL_CONNECTED){
    HTTPClient http; //se crea el objeto http
    String data = "temperatura=" + String(temp) + "&humedad=" + String(hum)+ "&humedad_suelo="+String(suelo_porc) + "&estado="+String(bomba);

    http.begin("http://192.168.1.86/var/www/html/aa/EspPost.php");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded"); // Se define texto plano

    int response_status = http.POST(data); //Se envian los datos y se almacena la respuesta

    if (response_status > 0){
      Serial.println("Código HTTP: " + String(response_status)); // Se imprime el codigo de respuesta

      if (response_status == 200){
        String response_data = http.getString();
        Serial.println("Datos enviados correctamente");
        Serial.println(response_data);
      }else{
        Serial.print("Error enviando datos, código: ");
        Serial.println(response_status);
      }
    }else{
      Serial.print("Error con el servidor, código: ");
      Serial.println(response_status);
    }
    http.end(); 
  }
}
