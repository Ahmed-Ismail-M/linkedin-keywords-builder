package handlers

import (
	"github.com/labstack/echo/v4"
	"linkedin-keywords-builder/models"
	"net/url"
	"strings"
)

// buildQuery constructs the LinkedIn Boolean query from the input
func buildQuery(input models.QueryInput) string {
	var mustParts []string
	var optionalGroup string

	// Must-have terms (AND logic)
	if len(input.MustHave) > 0 {
		validTerms := filterEmpty(input.MustHave)
		if len(validTerms) > 0 {
			mustParts = append(mustParts, "("+strings.Join(validTerms, " AND ")+")")
		}
	}

	// Exclude terms (NOT logic)
	if len(input.Exclude) > 0 {
		validTerms := filterEmpty(input.Exclude)
		if len(validTerms) > 0 {
			mustParts = append(mustParts, "NOT ("+strings.Join(validTerms, " OR ")+")")
		}
	}

	// Optional terms (OR logic) — outside the required group
	if len(input.OptionalOr) > 0 {
		validTerms := filterEmpty(input.OptionalOr)
		if len(validTerms) > 0 {
			optionalGroup = "(" + strings.Join(validTerms, " OR ") + ")"
		}
	}

	var queryParts []string

	// Combine must and exclude into one group
	if len(mustParts) > 0 {
		queryParts = append(queryParts,strings.Join(mustParts, " AND "))
	}

	// Wrap main group with another set of parentheses
	mainGroup := ""
	if len(queryParts) > 0 {
		mainGroup = "(" + strings.Join(queryParts, " ") + ")"
	}

	// Combine with optional group
	if mainGroup != "" && optionalGroup != "" {
		return mainGroup + " " + optionalGroup
	}
	if mainGroup != "" {
		return mainGroup
	}
	if optionalGroup != "" {
		return optionalGroup
	}
	return ""
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
