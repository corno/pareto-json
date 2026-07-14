

//schemas
import type * as s_unmarshalled_from_json from "../interface/schemas/json_unmarshalling.js"
import type * as s_json_from_list_of_characters from "../interface/schemas/deserialize_json.js"

export type Error =
    | ['deserialize', s_json_from_list_of_characters.Error]
    | ['unmarshall', s_unmarshalled_from_json.Error]