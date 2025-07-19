package handlers

import (
	"linkedin-keywords-builder/models"
    "net/url"
    "strings"
    "github.com/labstack/echo/v4"
)

// buildQuery constructs the LinkedIn Boolean query from the input
func buildQuery(input models.QueryInput) string {
    var groups []string

    // Handle must-have terms (AND logic)
    if len(input.MustHave) > 0 {
        groups = append(groups, "("+strings.Join(input.MustHave, " AND ")+")")
    }

    // Handle optional terms (OR logic)
    if len(input.OptionalOr) > 0 {
        groups = append(groups, "("+strings.Join(input.OptionalOr, " OR ")+")")
    }

    // Handle exclude terms (NOT logic)
    if len(input.Exclude) > 0 {
        var notTerms []string
        for _, term := range input.Exclude {
            notTerms = append(notTerms, "NOT "+term)
        }
        groups = append(groups, "("+strings.Join(notTerms, " AND ")+")")
    }

    // Combine all groups with AND
    if len(groups) == 0 {
        return ""
    }
    return strings.Join(groups, " AND ")
}

// generateHandler handles the POST /generate endpoint
func GenerateHandler(c echo.Context) error {
    var input models.QueryInput
    if err := c.Bind(&input); err != nil {
        return echo.NewHTTPError(400, "Invalid input: "+err.Error())
    }

    // Build the query
    rawQuery := buildQuery(input)
    if rawQuery == "" {
        return echo.NewHTTPError(400, "No valid query terms provided")
    }

    // Encode the query
    encoded := url.QueryEscape(rawQuery)

    // Construct the response
    result := models.QueryOutput{
        RawQuery:    rawQuery,
        Encoded:     encoded,
        FullExample: "https://www.linkedin.com/search/results/content/?contentType=%22jobs%22&keywords=" + encoded + "&origin=GLOBAL_SEARCH_HEADER&sortBy=%22date_posted%22",
    }

    return c.JSON(200, result)
}