package config

type AppConfigStruct struct {
	ServerPort string
	CORSOrigin string
    CORSOriginProduction string
}

var AppConfig = AppConfigStruct{
	ServerPort: ":8080",
	CORSOrigin: "http://localhost:3000", CORSOriginProduction: "http://localhost:7050",
}
