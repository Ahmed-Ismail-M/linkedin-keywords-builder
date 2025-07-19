package models

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