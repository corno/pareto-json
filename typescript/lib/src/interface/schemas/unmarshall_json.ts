

//data types
import type * as d_unmarshalled_from_json from "./unmarshalled_from_json.js"
import type * as d_json_from_list_of_characters from "./json_from_list_of_characters_refiner.js"

export type Error =
    | ['deserialize', d_json_from_list_of_characters.Error]
    | ['unmarshall', d_unmarshalled_from_json.Error]