package main

import (
	"linkedin-keywords-builder/config"
    "linkedin-keywords-builder/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// main initializes and starts the Echo server
func main() {
    e := echo.New()
    
    // Middleware
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())
    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{config.AppConfig.CORSOrigin, config.AppConfig.CORSOriginProduction},
        AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
    }))

    // Routes
    e.POST("/generate", handlers.GenerateHandler)

    // Start server
    e.Logger.Fatal(e.Start(config.AppConfig.ServerPort))
}