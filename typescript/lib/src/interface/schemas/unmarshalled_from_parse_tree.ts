
import type * as s_unmarshalled_from_json from "./unmarshalled_from_json.js"
import type * as s_json_from_parse_tree from "./json_from_parse_tree_refiner.js"

export type Error =
    | ['json', s_json_from_parse_tree.Error]
    | ['unmarshall', s_unmarshalled_from_json.Error]
