package handlers

import (
	"github.com/labstack/echo/v4"
	"linkedin-keywords-builder/models"
	"net/url"
	"strings"
)

// buildQuery constructs the LinkedIn Boolean query from the input
func buildQuery(input models.QueryInput) string {
	var groups []string

	// Handle must-have terms (AND logic)
	if len(input.MustHave) > 0 {
		// Filter out empty terms and join with AND
		validTerms := filterEmpty(input.MustHave)
		if len(validTerms) > 0 {
			groups = append(groups, "("+strings.Join(validTerms, " AND ")+")")
		}
	}

	// Handle optional terms (OR logic)
	if len(input.OptionalOr) > 0 {
		// Filter out empty terms and join with OR
		validTerms := filterEmpty(input.OptionalOr)
		if len(validTerms) > 0 {
			groups = append(groups, "("+strings.Join(validTerms, " OR ")+")")
		}
	}

	// Handle exclude terms (NOT logic)
	if len(input.Exclude) > 0 {
		// Filter out empty terms and join with OR for NOT clause
		validTerms := filterEmpty(input.Exclude)
		if len(validTerms) > 0 {
			groups = append(groups, "NOT ("+strings.Join(validTerms, " OR ")+")")
		}
	}

	// Combine all groups with AND
	if len(groups) == 0 {
		return ""
	}
	return strings.Join(groups, " AND ")
}

// filterEmpty removes empty or whitespace-only strings from a slice
func filterEmpty(terms []string) []string {
	var result []string
	for _, term := range terms {
		if strings.TrimSpace(term) != "" {
			result = append(result, term)
		}
	}
	return result
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
