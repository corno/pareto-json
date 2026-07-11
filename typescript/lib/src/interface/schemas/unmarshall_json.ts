

//data types
import type * as s_unmarshalled_from_json from "./unmarshalled_from_json.js"
import type * as s_json_from_list_of_characters from "./json_from_list_of_characters_refiner.js"

export type Error =
    | ['deserialize', s_json_from_list_of_characters.Error]
    | ['unmarshall', s_unmarshalled_from_json.Error]