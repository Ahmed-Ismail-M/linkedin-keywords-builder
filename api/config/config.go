package config

type AppConfigStruct struct {
    ServerPort string
    CORSOrigin string
}

var AppConfig = AppConfigStruct{
    ServerPort: ":8080",
    CORSOrigin: "http://localhost:3000",
}