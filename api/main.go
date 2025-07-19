package main

import (
	"net/url"
	"strings"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	
)

// QueryInput defines the expected JSON input
type QueryInput struct {
	MustHave   []string `json:"must_have"`
	OptionalOr []string `json:"optional_or"`
	Exclude    []string `json:"exclude"`
}

// QueryOutput defines the response
type QueryOutput struct {
	RawQuery    string `json:"raw_query"`
	Encoded     string `json:"encoded"`
	FullExample string `json:"example_link"`
}

// BuildQuery constructs the LinkedIn Boolean query
func BuildQuery(input QueryInput) string {
	var groups []string

	// Group must-have terms into one AND clause
	if len(input.MustHave) > 0 {
		andGroup := "(" + strings.Join(input.MustHave, " AND ") + ")"
		groups = append(groups, andGroup)
	}

	// Group optional terms with OR logic
	if len(input.OptionalOr) > 0 {
		orGroup := "(" + strings.Join(input.OptionalOr, " OR ") + ")"
		groups = append(groups, orGroup)
	}

	// Group NOT terms (each prefixed with NOT)
	if len(input.Exclude) > 0 {
		var notGroup []string
		for _, word := range input.Exclude {
			notGroup = append(notGroup, "NOT "+word)
		}
		groups = append(groups, "("+strings.Join(notGroup, " AND ")+")")
	}

	// Combine all parts
	return strings.Join(groups, " AND ")
}


func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
  AllowOrigins: []string{"http://localhost:3000"},
  AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
}))
	// POST /generate
	e.POST("/generate", func(c echo.Context) error {
		var input QueryInput
		if err := c.Bind(&input); err != nil {
			return echo.NewHTTPError(400, "Invalid input")
		}

		rawQuery := BuildQuery(input)
		encoded := url.QueryEscape(rawQuery)

		result := QueryOutput{
			RawQuery:    rawQuery,
			Encoded:     encoded,
			FullExample: "https://www.linkedin.com/search/results/content/?contentType=%22jobs%22&keywords=" + encoded + "&origin=GLOBAL_SEARCH_HEADER&sortBy=%22date_posted%22",
		}

		return c.JSON(200, result)
	})

	e.Logger.Fatal(e.Start(":8080"))
}
